var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js");

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp();

Page(_extends({}, _reload.reload, {
    data: {
        list: {
            load: !1,
            over: !1,
            page: 1,
            length: 10,
            none: !1,
            data: []
        },
        currentStatus: 0,
        statusType: [ "短租订单", "长租订单","旅游租车" ],
        first: 0
    },
    onLoad: function(t) {},
    onloadData: function(t) {
        var a = this;
        t.detail.login && (this.setData({
            login: !0
        }), this.data.first = 1, this.checkUrl().then(function(t) {
            a.getListData();
        }).catch(function(t) {
            -1 === t.code ? a.tips(t.msg) : a.tips("false");
        }));
    },
    onShow: function() {
        1 == this.data.first && this.onloadData({
            detail: {
                login: 1
            }
        });
    },
    getListData: function() {
        var a = this;
        if (!this.data.list.over) {
            this.setData(_defineProperty({}, "list.load", !0));
            var e = {
                type: this.data.currentStatus - 0 + 1,
                page: this.data.list.page,
                length: this.data.list.length,
                uid: wx.getStorageSync("userInfo").wxInfo.id
            };
            (0, _api.OrderListData)(e).then(function(t) {
                a.dealList(t, e.page);
            }).catch(function(t) {
                -1 == t.code ? a.tips(t.msg) : a.tips("false");
            });
        }
    },
    onReachBottom: function() {
        this.getListData();
    },
    statusTap: function(t) {
        this.setData({
            currentStatus: t.currentTarget.dataset.index,
            list: {
                load: !1,
                over: !1,
                page: 1,
                length: 10,
                none: !1,
                data: []
            }
        }), this.getListData();
    },
    onPickTab: function(t) {
        this.navTo("../pickcar/pickcar?oid=" + t.currentTarget.dataset.oid + "&sid=" + t.currentTarget.dataset.sid);
    },
    onPayTab: function(t) {
        this.navTo("../orderinfo/orderinfo?oid=" + t.currentTarget.dataset.oid + "&table=1");
    }
}));