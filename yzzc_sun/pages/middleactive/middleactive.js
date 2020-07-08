// yzzc_sun/pages/middleactive/middleactive.js
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
  onLoad: function(e) {
    wx.setNavigationBarTitle({
      title:"购车无忧"
    })
  },
  goYuDing: function (t) {
    this.navTo("../choosetime/choosetime?table=1&cid=" + t.currentTarget.dataset.cid);
  },
  getListData:function(){
      
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

}));
