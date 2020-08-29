<template>
  <div class="box">
    <div class="back" @click="backFn">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">登录</div>
    <div class="icn"></div>
  </div>
</template>

<script>
export default {
  methods: {
    backFn() {
      this.$router.go(-1)
      // console.log('我回退一下了哈')
    }
  }
}
</script>

<style lang='less'>
  .box {
    height: 50px;
    line-height: 50px;
    display: flex;
    text-align: center;
    .back,
    .icn {
      width: 50px;
      height: 50px;
    }
    .title {
      flex: 1;
      font-size: 18px;
      font-weight: 700;
    }
  }
</style>
