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
    <video v-else :src="getUrl(list.content)" controls muted></video>
    <div class="likeShare">
        <div class="like" @click="likeFn">
            <span class="iconfont icondianzan"></span>
            <span>{{list.like_length}}</span>
        </div>
        <div class="share">
            <span class="iconfont iconweixin"></span>
            <span>微信</span>
        </div>
    </div>
    <hr>
    <div class="reply">
        <div class="aa">
          <h3>精彩跟帖</h3>
        </div>
        <!-- <newsComment :comment="item" v-for="item in commentList" :key="item.id" @reply='replyFn'></newsComment> -->
        <newsComment :comment="item" v-for="item in commentList" :key="item.id"></newsComment>
    </div>
    <div class="footer">
        <div class="text-box" v-if="isShow">
          <div class="text" @click="onFocus">
            <input type="text" placeholder="写跟帖">
          </div>
          <span class="iconfont iconpinglun-"><i>{{this.commentLength}}</i></span>
          <span class="iconfont iconshoucang"  @click="getStar"></span>
          <span class="iconfont iconfenxiang"></span>
        </div>
        <div class="textArea" v-else>
          <!-- 把content 双向绑定才能显示 -->
          <textarea cols="30" rows="10" :placeholder="'回复：@'+this.nickname" ref='textarea' v-model="content" @blur="onBlur"></textarea>
          <van-button class="btn" round type="danger" size="mini" @click="sendFn">发送</van-button>
        </div>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
// 文章type为1的文章详情是图片，其他的是有视频的
export default {
  data() {
    return {
      list: [],
      commentList: [],
      isShow: true,
      content: '',
      nickname: '',
      replyId: '',
      commentLength: '',
      hasStar: ''
    }
  },
  created() {
    this.getArticle()
    this.getComment()
    // 给bus注册事件，因为本组件需要接收数据
    this.$bus.$on('busFn', (id, nickname) => {
      console.log(nickname, id)
      this.isShow = false
      this.onFocus()
      this.nickname = nickname
      this.replyId = id
    })
  },
  destroyed() {
    // 移除bus上所有的busFn事件
    this.$bus.$off('busFn')
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
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.commentLength = data.comment_length
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
      //   console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getArticle()
      }
    },
    async getComment() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      //   console.log(res)
      //   console.log(id)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        // console.log(this.commentList)
      }
    },
    async onFocus() {
      this.isShow = false
      // 等待DOM更新
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async onBlur() {
      if (!this.list.content) {
        this.isShow = true
        this.nickname = ''
        this.replyId = ''
      }
    },
    async sendFn() {
      const res = await this.$axios.post(`/post_comment/${this.list.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getComment()
        this.content = ''
        this.nickname = ''
        this.replyId = ''
        this.isShow = true
      }
    },
    async getStar() {
      const res = await this.$axios.get(`/post_star/${this.list.id}`)
      console.log(res)
      // const { like } = res.data.has_like
      // console.log(like)
      if (this.noLogin()) return
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getArticle()
        this.hasStar = this.data.has_like
      }
    }
    // replyFn(id, nickname) {
    //   console.log(id, nickname)
    //   this.isShow = false
    //   this.nickname = nickname
    //   this.replyId = id
    //   this.onFocus()
    // }
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
     .likeShare {
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
     .footer {
       background-color: #fff;
         width: 100%;
         height: 100px;
         display: flex;
         position: fixed;
         bottom: 0;
        //  border-top: 1px solid #000;
         justify-content: space-around;
         align-items: center;
         padding: 0 5px;
         .text-box {
           width: 100%;
           display: flex;
           justify-content: space-around;
            .text {
                //  background-color: pink;
                width: 180px;
                text-align: center;
                //  font-size: 14px;
                input {
                    height: 30px;
                    border-radius: 15px;
                    font-size: 16px;
                    background-color: #ddd;
                    border: none;
                    padding-left: 20px;
                }
            }
         }
         .iconfont {
             font-size: 24px;
         }
         .iconpinglun- {
             position: relative;
             i {
             font-size: 10px;
             background-color: red;
             border-radius: 8px;
             position: absolute;
             top: -4px;
             right: -6px;
             padding: 0 6px;
             }
         }
         .textArea{
           width: 100%;
           align-items: flex-end;
           justify-content: space-around;
           display: flex;
           position: fixed;
           bottom: 0;
           z-index: 99;
           margin-bottom: 10px;
            textarea {
              width: 260px;
              height: 90px;
              border-radius: 10px;
              //  bottom: 0;
              background-color: #d7d7d7;
              border: none;
              padding: 15px;
              font-size: 16px;
              color: #6b6b6b;
            }
            .btn {
              padding: 10px 16px;
            }
         }
     }
     .box {
        z-index: 999;
       height: 100px;
       width: 100%;
       background-color: #fff;
     }
     .reply {
      //  margin: 0 3px;
        // border-bottom: 3px solid #000;
        .aa {
          text-align: center;
        }
     }
</style>
