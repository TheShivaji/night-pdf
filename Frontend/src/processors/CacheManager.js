// Bounded LRU Cache Manager for Rendered Page Bitmaps
export class CacheManager {
  constructor(maxSize = 25) {
    this.maxSize = maxSize;
    this.bytes = 0;
    this.maxBytes = 32 * 1024 ** 2;
    this.cache = new Map();
  }

  getCacheKey(renderSettings) {
    return JSON.stringify(renderSettings);
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    // Refresh LRU order
    const item = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, item);
    return item;
  }

  set(key, canvas) {
    const size = canvas.width * canvas.height * 4;
    if (this.cache.has(key)) this.evict(key);
    if (size > this.maxBytes) return;
    while (this.cache.size >= this.maxSize || this.bytes + size > this.maxBytes) {
      this.evict(this.cache.keys().next().value);
    }
    this.cache.set(key, canvas);
    this.bytes += size;
  }

  evict(key) {
    const canvas = this.cache.get(key);
    this.bytes -= canvas.width * canvas.height * 4;
    this.cache.delete(key);
    canvas.width = canvas.height = 0;
  }

  clear() {
    for (const key of this.cache.keys()) this.evict(key);
  }
}
