var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js"), app = getApp();

Page(_extends({}, _reload.reload, {
    data: {
        statusType: [ "积分明细", "兑换记录" ],
        quanData: [],
        now: 0,
        all: 0,
        rule: "",
        preventJifen: 0
    },
    onLoad: function(t) {},
    onloadData: function(t) {
        var e = this;
        t.detail.login && (this.setData({
            show: !0
        }), this.checkUrl().then(function(t) {
            var e = {
                uid: wx.getStorageSync("userInfo").wxInfo.id
            };
            return (0, _api.IntegralData)(e);
        }).then(function(t) {
            e.setData({
                quanData: t.rent,
                all: t.user.all_integral,
                now: t.user.now_integral,
                rule: t.rentrule.content,
                jifen: t.jfrule.rule
            });
        }).catch(function(t) {
            -1 === t.code ? e.tips(t.msg) : e.tips("false");
        }));
    },
    statusTap: function(t) {
        wx.navigateTo({
            url: "../jifendetails/jifendetails?title=" + t.currentTarget.dataset.title + "&&curIndex=" + t.currentTarget.dataset.index
        });
    },
    onExchangeTab: function(t) {
        var e = this;
        if (1 !== this.data.preventJifen) {
            var n = {
                uid: wx.getStorageSync("userInfo").wxInfo.id,
                cid: t.currentTarget.dataset.cid
            };
            (0, _api.ExchangeData)(n).then(function(t) {
                e.setData({
                    preventJifen: 1
                }), wx.showToast({
                    title: "领取成功！",
                    icon: "none",
                    duration: 1e3
                });
            }, function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 1e3
                });
            });
        } else wx.showToast({
            title: "您已领过！",
            icon: "none",
            duration: 1e3
        });
    }
}));