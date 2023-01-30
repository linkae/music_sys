const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        playSrc:"/upload/default.jpg",
        baseUrl:app.globalData.baseUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 表单提交
     */
    formSubmit(e){
        var formData = e.detail.value;
        formData['playImgPath']=this.data.playSrc;
        wx.request({
          url: app.globalData.baseUrl+'/playlist/add',
          data:formData,
          method:"post",
          dataType:"json",
          success(res){
            wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000
            })
            setTimeout(function(){
                wx.navigateBack()
            },1000)
            
          }
        })
    },
    /**
     * 选择图片
     */
    uploadImage(){
        var that = this;
        wx.chooseMedia({
            count: 1,
            mediaType: ['image','video'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success(res) {
                //获取选择文件的临时路径
                var tempFilePath = res.tempFiles[0].tempFilePath;
                wx.uploadFile({
                    url: app.globalData.baseUrl+"/playlist/upload", //java的上传接口
                    filePath: tempFilePath,
                    name: 'uploadFile',//后端的MultipartFile的参数跟他一致
                    success (res){
                      const imgPath = JSON.parse(res.data).data;
                      console.log(imgPath);
                      that.setData({
                        playSrc:imgPath
                      })
                    }
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