<template>
  <div class="box">
    <div class="top">
        <div class="arrow">
            <span class="iconfont iconjiantou2" @click="backFn"></span>
        </div>
        <div class="text">
            <span class="iconfont iconsearch"></span>
            <!-- 按回车和点搜索都可以进行显示 -->
            <input type="search" placeholder="请输入搜索内容" v-model="key" @keyup.enter="getArticle">
        </div>
        <div class="search" @click="getArticle">
            <p>搜索</p>
        </div>
    </div>
    <div v-if="!this.articleList.length">
        <div class="center">
        <h5>历史记录</h5>
        <div class="list">
            <!-- 把搜索的关键字存到localstorage里  -->
            <div v-for="item in history" :key="item" @click="goSearch(item)">{{item}}</div>
        </div>
    </div>
    <hr>
    <div class="bottom">
        <h5>热门搜索</h5>
        <div class="list">
            <div v-for="item in hotSearch" :key="item" @click="goSearch(item)">{{item}}</div>
        </div>
    </div>
    </div>
    <div class="content" v-else>
        <newsNewList v-for="item in articleList" :key="item.id" :post="item"></newsNewList>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // key 用来绑定input输入的值
      key: '',
      articleList: [],
      history: [],
      hotSearch: []
    }
  },
  created() {
    // 把搜索的关键字存到history数组里 再存到localstorage里
    // localStorage.setItem('history', JSON.stringify(this.history))

    // 如果没有历史纪录，保证是一个空数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
    this.hotSearch = ['情火', '茄子', '求职', '123']
  },
  methods: {
    async getArticle() {
      // 点击的时候，判断是否为空，如果不为空发送ajax获取搜索的结果
      if (!this.key) {
        return this.$toast.fail('请输入搜索的关键字')
      }
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.articleList = data
      }

      // 把每次的key存储到history数组中
      // 若之前的历史记录里有该值，将其删除
      // 再将key追加到history数组的前面
      // 再把history数组存到localstorage里
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    backFn() {
      if (this.key === '') {
        this.$router.back()
      } else {
        this.key = ''
      }
    },
    // 实现 点击历史记录的里值就可以在输入框里显示并且有按了搜索按钮的功能
    goSearch(item) {
      this.key = item
      this.getArticle()
    }
  },
  // 监听key属性，如果key为空，那把articleList数组清空，因为这个数据清空，就不会显示文章列表
  watch: {
    key(value) {
      if (value === '') {
        this.articleList = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.box {
    padding: 10px 20px;
}
.top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    // background-color: pink;
    .text {
        position: relative;
        height: 38px;
        line-height: 38px;
        bottom: -3px;
        .iconsearch {
            position: absolute;
            top: 4px;
            left: 10px;
            font-size: 18px;
            color: #ccc;
        }
        input {
            padding-left: 30px;
            border: 1px solid #ccc;
            width: 246px;
            height: 36px;
            border-radius: 13px;
            font-size: 14px;
            color: #333;
        }
    }

    .search {
        p {
            font-size: 16px;
            font-weight: normal;
            color: #202020;
        }
    }
}
h5 {
        margin: 10px 0;
        color: #333333;
        font-size: 18px;
    }
.list {
    display: flex;
    margin-bottom: 10px;
    color: #434343;
    font-size: 14px;
    div {
        padding-right: 20px;
    }
    }
</style>
