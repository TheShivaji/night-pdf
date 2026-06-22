const DB_NAME = 'NightPDF_DB';
const DB_VERSION = 1;
const STORE_NAME = 'recent_files';

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveRecentFile(file, totalPages, currentPage) {
  try {
    const db = await openDB();
    
    // Quota Protection: Retain only the 5 most recent files
    const allFiles = await new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAllKeys();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve([]); // ignore error, just don't delete
    });
    
    if (allFiles && allFiles.length >= 5) {
      // Find oldest to delete
      const records = await getRecentFiles(); // Already sorted by lastReadTime desc
      if (records.length >= 5) {
        const oldestFiles = records.slice(4); // Keep top 4, so we can insert 1
        const delTransaction = db.transaction([STORE_NAME], 'readwrite');
        const delStore = delTransaction.objectStore(STORE_NAME);
        for (const oldFile of oldestFiles) {
          delStore.delete(oldFile.id);
        }
      }
    }

    const id = `${file.name}-${file.size}`;
    const arrayBuffer = await file.arrayBuffer();
    
    const fileRecord = {
      id,
      name: file.name,
      size: file.size,
      totalPages,
      currentPage,
      lastReadTime: Date.now(),
      data: arrayBuffer
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(fileRecord);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.warn('IndexedDB Quota or Save Error. Disabling binary resume for this file.', error);
    // Silent fallback: just save metadata so history still works without the binary
    saveMetadataToLocalStorage(file.name, file.size, totalPages, currentPage);
  }
}

export async function updateLastReadPage(fileName, fileSize, currentPage) {
  try {
    const db = await openDB();
    const id = `${fileName}-${fileSize}`;
    
    const record = await new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });

    if (!record) {
      // If not in DB, update localStorage
      saveMetadataToLocalStorage(fileName, fileSize, null, currentPage);
      return;
    }

    record.currentPage = currentPage;
    record.lastReadTime = Date.now();

    await new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(record);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error('Failed to update page in IndexedDB:', error);
    saveMetadataToLocalStorage(fileName, fileSize, null, currentPage);
  }
}

export async function getRecentFiles() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const files = request.result || [];
        // Sort by lastReadTime descending
        files.sort((a, b) => b.lastReadTime - a.lastReadTime);
        resolve(files);
      };
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error('Failed to read from IndexedDB, reading localStorage:', error);
    return getMetadataFromLocalStorage();
  }
}

export async function deleteRecentFile(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error('Failed to delete from IndexedDB:', error);
  }
}

// LocalStorage Fallback helper functions
function saveMetadataToLocalStorage(name, size, totalPages, currentPage) {
  try {
    const key = 'night_pdf_recent_meta';
    const existing = localStorage.getItem(key);
    let list = existing ? JSON.parse(existing) : [];
    const id = `${name}-${size}`;
    
    const index = list.findIndex(item => item.id === id);
    if (index > -1) {
      list[index].currentPage = currentPage;
      if (totalPages) list[index].totalPages = totalPages;
      list[index].lastReadTime = Date.now();
    } else {
      list.push({
        id,
        name,
        size,
        totalPages: totalPages || 0,
        currentPage,
        lastReadTime: Date.now(),
        isMetaOnly: true
      });
    }
    // Sort and limit to 5
    list.sort((a, b) => b.lastReadTime - a.lastReadTime);
    list = list.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
}

function getMetadataFromLocalStorage() {
  try {
    const key = 'night_pdf_recent_meta';
    const existing = localStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
}
