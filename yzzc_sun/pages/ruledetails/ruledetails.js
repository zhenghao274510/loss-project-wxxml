var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, _api = require("../../common/js/api.js"), _reload = require("../../common/js/reload.js"), app = getApp();

Page(_extends({}, _reload.reload, {
    data: {},
    onLoad: function(t) {
        this.setData({
            title: t.title,
            content: t.content
        }), this.onloadData();
    },
    onloadData: function() {
        var e = this;
        this.checkUrl().then(function(t) {}).catch(function(t) {
            -1 === t.code ? e.tips(t.msg) : e.tips("false");
        });
    }
}));