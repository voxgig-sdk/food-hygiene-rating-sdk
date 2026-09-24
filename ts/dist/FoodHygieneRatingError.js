"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodHygieneRatingError = void 0;
class FoodHygieneRatingError extends Error {
    isFoodHygieneRatingError = true;
    sdk = 'FoodHygieneRating';
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
exports.FoodHygieneRatingError = FoodHygieneRatingError;
//# sourceMappingURL=FoodHygieneRatingError.js.map