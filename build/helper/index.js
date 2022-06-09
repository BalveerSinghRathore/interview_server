"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = exports.paginator = exports.OTPs = void 0;
var OTPs = function () { return Math.floor(1000 + Math.random() * 9000); };
exports.OTPs = OTPs;
var paginator = function (totalCount, limit, page) {
    var firstPage = 0;
    var pages = [];
    var lastPage = 0;
    var setfirst = 0;
    var setlast = 0;
    lastPage = Math.ceil(totalCount / limit);
    if (lastPage > 0) {
        firstPage = 1;
        if (page == 1) {
            setfirst = 1;
        }
        else {
            setfirst = Number(page) - 2;
        }
        if (page == lastPage) {
            setlast = lastPage;
        }
        else {
            setlast = Number(page) + 2;
        }
        for (var i = setfirst; i < Number(setlast) + 1; i++) {
            if (i > 0 && i <= lastPage)
                pages.push(i);
        }
    }
    return {
        firstPage: firstPage,
        lastPage: lastPage,
        pages: pages
    };
};
exports.paginator = paginator;
var randomString = function (limit) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < limit; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.randomString = randomString;
