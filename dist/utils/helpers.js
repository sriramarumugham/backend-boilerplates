"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoutesAndBypass = void 0;
const checkRoutesAndBypass = (routesArray, method, url) => {
    let newUrl = url.endsWith('/') ? url.substring(0, url.length) : url;
    let res = routesArray &&
        routesArray?.some((val) => {
            return (val?.method === method &&
                val?.url?.toLowerCase() === newUrl?.toLowerCase());
        });
    return res;
};
exports.checkRoutesAndBypass = checkRoutesAndBypass;
