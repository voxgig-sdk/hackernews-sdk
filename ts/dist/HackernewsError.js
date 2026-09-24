"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackernewsError = void 0;
class HackernewsError extends Error {
    isHackernewsError = true;
    sdk = 'Hackernews';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.HackernewsError = HackernewsError;
//# sourceMappingURL=HackernewsError.js.map