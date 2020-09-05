<template>
  <div class="article">
    <div class="header">
        <div class="left" @click="$router.back()">
            <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="center">
            <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
            <div class="followed" v-if="list.has_follow" @click="unfollowFn">已关注</div>
            <div class="follow" v-else @click="followFn">关注</div>
        </div>
    </div>
    <div class="center">
        <div class="title"><h5>{{list.title}}</h5></div>
        <div class="user">
            <span class="name" v-if="list.user">{{list.user.nickname}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="time">{{list.create_date | time}}</span>
        </div>
    </div>
    <hr>
    <div v-if="list.type === 1" class="userInfo" v-html="list.content"></div>
    <!-- 视频的地址有两种格式，一种是直接地址，一种是含有标签的 -->
    <video v-else :src="getUrl(list.content)" controls muted autoplay></video>
    <div class="bottom">
        <div class="like" @click="likeFn">
            <span class="iconfont icondianzan"></span>
            <span>{{list.like_length}}</span>
        </div>
        <div class="share">
            <span class="iconfont iconweixin"></span>
            <span>微信</span>
        </div>
    </div>
  </div>
</template>

<script>
// 文章type为1的文章详情是图片，其他的是有视频的
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      //   console.log(div.innerHTML)
      return div.innerText
    },
    async getArticle() {
    //   console.log(this.$route.params)
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // console.log(this.list)
      }
    },
    followFn() {
      const token = localStorage.getItem('token')
      if (token) {
        this.getFollowList()
      } else {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      }
    },
    async unfollowFn() {
      const res = await this.$axios.get(`/user_unfollow/${this.list.user.id}`)
      // console.log('res', res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getArticle()
      }
    },
    async getFollowList() {
      const res = await this.$axios.get(`/user_follows/${this.list.user.id}`)
      //   console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getArticle()
      }
    },
    noLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        return false
      } else {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      }
    },
    async likeFn() {
      if (this.noLogin()) {
        return 0
      }
      const res = await this.$axios.get(`/post_like/${this.list.id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getArticle()
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .header {
        display: flex;
        height: 54px;
        align-items: center;
        // line-height: 54px;
        margin: 10px;
        .left {
            margin: 0 10px;
            span {
            line-height: 50px;
            }
        }
        .center {
            flex: 1;
            .iconnew {
                font-size: 50px;
                top: 25px;
            }
        }
        .right {
            font-size: 14px;
            div {
                width: 60px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 15px;
            }
            .followed {
            border: 1px solid #ccc;

            }
            .follow {
            color: #fff;
            background-color: #f00;
            }
        }
    }
    .center {
         margin: 0 20px;
         .user {
             font-size: 14px;
             color: #8a8a8a;
         }
    }
     .userInfo {
        font-size: 14px;
         /deep/img {
             width: 100%;
         }
     }
     video {
         width: 100%;
     }
     .bottom {
         display: flex;
         justify-content: space-around;
         margin: 30px 10px 10px 10px;
         .like,
         .share {
             font-size: 14px;
             width: 80px;
             height: 30px;
             line-height: 30px;
             text-align: center;
            //  background-color: pink;
            border: 1px solid #999;
            border-radius: 15px;
         }
         .iconweixin {
             color: #5bc43a;
         }
         .iconfont {
             padding-right: 5px;
         }
     }
</style>
