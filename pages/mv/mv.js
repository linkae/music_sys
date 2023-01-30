// pages/mv/mv.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoSrc:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //接收mvid
        var mvId = options.id;
        wx.request({
          url: 'https://music.163.com/api/mv/detail?id='+mvId+'&type=mp4',
          success(res){
            var videoSrc = res.data.data.brs['240'];
            that.setData({
                videoSrc:videoSrc
            })
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
})