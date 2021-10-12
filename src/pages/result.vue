<template>
  <div class="page result">
    <div class="thing" :class="activeThing.name">
      <div class="thing-name"></div>

      <div class="shadow"></div>
    </div>

    <div class="boxing-box">
      <div class="boxing">
        <div v-for="(item, index) in boxing" :key="index" :style="{height: item.height + 'px', opacity: item.opacity + ''}"></div>
      </div>
      <div class="boxing-info">
        <img class="boxing-left" src="../assets/result/boxing-left.png" alt="" />
        <span>{{activeThing.boxingText}}</span>
        <img class="boxing-right" src="../assets/result/boxing-right.png" alt="" />
      </div>
    </div>

    <div v-show="!playState" class="play-btn" @click="playerHandle">
      <div class="play-btn1"></div>
      <div class="play-btn2"></div>
      <div class="play-btn3"></div>
    </div>
    <div v-show="playState" class="play-btn" @click="playerHandle">
      <img v-show="playState" src="../assets/result/pause.png" alt="暂停按钮" />
    </div>

    <div class="btn-box">
      <div class="choose" @click="choose">
        <img src="../assets/result/choose.png" alt="守护它" />
      </div>
      <div class="change" @click="change">
        <img src="../assets/result/change.png" alt="再看看" />
      </div>
    </div>
  </div>
</template>

<script>
// import {double, treble} from '../lib.js'

export default {
  data () {
    return {
      // 随机的动物数字，0 - 5
      resultThing: localStorage.getItem('resultThing') || 0,

      resultData: [{
        name: 'jiangtun',
        title: '长江江豚',
        desc: '极危、国家一级重点保护野生动物',
        boxingText: '听，这是长江江豚呼吸的声音',
      }, {
        name: 'wangtianshu',
        boxingText: '听，这是西双版纳热带雨林的声音',
      }, {
        name: 'yanyang',
        boxingText: '听，这是岩羊在贺兰山悬崖上攀登的声音',
      }, {
        name: 'yazhouxiang',
        boxingText: '听，这是亚洲象在雨林里呐喊的声音',
      }, {
        name: 'yinshan',
        boxingText: '听，这是风吹动树叶的声音',
      }, {
        name: 'zhuhuan',
        boxingText: '听，这是朱鹮在鸣叫',
      }],

      boxing: [],
      boxingLoop: null,

      audioPlayer: null,
      playState: false,
      
    }
  },

  computed: {
    activeThing () {
      return this.resultData[this.resultThing]
    },
  },

  methods: {
    nextPage (e) {
      this.$emit('route', e, 'poster')
    },

    setBoxing () {
      this.boxing = []

      for (let i = 0; i < 50; i ++) {
        this.boxing.push({
          opacity: (24.5 - Math.abs(i - 24.5)) / 12,
          height: Math.random() * 20 + 10
        })
      }
    },

    initPlayer () {
      this.audioPlayer = new Audio()
      this.audioPlayer.src = './sounds/' + this.activeThing.name + '.mp3'
    },

    playerHandle () {
      // console.log(this.audioPlayer === null, this.audioPlayer?.paused === true)
      if (this.audioPlayer === null || this.audioPlayer.paused === true) {
        this.play()
      } else {
        this.pause()
      }
    },

    play () {
      this.boxingLoop = setInterval(() => {
        this.setBoxing()
      }, 200)

      this.audioPlayer.play()

      this.audioPlayer.addEventListener('ended', this.pause)

      this.playState = true
    },

    pause () {
      clearInterval(this.boxingLoop)

      this.audioPlayer.pause()

      this.audioPlayer.removeEventListener('ended', this.pause)

      this.playState = false
    },

    choose () {
      localStorage.setItem('resultThing',this.resultThing);
      this.nextPage()
    },

    change () {
      this.pause()

      this.resultThing ++
      if (this.resultThing >= 6) {
        this.resultThing = 0
      }

      // 更换音频
      this.audioPlayer.src = './sounds/' + this.activeThing.name + '.mp3'
    }
  },

  mounted () {
    console.log('input mouted')

    this.setBoxing()

    this.initPlayer()
  }
}
</script>

<style scoped lang="scss">
$themeColor: rgb(63, 106, 53);

.result {
  // background-color: $themeColor;
  overflow: hidden;

  .thing {
    display: flex;
    flex-direction: row;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .thing-name {
      position: absolute;
      top: .69rem;
      left: 2.13rem;

      width: 4.37rem;
      height: 15.2rem;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: 50% top;
    }

    .shadow {
      position: absolute;
      left: 0;
      bottom: 0;

      width: 20rem;
      height: 25.22rem;
      background-image: url(../assets/result/shadow.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .jiangtun {
    background-image: url(../assets/result/jiangtun.png);

    .thing-name {
      background-image: url(../assets/result/jiangtun-name.png);
    }
  }
  .wangtianshu {
    background-image: url(../assets/result/wangtianshu.png);
    .thing-name {
      background-image: url(../assets/result/wangtianshu-name.png);
    }
  }
  .yanyang {
    background-image: url(../assets/result/yanyang.png);
    .thing-name {
      background-image: url(../assets/result/yanyang-name.png);
    }
  }
  .yazhouxiang {
    background-image: url(../assets/result/yazhouxiang.png);
    .thing-name {
      background-image: url(../assets/result/yazhouxiang-name.png);
    }
  }
  .yinshan {
    background-image: url(../assets/result/yinshan.png);
    .thing-name {
      background-image: url(../assets/result/yinshan-name.png);
    }
  }
  .zhuhuan {
    background-image: url(../assets/result/zhuhuan.png);
    .thing-name {
      background-image: url(../assets/result/zhuhuan-name.png);
    }
  }

  .boxing-box {
    position: absolute;
    top: 22.3rem;
    left: 1.8rem;

    width: 16.4rem;
    height: 2.78rem;

    .boxing {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;

      height: 100%;
      
      div {
        display: inline-block;
        margin: 0 2px;
        border-radius: 2px 2px 0 0;
        width: 2px;
        background-color: #ffffff;
        transition: height .3s ease;
      }
    }

    .boxing-info {
      padding-top: .85rem;
      display: flex;
      justify-content: center;
      align-items: center;

      height: .7rem;
      font-size: 0;

      img {
        padding: 0 .2rem .08rem;
        height: .64rem
      }
      span {
        display: inline-block;
        height: .693rem;
        line-height: 1;
        font-size: .693rem;
        color: #ffffff;
      }
    }
  }

  .play-btn {
    position: absolute;
    left: 9.2rem;
    bottom: calc(10% + 2rem);

    margin: 2.13rem auto 2.19rem;
    
    width: 1.6rem;
    height: 1.6rem;

    img {
      height: 1.6rem;
    }

    & > div {
      position: absolute;
      top: 0;
      left: 0;

      border-radius: .43rem;
      width: .43rem;
      height: 1.6rem;
      overflow: hidden;

      width: .43rem;
      height: 1.6rem;
      
      // background: -webkit-linear-gradient(180deg, #FFE2A4 20%, #FFFFFF 100%);
      // background: linear-gradient(180deg, #FFE2A4 20%, #FFFFFF 100%);
      background: -webkit-linear-gradient(180deg, #FFE2A4 10%, #FFFFFF 50%, #FFE2A4 100%);
      background: linear-gradient(180deg, #FFE2A4 10%, #FFFFFF 50%, #FFE2A4 100%);
      // background: linear-gradient(180deg, #ff7e00, #ffffff, #5cff00);
      background-size: 200% 200%;

      animation: lightmove 2s linear infinite both;
      -webkit-animation: lightmove 2s linear infinite both;
    }
    .play-btn1 {
      z-index: 3;
      transform-origin: 50% 13.4%;
      transform: rotate(-60deg);
      -webkit-transform-origin: 50% 13.4%;
      -webkit-transform: rotate(-60deg);
    }
    .play-btn2 {
      z-index: 2;
      transform-origin: 50% 86.6%;
      transform: rotate(60deg);
      -webkit-transform-origin: 50% 86.6%;
      -webkit-transform: rotate(60deg);
      opacity: 0.9;
    }
    .play-btn3 {
      z-index: 1;
      transform-origin: 50% 50%;
      transform: rotate(180deg);
      -webkit-transform-origin: 50% 50%;
      -webkit-transform: rotate(180deg);
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-between;

    position: absolute;
    left: .75rem;
    bottom: 3.73rem;
    bottom: 10%;

    width: 18.5rem;
    font-size: 0;

    img {
      width: 8.96rem;
    }
  }
}

@-webkit-keyframes lightmove {
  0%{background-position: 10% 0%}
  50%{background-position: 91% 100%}
  100%{background-position: 10% 0%}
}
@keyframes lightmove {
  0%{background-position: 10% 0%}
  50%{background-position: 91% 100%}
  100%{background-position: 10% 0%}
}
</style>