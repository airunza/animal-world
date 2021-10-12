<template>
  <div class="page poster">
    <!-- 结果页 -->

    <div class="box">
      <canvas id="poster-maker" width="750" height="1245"></canvas>

      <img id="poster" src="" alt="海报" />

      <img class="download-tip" src="" alt="">
    </div>
  </div>
</template>

<script>
const posterData = {
  jiangtun: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 650, 109],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 193, 47],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 460, 232],
    ['title', 50, 945, 308, 23]
  ]
}

export default {
  data () {
    return {
      nickname: window.nickname || '你',

      resultThing: window.resultThing || 0,
      
      // poster图片的base64地址
      poster: ''
    }
  },

  computed: {
    thingName () {
      return ['jiangtun', 'wangtianshu', 'yanyang', 'yazhouxiang', 'yinshan', 'zhuhuan'][this.resultThing]
    },

    posterData () {
      return posterData[this.thingName]
    }
  },

  methods: {
    nextPage (e) {
      this.$emit('route', e, 'home')
    },

  },

  mounted () {
    console.log('result mouted, nickname: ', this.nickname, 'resultThing: ', this.resultThing)

    const canvas  = document.querySelector('#poster-maker')
    const ctx = canvas.getContext('2d')

    let imgNums = this.posterData.length
    for (let i = 0; i < this.posterData.length; i++) {
      const item = this.posterData[i]
      const key = item[0]

      const img = document.createElement('img')
      img.src = './poster/' + this.thingName + '/'  + key + '.png'
      // console.log(img.src)

      img.onload = () => {
        ctx.drawImage(img, item[1], item[2], item[3], item[4])

        imgNums --
        if (imgNums <= 0) {
          // 图片加载完了
          ctx.fillStyle = '#000000'
          ctx.font = '28px 微软雅黑'
          ctx.textBaseline = 'top'
          ctx.fillText(this.nickname + '守护的是', 50 + 2, 837 + 2)

          ctx.fillStyle = '#ffffff'
          ctx.font = '28px 微软雅黑'
          ctx.textBaseline = 'top'

          ctx.fillText(this.nickname + '守护的是', 50, 837)

          this.poster = canvas.toDataURL('image/jpeg', 0.9)
          console.log(this.poster.length)

          document.querySelector('#poster').src = this.poster
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.poster {
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/home/bg.png);
  background-size: 100% auto;
  background-position: 50% 0;

  .box {
    position: relative;
    // height: 100%;

    #poster-maker {
      width: 18rem;
      height: 29.88rem;
      box-shadow: rgba(0,0,0,0.3) .32rem .32rem;
    }

    #poster {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;

      width: 18rem;
      height: 29.88rem;
      opacity: 0;
    }

    .download-tip {
      position: absolute;

      opacity: 0;
    }
  }
}


</style>