<template>
  <div id="app">
    <!-- 配置 -->
    <!-- keep-alive 被keep-alive包裹的组件都会被缓存下来，不会销毁 -->
    <keep-alive include="index">
    <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
</style>
