<template>
  <div class="newList" @click="$router.push(`/article/${post.id}`)">
      <!-- 判断文章的type，如果是1，代表是图片文章，如果是2，代表视频文章，  如果是图片文章，判断封面的数量，如果小于3，显示单张图结构，否则显示多张图结构 -->
        <div class="video" v-if="post.type === 2">
            <div class="title">
                <p>{{post.title}}</p>
            </div>
            <div class="videoImg">
                <img :src="post.cover[0].url.startsWith('http') ? post.cover[0].url : url + post.cover[0].url" alt="">
                <span class="iconfont iconshipin"></span>
            </div>
            <div class="user">
                    <span>{{post.user.nickname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{post.comment_length}}跟帖</span>
            </div>
        </div>
        <div class="single" v-else-if="post.cover.length < 3">
            <div class="left">
                <p>{{post.title}}</p>
                <div class="user">
                    <span>{{post.user.nickname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{post.comment_length}}跟帖</span>
                </div>
            </div>
            <div class="right">
                <img :src="post.cover[0].url.startsWith('http') ? post.cover[0].url : url + post.cover[0].url" alt="">
            </div>
        </div>
        <div class="multiple" v-else>
            <p>{{post.title}}</p>
            <div class="imges">
                <img :src="post.cover[0].url.startsWith('http') ? post.cover[0].url : url + post.cover[0].url" alt="">
                <img :src="post.cover[0].url.startsWith('http') ? post.cover[1].url : url + post.cover[1].url" alt="">
                <img :src="post.cover[0].url.startsWith('http') ? post.cover[2].url : url + post.cover[2].url" alt="">
            </div>
            <div class="user">
                    <span>{{post.user.nickname}}</span>
                    <span>{{post.comment_length}}跟帖</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  data() {
    return {
      url: this.$axios.defaults.baseURL
    }
  }
}
</script>

<style lang='less' scoped>
.user {
          font-size: 12px;
          color: #999;
          margin-top: 6px;
      }
p {
          font-size: 16px;
          padding: 5px;
      }
.single {
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  .left {
      flex: 1;
    //   display: flex;
    //   justify-content: space-between;
      .user {
          font-size: 12px;
          color: #999;
          margin-top: 6px;
      }
  }
  .right {
      img {
          width: 122px;
          height: 76px;
          object-fit: cover;
      }
  }
}
.multiple {
    // display: flex;
    padding: 12px;
    border-bottom: 1px solid #ccc;
    // display: flex;
    .imges {
        // display: flex;
        // justify-content: space-between;
        img {
            width: 112px;
            height: 74px;
            padding: 2px;
            object-fit: cover;
        }
    }
}
.video {
    padding: 12px;
    border-bottom: 1px solid #ccc;
    .videoImg{
        padding: 10px 0;
        position: relative;
        img {
            width: 100%;
            height: 170px;
            object-fit: cover;
        }
        span {
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            // background-color: red;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: #ffffff;
            font-size: 40px;
        }
    }
}
</style>
