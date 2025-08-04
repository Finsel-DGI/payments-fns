"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unixTimeStampNow = unixTimeStampNow;
exports.createSlug = createSlug;
exports.unslug = unslug;
exports.strEnum = strEnum;
function unixTimeStampNow() {
    const now = new Date();
    return Math.floor(now.getTime() / 1000);
}
function createSlug(name) {
    return name
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except hyphens
        .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
function unslug(slug, capitalize = true) {
    let result = slug
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (capitalize) {
        result = result.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
    }
    return result;
}
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
//# sourceMappingURL=system.js.map