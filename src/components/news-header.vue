<template>
   <div>
      <div class="box"></div>
      <div class="newsheader">
        <div class="back" @click="backFn">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="title"><slot></slot></div>
        <div class="icn"></div>
      </div>
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
  .newsheader {
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    text-align: center;
    border-bottom: 1px solid #ccc;
    z-index: 100;
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
  .box {
    // background-color: pink;
      width: 100%;
      height: 50px;
    }
</style>
