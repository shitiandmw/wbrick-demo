const { LRUCache } = require('lru-cache');
const LWTool = require('lwtool');

/**
 * 使用内存和redis混合缓存session
 */
module.exports = class SessionStore {
    // redis接口
    redisInterface = null;
    // 本地缓存策略
    local_cache = new LRUCache({
        max: 10000,      // 最多在本地缓存10000个session
        ttl: 120000      // 每个缓存的最大生命周期（单位毫秒），默认2分钟
    });
    constructor(redisInterface) {
        this.redisInterface = redisInterface;
    }

    // key格式化
    keyFormat(key) {
        return "session:"+key;
    }

    async get(key, maxAge, { rolling }) {
        key = this.keyFormat(key);
        if (this.local_cache.has(key))
            return this.local_cache.get(key);
        const result = await this.redisInterface.cGet(key, () => { return null; }, maxAge)
        if (result) this.local_cache.set(key, result);
        return result;
    }

    async set(key, sess, maxAge, { changed, rolling }) {
        if (changed || rolling) {
            key = this.keyFormat(key);
            const expires = typeof maxAge === 'number' ? maxAge / 1000 : 86400; // 默认一天
            let data = JSON.stringify(sess);
            await this.redisInterface.cSet(key, data, expires);
            if (LWTool.isJSON(data)) data = JSON.parse(data);
            this.local_cache.set(key, data);
        }
    }

    async destroy(key) {
        key = this.keyFormat(key);
        await this.redisInterface.del(key);
        this.local_cache.delete(key);
    }
}
