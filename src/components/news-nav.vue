<template>
  <div class="nav" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div >
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
    //   console.log(11)
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click')
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang='less' scoped>
  .nav {
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    margin-left: 22px;
    font-size: 14px;
    font-weight: normal;
    .content {
        flex: 1;
        text-align: right;
        color: #a0a0a0;
    }
    .arrow {
        margin:0 8px;
        color: #a0a0a0;
    }
  }
</style>
