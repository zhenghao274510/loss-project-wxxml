var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, _reload = require("../../common/js/reload.js"), _api = require("../../common/js/api.js");

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page(_extends({}, _reload.reload, {
    data: {
        show: !1,
        tipsGroup: [],
        tid: 0,
        chooseMoney: 0,
        chooseServer: !1,
        chooseIntegral: !1,
        shuomingSelect: !0,
        hideServerBox: !0,
        hideHighBox: !0,
        hideRulesBox: !0
    },
    onLoad: function(e) {
        this.setData({
            options: e
        });
    },
    onloadData: function(e) {
        var t = this;
        e.detail.login && (this.setData({
            show: !0
        }), this.checkUrl().then(function(e) {
            t.onloadDatas(t.data.options);
        }).catch(function(e) {
            -1 === e.code ? t.tips(e.msg) : t.tips("false");
        }));
    },
    onloadDatas: function(e) {
        var r = this, s = JSON.parse(e.param), t = wx.getStorageSync("concatInfo");
        t ? (s.username = t.username, s.tel = t.tel) : (s.username = "", s.tel = ""), this.setData({
            param: s
        }), (0, _api.CheckOrdData)(s).then(function(e) {
            var t = ((s.day - 0) * e.carinfo.money).toFixed(2), a = ((s.day - 0) * e.carinfo.service_fee).toFixed(2), o = ((s.day - 0) * e.carinfo.zx_service_fee).toFixed(2), i = ((s.day - 0) * e.carinfo.money + (s.day - 0) * e.carinfo.service_fee + (e.carinfo.fee - 0)).toFixed(2), n = null;
            1 == s.active && (t = ((s.day - 0) * e.carinfo.act_money).toFixed(2), i = ((s.day - 0) * e.carinfo.act_money + (s.day - 0) * e.carinfo.service_fee + (e.carinfo.fee - 0)).toFixed(2)), 
            1 == s.type ? n = "0.00" == e.orderset.short_prepay || "0" == e.orderset.short_prepay || "" == e.orderset.short_prepay ? ((s.day - 0) * e.carinfo.money).toFixed(2) : e.orderset.short_prepay : 2 == s.type && (s.mealMoney && (t = ((s.day - 0) * (e.carinfo.money - e.carinfo.money * s.mealMoney / 100)).toFixed(2), 
            i = ((s.day - 0) * (e.carinfo.money - e.carinfo.money * s.mealMoney / 100) + (s.day - 0) * e.carinfo.service_fee + (e.carinfo.fee - 0)).toFixed(2)), 
            n = "0.00" == e.orderset.long_prepay || "0" == e.orderset.long_prepay || "" == e.orderset.long_prepay ? s.mealMoney ? ((s.day - 0) * (e.carinfo.money - e.carinfo.money * s.mealMoney / 100)).toFixed(2) : ((s.day - 0) * e.carinfo.money).toFixed(2) : e.orderset.long_prepay), 
            r.setData({
                msg: e,
                price1: t,
                price2: a,
                price3: o,
                price4: i,
                price5: n
            }), (0, _api.KycouponData)({
                uid: wx.getStorageSync("userInfo").wxInfo.id,
                full: e.kycoupontotal
            }).then(function(e) {
                r.setData({
                    tipsGroup: e
                });
            }, function(e) {
                console.log("err" + e);
            });
        }, function(e) {
            console.log("err" + e);
        });
    },
    changeTips: function(e) {
        var t = this.data.tipsGroup[e.detail.value], a = t.money, o = t.id, i = (this.data.price4 - 0 + (this.data.chooseMoney - 0) - (a - 0)).toFixed(2);
        this.setData({
            tid: o,
            price4: i,
            chooseMoney: a
        });
    },
    onChooseServerTab: function() {
        this.setData({
            chooseServer: !this.data.chooseServer
        }), !0 === this.data.chooseServer ? this.setData({
            price4: (this.data.price4 - 0 + (this.data.price3 - 0)).toFixed(2)
        }) : this.setData({
            price4: (this.data.price4 - 0 - (this.data.price3 - 0)).toFixed(2)
        });
    },
    onChooseIntegralTab: function() {
        this.setData({
            chooseIntegral: !this.data.chooseIntegral
        }), !0 === this.data.chooseIntegral ? this.setData({
            price4: (this.data.price4 - 0 - (this.data.msg.kdmoney - 0)).toFixed(2)
        }) : this.setData({
            price4: (this.data.price4 - 0 + (this.data.msg.kdmoney - 0)).toFixed(2)
        });
    },
    shuomingSel: function(e) {
        this.setData({
            shuomingSelect: !this.data.shuomingSelect
        });
    },
    seeLowBox: function(e) {
        this.setData({
            hideServerBox: !1
        });
    },
    seeHighBox: function(e) {
        this.setData({
            hideHighBox: !1
        });
    },
    seeRulesBox: function(e) {
        this.setData({
            hideRulesBox: !1
        });
    },
    closeTap: function() {
        this.setData({
            hideServerBox: !0,
            hideHighBox: !0,
            hideRulesBox: !0
        });
    },
    onPayTab: function(e) {
        var o = this, t = e.detail.formId;
        if (this.setData({
            formId: t
        }), this.data.shuomingSelect) {
            var a = {
                formId: t,
                uid: wx.getStorageSync("userInfo").wxInfo.id,
                cid: this.data.param.cid,
                start_time: this.data.param.start_time,
                end_time: this.data.param.end_time,
                start_shop: this.data.msg.carinfo.sid,
                end_shop: this.data.msg.carinfo.sid,
                type: this.data.param.type,
                gettype: this.data.param.gettype,
                couponid: this.data.tid,
                active: this.data.param.active,
                day: this.data.param.day,
                open_zx_service: this.data.chooseServer ? 1 : 0,
                open_integral: this.data.chooseIntegral ? 1 : 0,
                username: this.data.param.username,
                tel: this.data.param.tel
            };
            if (a.username.length < 2) wx.showToast({
                title: "请输入取车信息中的姓名！",
                icon: "none",
                duration: 1e3
            }); else if (a.tel.length < 11) wx.showToast({
                title: "请输入取车信息中的联系电话！",
                icon: "none",
                duration: 1e3
            }); else {
                var i = {
                    username: this.data.param.username,
                    tel: this.data.param.tel
                };
                wx.setStorageSync("concatInfo", i), "2" == this.data.param.type && (a.typeid = this.data.param.typeid), 
                "1" == this.data.chooseIntegral && (a.integral_money = this.data.msg.kdmoney, a.integral = this.data.msg.kdscore), 
                console.log(a), (0, _api.OrderData)(a).then(function(e) {
                    var a = e;
                    (0, _api.appPay)({
                        openid: wx.getStorageSync("userInfo").openid,
                        oid: e
                    }).then(function(e) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "none",
                            duration: 1e3
                        });
                        var t = {
                            formId: o.data.formId,
                            prepay_id: e.prepay_id,
                            oid: a,
                            shopname: o.data.msg.shopinfo.name
                        };
                        console.log(t), (0, _api.PaysuccessData)(t).then(function(e) {
                            setTimeout(function() {
                                wx.redirectTo({
                                    url: "../pickcar/pickcar?oid=" + e.oid + "&sid=" + e.sid
                                });
                            }, 1e3);
                        }, function(e) {
                            console.log("err");
                        });
                    }, function(e) {
                        wx.showToast({
                            title: "失败",
                            icon: "none",
                            duration: 1e3
                        });
                    });
                }, function(e) {
                    e.data.oid && setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3), wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 1e3
                    });
                });
            }
        } else wx.showToast({
            title: "请阅读并同意条款规则",
            icon: "none",
            duration: 1e3
        });
    },
    getName: function(e) {
        var t = e.detail.value.trim();
        this.setData(_defineProperty({}, "param.username", t));
    },
    getTel: function(e) {
        var t = e.detail.value.trim();
        this.setData(_defineProperty({}, "param.tel", t));
    }
}));