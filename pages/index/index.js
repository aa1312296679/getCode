//index.js
//获取应用实例
const app = getApp()


//timeout间隔时间
var time = 1000;


Page({
  data: {
    code: '获取验证码',
    //验证码的定时器
    codeTimer: null,
    //验证码总秒
    maxTime: 3
  },
  /**
   * 处理获取验证码按钮的验证请求
   * @mthoed goGetCode
   */
  goGetCode() {
    //如果验证码按钮的倒计时已计时完毕则重置按钮信息
    if (this.data.codeTimer == null) {
      this.setData({
        code: `${this.data.maxTime}秒后重发`
      })

      //启动倒计时动画
      this.data.codeTimer = setTimeout(this.starTcountdown.bind(this, {
        "timer": "codeTimer",
        "maxTime": this.data.maxTime,
        "initTxt": "获取验证码",
        "initTxtData": "code",
        "txtSecond": "",
        "txtInfor": "秒后重发"
      }), time);
    }
  },
  /**
   * 启动倒计时动画
   * @method starTcountdown   
   * @param infor {Object} 
   * Object 配置信息
   * initalTimer 初始化时的timer
   * **/
  starTcountdown(infor) {
    var tempObj = {};
    if (this.data[infor['timer']]) {
      clearTimeout(this.data[infor['timer']]);
      infor['timer'] = null;
    }

    //判断动画秒数是否已截止
    if (infor['maxTime'] < 1) {
      this.data[infor['timer']] = null;
      //恢复按钮的初始信息
      tempObj[infor['initTxtData']] = infor['initTxt'];
      //恢复倒计时动画的初始值
      this.setData(
        tempObj
      )
      return false;
    }

    //递减验证信息的总秒
    infor['maxTime'] = --infor['maxTime'];
    //判断是否秒数为1 为0时不提示动画
    if (infor['maxTime'] !== 0) {
      //重组的提示信息
      infor['txtSecond'] = infor['maxTime'] + infor['txtInfor'];
      //获取提示信息所对应的全局属性名
      //构建数据层的setData配置信息
      tempObj[infor['initTxtData']] = infor['txtSecond'];
      //将更新信息更新至数据层
      this.setData(tempObj);
    }

    //获取存放动画定时器的键名
    var timer = setTimeout(() => {
      this.starTcountdown(infor);
    }, time);
    
    this.data[infor['timer']] = timer;
  }
});