<template>
  <div class="index">
      <div class="title">
          <span class="iconfont iconnew"></span>
          <div class="search">
              <span class="iconfont iconsearch"></span>
              <span>搜索新闻</span>
          </div>
          <span class="iconfont iconwode" @click="$router.push('/user')"></span>
      </div>
      <div class="tab">
        <van-sticky>
          <div class="box" @click="$router.push('/manage')">
            <span class="iconfont iconjiantou1"></span>
          </div>
          </van-sticky>
          <van-tabs v-model="active" animated swipeable sticky>
             <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
               <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                    >
                    <!-- 加一个immediate-check 防止页面一进入就加载 -->
                    <newsNewList :post="item" v-for="item in newsList" :key="item.id"></newsNewList>
                    </van-list>
               </van-pull-refresh>
             </van-tab>
          </van-tabs>
      </div>
  </div>
</template>

<script>
export default {
  // 组件取名，递归的时候通过name可以渲染自己，缓存的时候通过name可以进行缓存
  name: 'index',
  data() {
    return {
      active: 0,
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTabList()
  },
  // 缓存组件激活的时候触发
  activated() {

  },
  // 缓存组件不激活的时候触发
  deactivated() {

  },
  watch: {
    active(value) {
    //   console.log(value)
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getNewList(this.tabList[value].id)
    }
  },
  methods: {
    async getTabList() {
      const delList = JSON.parse(localStorage.getItem('delList'))
      if (delList) {
        this.tabList = delList
        this.getNewList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      //   console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        this.getNewList(this.tabList[0].id)
      }
    },
    async getNewList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      // console.log(this.tabList)
      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        // console.log(this.newsList)s
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      console.log('下拉刷新了')
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.title {
    display: flex;
    height: 50px;
    line-height: 50px;
    width: 100%;
    color: #fff;
    background-color: #eb3323;
    .iconnew {
        margin: 0 20px;
        font-size: 45px;
    }
    .search {
        flex: 1;
        height: 34px;
        line-height: 34px;
        // background-color: pink;
        text-align: center;
        margin-top: 8px;
        font-size: 16px;
        border-radius: 17px;
        background-color: rgba(255, 255, 255, .5);
    }
    .iconwode {
        margin: 0 20px;
        font-size: 25px;
    }
}
/deep/.van-tabs__wrap {
  width: 88.5%;
}
.box {
  position: absolute;
  right: 0;
  // top: 1;
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  transform: rotate(90deg);
  z-index: 999;
  background-color: #fff;
  .iconjiantou1 {
    font-size: 26px;
  }
}
</style>
