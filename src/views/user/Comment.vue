<template>
  <div class="comment">
      <newsHeader>我的跟帖</newsHeader>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
        >
        <!-- List 初始化后会触发一次 load 事件，用于加载第一屏的数据，这个特性可以通过immediate-check属性关闭 -->
            <div class="list" v-for="item in this.commentList" :key="item.id">
                <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
                <div class="comment_enter" v-if="item.parent">
                    <div class="username">回复：{{item.parent.user.nickname}}</div>
                    <div class="comment_content">{{item.parent.content}}</div>
                </div>
                <div class="rely">{{item.content}}</div>
                <div class="origin">
                    <span class="article">{{item.post.title}}</span>
                    <span class="iconfont iconjiantou1"></span>
                </div>
            </div>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      // 代表加载状态，若为true就代表还在加载数据，onload不会触发
      // 滚动到底部的时候，触发onload时，会自动把loading改为true，所以数据加载完后，要把loading改为false
      loading: false,
      // finished为true 就会代表没有数据可以加载了
      finished: false,
      // 代表是否在下拉刷新，往下拉就会自动改为true
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList.push(...data)
        // 要把一个数组b的元素全部插入到数组a的后面
        // const a = [1,2,3];
        // a.push(...b);
        //     // 加载状态结束
        this.loading = false
        // console.log(data)
        if (data.length < this.pageSize) {
          // 数据全部加载完成
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onLoad() {
      // 本方法会在快滚动底部就会触发
      // 异步更新数据
      this.pageIndex++
      this.getCommentList()
    },
    onRefresh() {
    //   console.log('正在下拉刷新')
      setTimeout(() => {
        // 下拉刷新需要清除之前的数据
        this.commentList = []
        // 清除之后需要加载第一页的数据
        this.pageIndex = 1
        // 请求数据
        // 防止下拉刷新前  已经全部加载完了，没有数据了
        this.finished = false
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.list {
    border-bottom: 1px solid #ccc;
    padding:0 20px;
    .time {
        font-size: 16px;
        color: #a0a0a0;
        padding: 10px 0;
    }
    .comment_enter {
        background-color: #e4e4e4;
        padding: 10px 10px;
        .username {
            font-size: 14px;
            color: #979797;
        }
        .comment_content {
            font-size: 16px;
            color: #949494;
        }
    }
    .rely {
        font-size: 16px;
        padding: 10px 0;
    }
    .origin {
        padding-bottom: 10px;
        font-size: 16px;
        color: #a0a0a0;
        display: flex;
        justify-content: space-between;
        .article{
          font-size: 14px;
        }
    }
}
</style>
