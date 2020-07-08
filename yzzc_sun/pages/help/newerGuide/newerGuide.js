var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, _reload = require("../../../common/js/reload.js"), _api = require("../../../common/js/api.js"), app = getApp();

Page(_extends({}, _reload.reload, {
    data: {},
    onLoad: function(t) {
        this.onloadData();
    },
    onloadData: function() {
        var a = this;
        this.checkUrl().then(function(t) {
            return (0, _api.HelpsData)();
        }).then(function(t) {
            a.setData({
                msg: t
            });
        }).catch(function(t) {
            -1 === t.code ? a.tips(t.msg) : a.tips("false");
        });
    }
}));