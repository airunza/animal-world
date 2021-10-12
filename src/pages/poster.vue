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
  ],
  wangtianshu: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 650, 151],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 130, 42],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 434, 233  ],
    ['title', 50, 945, 308, 23]
  ],
    yanyang: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 650, 110],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 90, 42],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 451, 233],
    ['title', 50, 945, 308, 23]
  ],
    yazhouxiang: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 650, 109],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 148, 48],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 457, 233],
    ['title', 50, 945, 308, 23]
  ],
    yinshan: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 651, 111],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 102, 48],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 451, 233],
    ['title', 50, 945, 308, 23]
  ],
    zhuhuan: [
    ['bg', 0, 0, 750, 1245],
    ['desc', 50, 1001, 650, 152],
    ['headset', 60, 181, 100, 25],
    ['logo', 303, 1159,143, 36],
    ['name', 50, 887, 90, 42],
    ['qrcode', 50, 50, 120, 120],
    ['slogan', 242, 48, 466, 233],
    ['title', 50, 945, 308, 23]
  ],
  
}

export default {
  data () {
    return {
      nickname: window.nickname || '你',

      resultThing: localStorage.getItem('resultThing') || 0,
      
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

    const canvas  = document.querySelector('#poster-maker')
    const ctx = canvas.getContext('2d')

  let j=0;
    const item0 = this.posterData[j]
    const key0 = item0[0]

    const img0 = document.createElement('img')
    img0.src = './poster/' + this.thingName + '/'  + key0 + '.png'
    img0.onload = () => {
      ctx.drawImage(img0, item0[1], item0[2], item0[3], item0[4]);

      let imgNums = this.posterData.length-1;
      for (let i = 1; i < this.posterData.length; i++) {
        const item = this.posterData[i]
        const key = item[0]

        const img = document.createElement('img')
        img.src = './poster/' + this.thingName + '/'  + key + '.png'
        console.log(img.src)

        img.onload = () => {
          console.log("onload",img.src);
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