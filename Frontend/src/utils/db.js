const FILES = 'recent_files';
const HISTORY = 'history';
const LEGACY_META = 'night_pdf_recent_meta';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NightPDF_DB', 2);
    let blocked = false;
    request.onblocked = () => {
      blocked = true;
      reject(new Error('Close other NightPDF tabs to update saved files.'));
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      if (blocked) request.result.close();
      else resolve(request.result);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      const history = db.createObjectStore(HISTORY, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(FILES)) {
        db.createObjectStore(FILES, { keyPath: 'id' });
        return;
      }
      // Index legacy records once. Leave their original bytes and keys intact.
      const scan = request.transaction.objectStore(FILES).openCursor();
      scan.onsuccess = () => {
        const cursor = scan.result;
        if (!cursor) return;
        const { id, name, size, totalPages, currentPage, lastReadTime } = cursor.value;
        history.put({ id, name, size, totalPages, currentPage, lastReadTime });
        cursor.continue();
      };
    };
  });
}

async function transaction(stores, mode, start) {
  const db = await openDB();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(stores, mode);
      let result;
      let failure;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(failure || tx.error || new Error('Storage operation failed.'));
      start(tx, value => { result = value; }, error => { failure = error; tx.abort(); });
    });
  } finally {
    db.close();
  }
}

function legacyHistory() {
  try {
    const entries = JSON.parse(localStorage.getItem(LEGACY_META) || '[]');
    return Array.isArray(entries) ? entries.filter(e => e?.id).map(e => ({ ...e, isMetaOnly: true })) : [];
  } catch {
    return [];
  }
}

export async function getRecentFiles() {
  const legacy = legacyHistory();
  let saved;
  try {
    saved = await transaction([HISTORY], 'readonly', (tx, done) => {
      const request = tx.objectStore(HISTORY).getAll();
      request.onsuccess = () => done(request.result);
    });
  } catch (error) {
    console.warn('Saved PDFs unavailable.', error);
    return legacy;
  }
  const ids = new Set(saved.map(entry => entry.id));
  return [...saved, ...legacy.filter(entry => !ids.has(entry.id))].sort((a,b) => b.lastReadTime - a.lastReadTime);
}

export function readSavedFile(id) {
  return transaction([FILES], 'readonly', (tx, done) => {
    const request = tx.objectStore(FILES).get(id);
    request.onsuccess = () => done(request.result?.data);
  });
}

export function saveRecentFile(id, file, totalPages, currentPage) {
  return transaction([FILES, HISTORY], 'readwrite', (tx, done, abort) => {
    const history = tx.objectStore(HISTORY);
    const keys = history.getAllKeys();
    keys.onsuccess = () => {
      if (keys.result.length >= 5 && !keys.result.includes(id)) {
        abort(new Error('Five PDFs are already saved. Forget one before saving another.'));
        return;
      }
      tx.objectStore(FILES).put({ id, data: file });
      history.put({ id, name: file.name, size: file.size, totalPages, currentPage, lastReadTime: Date.now() });
      done(id);
    };
  });
}

export function updateLastReadPage(id, currentPage) {
  return transaction([HISTORY], 'readwrite', tx => {
    const history = tx.objectStore(HISTORY);
    const request = history.get(id);
    request.onsuccess = () => {
      if (request.result) history.put({ ...request.result, currentPage, lastReadTime: Date.now() });
    };
  });
}

export async function deleteRecentFile(entry) {
  if (!entry.isMetaOnly) {
    await transaction([FILES, HISTORY], 'readwrite', tx => {
      tx.objectStore(FILES).delete(entry.id);
      tx.objectStore(HISTORY).delete(entry.id);
    });
  }
  const legacy = legacyHistory();
  if (legacy.some(e => e.id === entry.id)) {
    localStorage.setItem(LEGACY_META, JSON.stringify(legacy.filter(e => e.id !== entry.id)));
  }
}
