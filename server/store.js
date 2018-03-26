const Redis = require("ioredis");
const Store = require("koa-session2/libs/store");

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis();
    }

    get(sid) {
        return this.redis.get(`SESSION:${sid}`).then(data => JSON.parse(data));
    }

    set(session, opts) {
        if (!opts.sid) {
            opts.sid = this.getID(24);
        }

        return this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session)).then(() => {
            return opts.sid
        });
    }

    destroy(sid) {
        return this.redis.del(`SESSION:${sid}`);
    }
}