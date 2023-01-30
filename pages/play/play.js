//创建音频对象
const innerAudioContext= wx.createInnerAudioContext();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义歌曲的播放状态变量
    state:'play',//默认播放状态
    //定义歌曲对象，当前正在播放的歌曲
    song:null,
    //歌词数组
    lyricArray:null,
    //记录正在播放的行号
    currentIndex:0,
    //歌词滚动上移的大小
    scrollTop:0,
    //音频的总时长
    duration:0,
    //当前音频播放进度
    currentTime:0,
    playTime:"",
    endTime:"",
    commentList:[],
    //当前歌曲id
    id:0,
    //歌曲列表对应的id数组
    ids:[],
    playlist:null,//歌单列表
    display:"none",//歌单列表默认隐藏
    baseUrl:app.globalData.baseUrl
  },

  /**
   * 显示歌单列表按钮
   */
  showPlayList(){
    var display = this.data.display=='none'?'block':'none';
    this.setData({
        display:display
    })
    this.getPlayList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //接收传递的id数组
    var ids = options.ids
    ids = ids.split(",")
    //接收传递过来的id
    var id=options.mid;
    this.mp3Play(id,ids)
  },
  /**
   * 歌曲播放相关方法
   */
  mp3Play(id,ids){
    //给data中的变量赋值
    this.setData({
        id:id,
        ids:ids
    })
    //1.给音频的src赋值
    innerAudioContext.src="https://music.163.com/song/media/outer/url?id="+id+".mp3";
    //先暂停，再播放，为了解决再次播放不触发onTimeUpdate函数的问题
    innerAudioContext.pause();
    innerAudioContext.play();
    innerAudioContext.onCanplay(()=>{
        var duation = innerAudioContext.duration
    })
    //4. 根据歌曲id获取歌曲详情
    this.getMusicInfoById(id);
    //5. 根据歌曲id获取歌词
    this.getLyricById(id);
    //6. 只要音频播放，就能触发的函数
    innerAudioContext.onTimeUpdate(()=>{
        console.log("音频进度改变....");
       //调用歌词滚动
       this.lyricScroll();
       //调用处理进度条改变的方法
       this.progressChange();
    })
    //7. 根据id获取评论
    this.getCommentById(id)
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
   * 上一首
   */
  prevSong(){
    //获取当前的歌曲id和所有id数组
    var id = this.data.id;
    var ids = this.data.ids;
    //记录当前歌曲id的下标
    var index = 0;
    for(var i=0;i<ids.length;i++){
        if(ids[i]==id){
            index = i;
            break;
        }
    }
    var prevIndex = index==0?ids.length-1:index-1;
    this.mp3Play(ids[prevIndex],ids)
  },
  /**
   * 拖动进度条触发的函数
   */
  dragSlider(e){
    //获取拖动之后进度条的值(音频的进度)
    var value = e.detail.value
    //利用value改变音频的进度
    innerAudioContext.seek(value);
  },
  getCommentById(id){
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/v1/resource/comments/R_SO_4_'+id,
      success(res){
        var hotComments = res.data.hotComments;
        that.setData({
            commentList:hotComments
        })
      }
    })
  },
  /**
   * 处理进度条时间改变的方法
   */
  progressChange(){
    // 获取音频的总时长
    var duration = innerAudioContext.duration;
    // 实时获取当前音频的进度
    var currentTime = innerAudioContext.currentTime;
    //将currentTime转换成分秒单位，然后赋值
    var playMinute = Math.floor(currentTime/60)
    var playSeconds = Math.floor(currentTime%60)
    var endMinute = Math.floor(duration/60)
    var endSeconds = Math.floor(duration%60)
    //对分秒判断是否大于9
    playMinute = playMinute>9?playMinute:"0"+playMinute
    playSeconds = playSeconds>9?playSeconds:"0"+playSeconds
    endMinute = endMinute>9?endMinute:"0"+endMinute
    endSeconds = endSeconds>9?endSeconds:"0"+endSeconds
    this.setData({
        duration:duration,
        currentTime:currentTime,
        playTime:playMinute+":"+playSeconds,
        endTime:endMinute+":"+endSeconds
    })
  },

  /**
   * 正在播放歌词颜色变红，且歌词滚动
   */
  lyricScroll(){
     // 实时获取当前音频的进度
     var currentTime = innerAudioContext.currentTime;
     //获取歌词
     var lyricArray = this.data.lyricArray
     if(lyricArray!=null){
        //因为最后一句歌词没有下一句，所以不适用下面的判断条件
        if(this.data.currentIndex>=lyricArray.length-2){
            //再判断当前时间是否大于最后一句歌词的时间
            if(currentTime>=lyricArray[lyricArray.length-1][0]){
            this.setData({
                currentIndex:lyricArray.length-1
            })
            }
        }else{
            //遍历所有歌词，比较currentTime和歌词的时间，
            //currentTime大于等于当前行，且小于下一行的时间
            for(var i=0;i<lyricArray.length-1;i++){
                if(currentTime>=lyricArray[i][0] && currentTime < lyricArray[i+1][0] ){
                    //记录当前正在播放的行号
                this.setData({
                    currentIndex:i
                })
                }
            }
        } 
        //当播放的歌词下标超过6时，开始滚动，反之保证一直为0
        if(this.data.currentIndex>=6){
            //给scrollTop赋值
            this.setData({
                scrollTop:(this.data.currentIndex-6)*30
            })
         }else{
             this.setData({
                 scrollTop:0
             })
         }
     }
     
     
  },
  /**
   * 根据歌曲id获取歌词
   */
  getLyricById(id){
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/song/lyric?os=pc&id='+id+'&lv=-1&kv=-1&tv=-1',
      success(res){
        //解析歌词
        var lyric = res.data.lrc.lyric;
        //将歌词与时间分割开，且要保证一一对应
        that.parseLyric(lyric)
      }
    })
  },
  /**
   * 解析歌词的方法  ---->将歌词和时间分割开，且一一对应
   */
  parseLyric(lyric){
    //将lyric根据换行符分割成一句一句的歌词
    var lyricArray = lyric.split("\n")
    //判断最后一个字符是否为空，如果是，删掉
    if(lyricArray[lyricArray.length-1]==''){
        lyricArray.pop();
    }
    //定义歌词数组--->存放最终的结果
    var finalResult = []
    //遍历每一句歌词
    //[00:01.000] 作曲 : 许嵩
    lyricArray.forEach(function(v/*数组中的每个元素*/,i/*每个元素的下标*/,a/*被遍历的数组本身 */){
        //根据 ] 进行切割
        var lyricText = v.split("]")[1]//取歌词文本
        //去掉歌词为空的数据
        if(lyricText!=""){
            // [00:01.000---->00:01.000
            var timeStr = v.split("]")[0].replace("[","")
            //将 00:01.000-->转换成秒为单位
            var time = parseFloat(timeStr.split(":")[0])*60+parseFloat(timeStr.split(":")[1])
            //将time和lyricText添加到歌词数组中
            finalResult.push([time,lyricText])
        }
        
    })
    //将finalResult赋值给lyricArray
    this.setData({
        lyricArray:finalResult
    })
  },


  /**
   * 根据歌曲id获取歌曲详情
   */
  getMusicInfoById(id){
    var that = this;
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+id+'&ids=['+id+']',
      success(res){
        //res:服务器根据请求给出的响应值
        //层层解析获取出来resultSong歌曲
        var resultSong = res.data.songs[0];
        //将resultSong赋值给data中的song
        that.setData({
            song:resultSong
        })
      }
    })
  },
  /**
   * 暂停或播放
   */
  pauseOrPlay(){
    //获取当前歌曲的播放状态
    var state = this.data.state
    //如果是播放，变为暂停
    if(state=='play'){
        //暂停歌曲
        innerAudioContext.pause()
        //修改state的值
        this.setData({
            state:'pause'
        })
    }else{
        //如果是暂停，变为播放
        innerAudioContext.play()
        //修改state的值
        this.setData({
            state:"play"
        })
    }
    
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