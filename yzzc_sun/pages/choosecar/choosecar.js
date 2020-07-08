var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    }
    return t;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js");

function _defineProperty(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var app = getApp();

Page(_extends({}, _reload.reload, {
    data: {
        show: !1,
        imgLink: wx.getStorageSync("url"),
        navList: [],
        chooseNav: 0,
        list: {
            load: !1,
            over: !1,
            page: 1,
            length: 10,
            none: !1,
            data: []
        },
        sort: "asc",
        first: 0
    },
    onLoad: function(t) {
        this.setData({
            options: t
        });
    },
    onloadData: function(t) {
        var a = this, i = JSON.parse(this.data.options.param);
        this.setData({
            param: i
        }), console.log(i), t.detail.login && (this.data.first = 1, this.setData({
            show: !0
        }), this.checkUrl().then(function(t) {
            return (0, _api.CartypeData)();
        }).then(function(t) {
            a.setData({
                navList: t
            }), a.getListData();
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
            var i = {
                page: this.data.list.page,
                length: this.data.list.length,
                sid: this.data.param.sid,
                cartype: this.data.navList[this.data.chooseNav].id,
                sort: this.data.sort
            };
            (0, _api.CarlistData)(i).then(function(t) {
                a.dealList(t, i.page);
            }).catch(function(t) {
                -1 == t.code ? a.tips(t.msg) : a.tips("false");
            });
        }
    },
    onReachBottom: function() {
        this.getListData();
    },
    onNavTab: function(t) {
        var a = t.currentTarget.dataset.idx;
        this.setData({
            chooseNav: a
        }), this.setData({
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
    changeRank: function() {
        "asc" == this.data.sort ? this.setData({
            sort: "desc"
        }) : this.setData({
            sort: "asc"
        }), this.setData({
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
    onSendTab: function(t) {
        var a = this, i = t.currentTarget.dataset.idx;
        this.data.param.cid = this.data.list.data[i].id, this.data.param.carType = this.data.list.data[i].carType, 
        this.data.param.carControl = this.data.list.data[i].carControl;
        var e = JSON.stringify(this.data.param);
        (0, _api.IsorderData)({
            cid: this.data.list.data[i].id,
            uid: wx.getStorageSync("userInfo").wxInfo.id
        }).then(function(t) {
            a.navTo("../checkorder/checkorder?param=" + e);
        }, function(t) {
            -1 === t.code ? a.navTo("../orderinfo/orderinfo?oid=" + t.data.oid + "&table=1") : wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 1e3
            });
        });
    }
}));