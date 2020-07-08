var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js"), app = getApp();

Page(_extends({}, _reload.reload, {
    data: {},
    onLoad: function(t) {
        this.getAvatar();
    },
    onloadData: function(t) {
        var r = this;
        t.detail.login && (this.setData({
            show: !0
        }), this.checkUrl().then(function(t) {
            var e = {
                uid: wx.getStorageSync("userInfo").wxInfo.id
            };
            return (0, _api.MemberData)(e);
        }).then(function(t) {
            var e = t.list[t.list.length - 1].level_score - 0, a = t.userinfo.all_integral - 0, n = parseInt(a / e * 100);
            r.setData({
                msg: t,
                per: n
            });
        }).catch(function(t) {
            -1 === t.code ? r.tips(t.msg) : r.tips("false");
        }));
    },
    getAvatar: function() {
        var t = wx.getStorageSync("userInfo").wxInfo;
        this.setData({
            nickName: t.user_name,
            avatar: t.headimg
        });
    }
}));