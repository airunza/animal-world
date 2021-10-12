<template>
  <div class="page home" @scroll="homeScroll">
    <div class="bg-box">
      <img class="bg" src="../assets/home/bg.png" alt="淡绿色的背景图" />
    </div>

    <div class="content">
      <div v-show="showSkipBegin" class="skipbegin" @click="skipBegin">
        <img class="skip-img" src="../assets/home/skip.png" alt="跳过开头动画" />
      </div>

      <div class="text-box">
        <img class="text1" src="../assets/home/text_1.png" alt="茫茫宇宙" />
        <br>
        <img class="text2" src="../assets/home/text_2.png" alt="生活着无数生物" />
        <br>
        <img class="text3" src="../assets/home/text_3.png" alt="冥冥之中" />
        <br>
        <img class="text4" src="../assets/home/text_4.png" alt="它们可能与你有着不解之缘" />
        <br>
        <img class="text5" src="../assets/home/text_5.png" alt="快去寻找你守护的TA" />
      </div>

      <div class="arrow-box">
        <img class="arrow" src="../assets/home/arrow.png" alt="上滑的箭头" />
      </div>
      
      <div class="footprint-box">
        <img class="footprint-left" src="../assets/home/footprint-left.png" alt="左脚脚印" />
        <br>
        <img class="footprint-right" src="../assets/home/footprint-right.png" alt="右脚脚印" />
        <br>
        <img class="footprint-left" src="../assets/home/footprint-left.png" alt="左脚脚印" />
        <br>
        <img class="footprint-right" src="../assets/home/footprint-right.png" alt="右脚脚印" />
        <br>
        <img class="footprint-left" src="../assets/home/footprint-left.png" alt="左脚脚印" />
        <br>
        <img class="footprint-right" src="../assets/home/footprint-right.png" alt="右脚脚印" />
        <br>
        <img class="footprint-left" src="../assets/home/footprint-left.png" alt="左脚脚印" />
        <br>
        <img class="footprint-right" src="../assets/home/footprint-right.png" alt="右脚脚印" />
        <br>
        <img class="footprint-left" src="../assets/home/footprint-left.png" alt="左脚脚印" />
        <br>
        <img class="footprint-right" src="../assets/home/footprint-right.png" alt="右脚脚印" />
      </div>

      <div class="title-box" :style="{paddingTop: titleBoxPaddingTop + 'rem', paddingBottom: titleBoxPaddingBottom + 'rem'}">
        <img class="title" src="../assets/home/title.png" alt="听它们的声音，保护动植物，聆听生物多样性之美" />
      </div>

      <div class="input-box" :style="{paddingBottom: inputBoxPaddingBottom + 'rem'}">
        <div class="input-area">
          <input type="text" placeholder="请输入昵称" @change="setNickname" value="你" readonly="readonly" />
        </div>
        <!-- <img src="../assets/home/input_bg.png" alt="请输入昵称" /> -->
        
        <div class="input-tip">
          <img src="../assets/home/input_line.png" alt="横线" />
          <img  src="../assets/home/input_text.png" alt="获取一份来自大自然的声音" />
        </div>
      </div>

      <div class="check-btn" @click="checkNickname">
        <img src="../assets/home/check_btn.png" alt="确认按钮" />
        <!-- <div @click="nextPage">跳转到下一页</div> -->
      </div>

      <div class="skipinput" @click="skipInput">
        <img class="skip-img" src="../assets/home/skip.png" alt="跳过输入" />
        <!-- <div @click="nextPage">跳转到下一页</div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import {double, treble} from '../lib.js'

export default {
  data () {
    return {
      // nickname: ''
      scrollElmTouching: false,
      loop: null,

      titleBoxPaddingTop: 2.43,
      titleBoxPaddingBottom: 7.41,
      inputBoxPaddingBottom: 7.73,

      showSkipBegin: true
    }
  },

  methods: {
    nextPage (e) {
      window.resultThing = Math.floor(Math.random() * 6)
      this.$emit('route', e, 'result')
    },

    homeScroll () {
      // console.log(document.querySelector('.home').scrollTop)
      const scrollHeight = document.querySelector('.home').scrollHeight
      const offsetHeight = document.querySelector('.home').offsetHeight
      const scrollTop = document.querySelector('.home').scrollTop

      if (scrollHeight - (scrollTop + offsetHeight) <= 200) {
        this.showSkipBegin = false
      } else {
        this.showSkipBegin = true
      }

      const footprints = document.querySelectorAll('.footprint-box img')
      footprints.forEach(item => {
        // console.log(item.getBoundingClientRect().top - offsetHeight)
        if (item.getBoundingClientRect().top - offsetHeight <= -100) {
          item.style.opacity = '1'
          // clearInterval(this.loop)
        }
      })
    },

    autoScroll () {
      const scrollHeight = document.querySelector('.home').scrollHeight
      const offsetHeight = document.querySelector('.home').offsetHeight
      let scrollTop = 0

      // 监听滑动的状态
      document.querySelector('.content').addEventListener('touchmove', () => {
        this.scrollElmTouching = true
      })
      document.querySelector('.content').addEventListener('touchend', () => {
        // console.log('touch end')
        this.scrollElmTouching = false
        scrollTop = document.querySelector('.home').scrollTop
      })

      this.loop = setInterval(() => {
        if (this.scrollElmTouching) return false

        scrollTop += 2
        document.querySelector('.home').scrollTo(0, scrollTop)

        if (scrollTop >= scrollHeight - offsetHeight) {
          clearInterval(this.loop)
          console.log('loop end')
        }
      }, 1000 / 60)
    },

    skipBegin () {
      console.log('跳转到页面下方')
      clearInterval(this.loop)
      
      const scrollHeight = document.querySelector('.home').scrollHeight
      const offsetHeight = document.querySelector('.home').offsetHeight
      
      // 可以加一个动效，匀速滚动，ease
      document.querySelector('.home').scrollTo(0, scrollHeight - offsetHeight)

      // 隐藏跳过按钮
      this.showSkipBegin = false
    },

    setNickname (e) {
      const name = e.target.value

      if (typeof name === 'string' && name.length > 0) {
        window.nickname = name.replace(/^\s*/, '').replace(/\s*$/, '')
      }
    },

    checkNickname () {
      window.nickname = '你'

      // // 检查昵称是否合法
      // if (window.nickname === undefined || window.nickname === '') {
      //   alert('请输出昵称')
      //   return ''
      // }

      // axios.get('https://ai.china.com.cn/api/qn/token').then(res => {
      //   // console.log(res.data)
      //   if (!res.data || !res.data.bdtoken) {
      //     alert('服务器错误，请刷新页面重试！')
      //     return ''
      //   }
      //   const baiduToken = res.data.bdtoken

      //   axios({
      //     method: 'post',
      //     url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=' + baiduToken,
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     data: JSON.stringify({
      //       text: window.nickname
      //     })
      //   }).then(res => {
      //     console.log(res)

      //     // 不合法
      //     if (Math.random() >= 0.5) {
      //       document.querySelector('input').value = ''

      //       alert('不合法原因')
      //     } else {
      //      // this.nextPage()
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }).catch(error => {
      //   console.log(error)
      // })

      this.nextPage()
    },

    // 跳过输入昵称
    skipInput () {
      clearInterval(this.loop)
      this.nextPage()
    },
  },

  mounted () {
    console.log('home mouted')

    // 首页的部分元素根据页面高度自动适配
    const pageHeight = document.querySelector('.home').offsetHeight
    const remValue = document.querySelector('.home').offsetWidth / 20
    const balance = (30 + 750 - pageHeight) / remValue
    // console.log(balance)
    
    if (balance >= 0 ) {
      const totalHeight = this.titleBoxPaddingTop + this.titleBoxPaddingBottom + this.inputBoxPaddingBottom

      this.titleBoxPaddingTop = this.titleBoxPaddingTop - balance * this.titleBoxPaddingTop / totalHeight
      this.titleBoxPaddingBottom = this.titleBoxPaddingBottom - balance * this.titleBoxPaddingBottom / totalHeight
      this.inputBoxPaddingBottom = this.inputBoxPaddingBottom - balance * this.inputBoxPaddingBottom / totalHeight
    } else {
      this.titleBoxPaddingTop = this.titleBoxPaddingTop - balance
    }

    // 匀速自动播放
    setTimeout (() => {
      this.autoScroll()
    }, 1500)
  }
}
</script>

<style scoped lang="scss">
$contentHeight: calc(69rem + 100vh);
$themeColor: rgb(63, 106, 53);

.home {
  position: relative;
  overflow: auto;
  text-align: center;
  font-size: 0;

  .bg-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $contentHeight;
    overflow: hidden;

    .bg {
      width: 100%;
    }
  }

  .content {
    position: relative;
    z-index: 2;

    width: 100%;
    height: $contentHeight;

    .skipbegin {
      position: fixed;
      top: 0;
      right: 0;
      padding: 1rem;
    }

    .skip-img {
      width: 2.45rem;
      line-height: 1;
      text-decoration: underline;
      color: $themeColor;
    }

    .text-box {
      padding-top: 5.6rem;

      img {
        padding-bottom: 4rem;
      }
      .text1, .text3, .text5 {
        height: .9067rem;
      }
      .text2, .text4 {
        height: .96rem;
      }
    }

    .arrow-box {
      padding: 1.33rem 0 6.93rem;
      .arrow {
        width: 1.7067rem;
      }
    }

    .footprint-box {
      // border-bottom: solid 1px black;
      padding-bottom: 5.2rem;

      img {
        height: 1.6rem;
        opacity: 0;
        -webkit-transition: opacity .5s ease;
        transition: opacity .5s ease;
      }
      .footprint-left {
        padding-left: 1.6rem;
        padding-bottom: .16rem;
      }
      .footprint-right {
        padding-right: 1.6rem;
        padding-bottom: 1.49rem;
      }
    }

    .title-box {
      padding-top: 2.43rem;
      padding-bottom: 7.41rem;

      .title {
        // width: 16.8rem;
        height: 8.64rem;
      }
    }

    .input-box {
      padding-bottom: 7.73rem;
      
      .input-area {
        input {
          outline: none;
          border: 0;
          padding: .53rem 0;
          width: 12.32rem;
          height: .8rem;
          background-color: initial;
          text-align: center;
          line-height: 1;
          font-size: .8rem;
        }
        input::placeholder {
          color: $themeColor;
          opacity: 0.5;
          // font-size: 1.5em;
        }
      }

      .input-tip {
        img {
          padding-top: .69rem;
          width: 12.32rem;
        }
      }
    }

    .check-btn {
      padding-bottom: 1.81rem;

      img {
        width: 12.48rem;
      }
    }

    .skipinput {

    }
  }
}

</style>
