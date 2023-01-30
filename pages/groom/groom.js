// pages/groom/groom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //定义变量存储搜索关键字 
     kw:"",
     //定义查询歌曲的条数的变量
     limit:6,
     //定义变量存储歌曲的信息
     songs:[],
     // 定义存放歌曲封面的数组
     picUrl:[]
  },
  /**获取输入框的关键之 */
  getKeyWord:function(e){
    var keyword=e.detail.value;
    //给data中定义的kw赋值
    this.setData({
      kw:keyword
    })
  },
  /**根据关键字搜索歌曲 */
  do_search:function(){
    //显示loadding提示框
    wx.showLoading({
      title: '歌曲搜索中....',
    })
    //1.获取data中的关键字
    var kw=this.data.kw;
    var that=this;
    //定义空数组存储搜索出来的所有歌曲的id
    var searchIds=[];
    //定义存放歌曲名称的数组
    var names=[];
    //定义存放歌手id的数组
    var artists=[];
    //2.发送异步请求
    wx.request({
      url: 'http://music.163.com/api/search/get?s='+kw+'&type=1&limit='+this.data.limit,
      success:function(res){
        //取消loading提示框
        wx.hideLoading()
        //成功返回的回调函数
        var resultSongs=res.data.result.songs;
         for(var i=0;i<resultSongs.length;i++){
              //将搜索出来的id添加到searchIds
              searchIds.push(resultSongs[i].id);
              //将搜索出来的name添加到names中
              names.push(resultSongs[i].name);
              //将搜索出来的歌手的id添加到artists
              artists.push(resultSongs[i].artists[0].id);
         }
         //清空封面数组 
         that.setData({
          picUrl:[]
         })
        // 调用查询封面的方法
        that.getMusicImage(searchIds,0,searchIds.length);
        that.setData({
          songs:resultSongs
        })
      }
    })
  },

  /**根据搜索的id查询歌曲详情(歌曲的封面) */
  getMusicImage:function(searchIds,i,length){
    //获取data中自定义的封面变量
    var pic=this.data.picUrl;
    var that=this;
    //发送请求
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+searchIds[i]+'&ids=['+searchIds[i]+']',
      success:function(res){
        //成功之后的回调函数
        //获取封面
        var img=res.data.songs[0].album.blurPicUrl;
        //获取专辑的名称
        var name=res.data.songs[0].album.name;
        //添加封面
        pic.push(img);
        //给data中赋值
        that.setData({
          picUrl:pic
        })
        //判断
        // ++i：先计算后赋值   i++：先赋值后计算
        if(++i<length){
          that.getMusicImage(searchIds,i,length);
        }

      }
    })

  },

  /**点击跳转播放页面 */
  gotoPlay:function(e){
    var ids = []
    //获取所有的歌曲id
    this.data.songs.forEach(function(v){
        ids.push(v.id)
    })
    //接收事件中传过来的数据
    var id=e.currentTarget.dataset.id;
    //在页面跳转的时候将歌曲的id和歌曲列表的所有id数组一起传递过去
    wx.navigateTo({
      url: '/pages/play/play?mid='+id+"&ids="+ids,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    //修改limit的值
    this.setData({
        limit:this.data.limit+6
    })
    this.do_search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})