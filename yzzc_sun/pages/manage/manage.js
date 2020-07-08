var _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js"), app = getApp();

Page(_extends({}, _reload.reload, {
    data: {
        show: !1
    },
    onLoad: function(e) {},
    onloadData: function(e) {
        var n = this;
        e.detail.login && this.checkUrl().then(function(e) {
            var n = {
                uid: wx.getStorageSync("userInfo").wxInfo.id
            };
            return Promise.all([ (0, _api.WeData)(), (0, _api.AdminInfoData)(n) ]);
        }).then(function(e) {
            n.setData({
                shop: e[0],
                show: !0,
                info: e[1]
            });
        }).catch(function(e) {
            -1 === e.code ? "您还不是管理员哦" == e.msg ? wx.showModal({
                title: "提示",
                content: "您不是管理员哦！",
                showCancel: !1,
                success: function(e) {
                    wx.reLaunch({
                        url: "../mine/mine"
                    });
                }
            }) : n.tips(e.msg) : n.tips("false");
        });
    }
}));