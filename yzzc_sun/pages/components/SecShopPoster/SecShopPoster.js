Component({
    data: {
        avatar: "",
        banner: "",
        qr: "",
        img: [],
        show: !0
    },
    properties: {
        posterInfo: {
            type: Object,
            value: {
                avatar: "",
                banner: "",
                title: "",
                qr: "",
                have: !0
            },
            observer: function(t, e, i) {
                var a = this;
                if (t && null != t && "" != t.qr && !t.have) {
                    this.data.posterInfo.banner, this.data.posterInfo.qr, this.data.posterInfo.avatar;
                    wx.getImageInfo({
                        src: a.data.posterInfo.banner,
                        success: function(t) {
                            a.setData({
                                banner: t.path
                            }), wx.getImageInfo({
                                src: a.data.posterInfo.qr,
                                success: function(t) {
                                    a.setData({
                                        qr: t.path
                                    }), wx.getImageInfo({
                                        src: a.data.posterInfo.avatar,
                                        success: function(t) {
                                            a.setData({
                                                avatar: t.path
                                            }), a.drawPoster(t);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    },
    ready: function() {},
    methods: {
        drawPoster: function(t) {
            var e = this, i = wx.createCanvasContext("poster", this);
            i.setFillStyle("#ffb62b"), i.fillRect(0, 0, 750, 1100), i.drawImage("./bg.png", 168, 95, 533, 74);
            var a = {
                obj: i,
                str: "我发现了一个小程序，给你推荐一下",
                initHeight: 140,
                initWidth: 241,
                titleHeight: 60,
                canvasWidth: 560,
                fontsize: 26,
                color: "#333",
                maxline: 1,
                center: !1
            };
            this.drawText(a);
            i.setFillStyle("#fff"), i.fillRect(55, 229, 640, 840), i.setStrokeStyle("#000"), 
            i.strokeRect(55, 229, 640, 840), i.drawImage(this.data.banner, 75, 249, 600, 460);
            var r = {
                obj: i,
                str: this.data.posterInfo.title,
                initHeight: 766,
                initWidth: 75,
                titleHeight: 60,
                canvasWidth: 560,
                fontsize: 30,
                color: "#333",
                maxline: 1,
                center: !0
            };
            this.drawText(r);
            i.drawImage(this.data.qr, 260, 800, 230, 230), i.beginPath(), i.arc(96, 134, 50, 0, 2 * Math.PI), 
            i.clip(), i.drawImage(this.data.avatar, 46, 84, 100, 100), i.restore(), i.draw(), 
            setTimeout(function() {
                e.createPoster();
            }, 500);
        },
        createPoster: function() {
            var i = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1100,
                destWidth: 750,
                destHeight: 1100,
                canvasId: "poster",
                success: function(t) {
                    i.setData({
                        show: !1
                    });
                    var e = {
                        url: t.tempFilePath
                    };
                    i.triggerEvent("create", e);
                }
            }, this);
        },
        drawText: function(t) {
            var e = t.obj, i = t.titleHeight, a = 0, r = 0, s = 0, n = t.canvasWidth;
            e.setFontSize(t.fontsize), e.fillStyle = t.color;
            for (var h = 0; h < t.str.length; h++) {
                if ((a += e.measureText(t.str[h]).width) > t.canvasWidth) {
                    if (++s >= t.maxline) {
                        var o = t.str.substring(r, h - 1) + "...";
                        if (t.center) {
                            var l = (750 - a) / 2;
                            e.fillText(o, l, t.initHeight);
                        } else e.fillText(o, t.initWidth, t.initHeight);
                        t.canvasWidth, t.titleHeight;
                        return t.titleHeight;
                    }
                    e.fillText(t.str.substring(r, h), t.initWidth, t.initHeight), t.initHeight += i, 
                    a = 0, r = h, t.titleHeight += i;
                }
                if (h == t.str.length - 1) if (s < 1 && (n = a), t.center) {
                    var c = (750 - a) / 2;
                    e.fillText(t.str.substring(r, h + 1), c, t.initHeight);
                } else e.fillText(t.str.substring(r, h + 1), t.initWidth, t.initHeight);
            }
            return {
                width: n,
                height: t.titleHeight
            };
        }
    }
});