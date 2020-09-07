<template>
  <div class="reply">
        <div class="relyUser">
            <div class="avator">
                <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="">
            </div>
            <div class="info">
                <p class="name">{{comment.user.nickname}}</p>
                <p class="time">{{comment.create_date | now}}</p>
            </div>
            <div class="userReply">
                <span @click="onReply">回复</span>
            </div>
        </div>
        <!-- 递归组件的定义 就是在一个组件的模版中渲染这个组件本身，但必须通过name属性来完成，name取什么名 调用组件的名字就是什么名 -->
        <div class="userComment">
            <!-- <div>我是递归评论组件</div> -->
            <newsDigui v-if="comment.parent" :aa='comment.parent' :count='data'></newsDigui>
            <div class="cc">{{comment.content}}</div>
        </div>
    </div>
</template>

<script>
export default {
  // 一定要写name属性
  name: 'digui',
  props: {
    comment: Object
  },
  data() {
    return {
      data: this.floorNum(0, this.comment)
    }
  },
  methods: {
    floorNum(num, data) {
      if (data.parent) {
        return this.floorNum(num + 1, data.parent)
      } else {
        return num
      }
    },
    // 需要把回复的用户名和评论的id 发送给父组件
    onReply() {
      this.$bus.$emit('busFn', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
 .reply {
         margin: 10px 10px;
         h3 {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        }
        .relyUser {
            display: flex;
            .avator{
                margin-right: 10px;
                img {
                border-radius: 50%;
                width: 34px;
                height: 34px;
                }
            }
            .info {
                flex: 1;
                .name {
                    font-size: 16px;
                    color: #202020;
                }
                .time {
                    font-size: 12px;
                    color: #666;
                }
            }
            .userReply {
                margin-right: 10px;
                font-size: 14px;
            }
        }
        .cc {
                font-size: 16px;
                font-weight: 700;
            }
     }
</style>
