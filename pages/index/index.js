//index.js
//获取应用实例
const app = getApp()

//总秒
var maxTime = 5;
//timeout间隔时间
var time = 1000;
//重发按钮定时器
var codeTimer = null;

Page({
  data: {
    disabled: false,
    code: '获取验证码'
  },
  /**
  * 处理获取验证码按钮的验证请求
  * @mthoed goGetCode
  */
  goGetCode() {
    //如果验证码按钮的倒计时已计时完毕则重置按钮信息
    if (codeTimer == null) {
      this.setData({
        code: `${maxTime}秒后重发`,
        disabled: true
      })
      //发送倒计时请求

      //启动倒计时动画
      codeTimer = setTimeout(this.starTcountdown.bind(this, maxTime), time);
    }
  },
  /**
   * 启动倒计时动画
   * @method starTcountdown
   * @param maxtime倒计时动画总时间
   * **/
  starTcountdown(maxtime) {
    //清除初始化时的timeout和递归创建的timeout
    if (codeTimer) {
      clearTimeout(codeTimer);
    }
    maxtime--;
    if (maxtime > 0) {
      this.setData({
        code: `${maxtime}秒后重发`
      })
      codeTimer = setTimeout(() => {
        this.starTcountdown(maxtime)
      }, time)
    } else {
      this.setData({
        code: '获取验证码',
        disabled: false
      })
      //清除递归timer
      clearTimeout(codeTimer)
      codeTimer = null;
    }
  }
})