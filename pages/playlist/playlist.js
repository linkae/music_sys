const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playlist:null,
        baseUrl:app.globalData.baseUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    /**
     * 查询歌单列表
     */
    getPlayList(){
        var that = this;
        wx.request({
          url: app.globalData.baseUrl+'/playlist/list',
          success(res){
            var playlist = res.data.data;
            that.setData({
                playlist:playlist
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
        this.getPlayList();
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