const app = getApp();
const util = require('../../utils/util');
const api = require('../../utils/api');
const http = require('../../utils/http');

Page({
	data:{
		// 小程序的提示添加动画，默认为：false，显示
		isWebChatTipsHidden:false,
		// 吸顶效果
		cat_is_fixed:false,
		/**
		 * 轮播图
		 **/
		indicatorDots: true,
		autoplay: true,
		// 间隔时间
		interval:5000,
    duration:1000,  //单位都是毫秒
    current:0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://api.ixiaowai.cn/api/api.php'
    }, {
      id: 1,
        type: 'image',
        url: 'https://api.btstu.cn/sjbz/api.php',
    }, {
      id: 2,
      type: 'image',
      url: 'https://api.ixiaowai.cn/gqapi/gqapi.php'
    },]


  },



	onPageScroll: function (e) {
    //获取分类导航栏是否是“吸顶”效果
    let cat_is_fixed = this.data.cat_is_fixed;
    //如果页面滑动高度大于等于135（分类导航栏默认距离顶部的高度，此高度值是在开发模拟器下获取测算的偷懒做法）
    if (e.scrollTop >= 135) {
      //显示“吸顶”效果
      !cat_is_fixed && this.setData({
        cat_is_fixed: true
      });
    } else {
      //取消“吸顶”效果，还原分类导航栏默认显示
      cat_is_fixed && this.setData({
        cat_is_fixed: false
      });
    }
	},
	/**
   * 轮播图点击事件
   */
  en_sweiper: function (e) {
    //获取当前点击组件的自定义数据：列表索引
    let index = e.currentTarget.dataset.index;
    //获取当前点击的banner信息
    let item = this.data.swiperList[index];
    //如果banner类型为：仅展示，则跳出此函数
    if (!item.type){
      return;
    }
    //如果appid信息不为空，则表示为：跳转外部小程序
    if (item.appid){
      //打开指定的小程序
      wx.navigateToMiniProgram({
        appId: item.appid,
        path: item.url,
        fail(res) {
          // 打开失败
          wx_api.showToast("小程序打开失败，请检查是否已配置");
        }
      });
    } else if (item.url){
      //如果url（小程序页面路径）不为空，则表示为：小程序内部跳转
      //跳转到小程序内指定页面
      wx.navigateTo({
        url: item.url
      });
    }

	    //开启定时器：8秒后隐藏“添加小程序”的动画提示
			setTimeout(()=>{
				//更新页面数据
				this.setData({
					isWebChatTipsHidden: true
				});
			},8000);
			//调用默认数据加载函数
			this.default_load();
	},
})