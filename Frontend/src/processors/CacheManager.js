// Bounded LRU Cache Manager for Rendered Page Bitmaps
export class CacheManager {
  constructor(maxSize = 25) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  getCacheKey({ docId, pageNum, zoom, themeId, strength, mode, threshold }) {
    return `${docId}_p${pageNum}_z${zoom}_t${themeId}_s${strength}_m${mode}_th${threshold}`;
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    // Refresh LRU order
    const item = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, item);
    return item;
  }

  set(key, bitmapOrCanvas) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Evict oldest (first item in Map iterator)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, bitmapOrCanvas);
  }

  invalidateDocument(docId) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${docId}_`)) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.cache.clear();
  }
}

export const globalPageCache = new CacheManager(30);
