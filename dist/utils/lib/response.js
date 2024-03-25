"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect = exports.successResMsg = exports.errorResMsg = void 0;
/**
 * Sends an error response with the specified status code and message.
 * @param res The Express response object.
 * @param code The HTTP status code for the response.
 * @param message The error message to send.
 */
const errorResMsg = (res, code, message) => res.status(code).json({ status: 'error', message });
exports.errorResMsg = errorResMsg;
/**
 * Sends a success response with the specified status code, message, and data.
 * @param res The Express response object.
 * @param code The HTTP status code for the response.
 * @param responseData The data to include in the response.
 */
const successResMsg = (res, code, responseData) => {
    const { message } = responseData, data = __rest(responseData, ["message"]);
    return res.status(code).json({ status: 'success', message, data });
};
exports.successResMsg = successResMsg;
/**
 * Redirects the client to the specified URL.
 * @param res The Express response object.
 * @param url The URL to redirect to.
 */
const redirect = (res, url) => res.status(302).redirect(url);
exports.redirect = redirect;
