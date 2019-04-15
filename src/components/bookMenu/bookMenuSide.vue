<template>
  <div class="alphabet">
    <ul>
      <li class="item"
          v-for="item in letters"
          :key="item"
          :ref="item"
          @click="handleLetterClick"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
  import bus from 'common/Bus'
  export default {
    name: 'bookMenuSide',
    props: {
      bookMenu: Object
    },
    data() {
      return {
        touchStatus: false
      }
    },
    computed: {
      letters() {
        var letters = []
        for(let key in this.bookMenu) {
          letters.push(key)
        }
        return letters
      }
    },
    updated() {
      this.startY = this.$refs['A'][0].offsetTop
    },
    methods: {
      handleLetterClick(e) {
        bus.$emit('change',e.target.innerText)
      },
      handleTouchStart() {
        this.touchStatus = true
      },
      handleTouchMove(e) {
        if(this.touchStatus) {
          //函数节流
          if(this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            const startY = this.$refs['A'][0].offsetTop
            const touchY = e.touches[0].clientY - 40
            const index = Math.floor((touchY - this.startY)/20)
            if(index >= 0 && index < this.letters.length) {
              bus.$emit('change', this.letters[index])
            }
          }, 16);
        }
      },
      handleTouchEnd() {
        this.touchStatus = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .alphabet
    display flex
    justify-content center
    align-items center
    position absolute
    top 120px
    width 20px
    right 16px
    bottom 0
    .item
      text-align center
      lh(46)
      ft(30)
      c-6()
</style>


