// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:[
      "https://p1.music.126.net/8NPIwSOiCPvTgoJQFnPxxA==/109951167885427444.jpg",
      "https://p1.music.126.net/iZ6jTfywfhmmUG5BF96n5Q==/109951167885414367.jpg",
      "https://p1.music.126.net/aZpRhGv2TRXNgCvDA-TxPA==/109951167885435357.jpg",
      "https://p1.music.126.net/1HWOZBdm3dJOldCtq8ab9A==/109951167885443259.jpg"
    ],
    // 定义歌曲数组： 排行榜  歌曲名称  歌曲图片。。。
    songList:[
      {
        name:"云音乐热歌榜",
        songs:[
          {
            id:1,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:2,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:3,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          }
        ]
      },
      {
        name:"云音乐飙升榜",
        songs:[
          {
            id:1,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:2,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:3,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          }
        ]
      },
      {
        name:"云音乐新歌榜",
        songs:[
          {
            id:1,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:2,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          },
          {
            id:3,
            imgUrl:"https://p4.music.126.net/GiiZXrrt17PJ-9t6uZl7qQ==/109951167886417247.jpg",
            musicName:"情歌"
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

/**
 * 点击每日推荐按钮跳转到groom页面
 */
  groomTop:function(){
    // 页面跳转
    wx.navigateTo({
      url: '/pages/groom/groom',
    })
  },
  /**
   * 跳转到歌单页面
   */
  gotoPlaylist(){
    wx.navigateTo({
      url: '/pages/playlist/playlist',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})