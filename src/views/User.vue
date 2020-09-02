<template>
  <div class="user">
      <p class="tt"></p>
      <div class="title">
          <div class="avator">
              <!-- 路径必须拼成绝对路径 -->
              <img :src="base + user.head_img" alt="">
          </div>
          <div class="info">
              <div class="name">
                   <span v-if='user.gender===0' class="iconfont iconxingbienan"></span>
                   <span v-else class="iconfont iconxingbienv"></span>
                   <span>{{user.nickname}}</span>
              </div>
              <div class="time">
                  <!-- 加上一个过滤器，把时间只留年月日 -->
                  {{user.create_date | time}}
              </div>
          </div>
          <div class="arrow">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
      <div class="content">
          <!-- 父传子 user 传 news-nav -->
        <newsNav to='/follow'>
            <template>我的关注</template>
            <template #content>关注的用户</template>
        </newsNav>
        <newsNav to='/reply'>
            <template>我的跟帖</template>
            <template #content>跟帖/回复</template>
        </newsNav>
        <newsNav>
            <template>我的收藏</template>
            <template #content>文章/视频</template>
        </newsNav>
        <newsNav>
            <template>设置</template>
        </newsNav>
      </div>
      <van-button icon="plus" type="primary" block class="btn" @click="exit">退出</van-button>
  </div>
</template>

<script>
export default {
  // 计算属性 记录基地址
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
    }
  },
  // 发请求去拿个人信息
  async created() {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    // , {
    //   // token必须放到请求头中，请求头 Authorization
    //   headers: {
    //     Authorization: token
    //   }
    // }// 把token 放到请求拦截器中，这样不用写请求头了
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
    // 用响应拦截器 解决token验证失效的问题
    // else if (statusCode === 401) {
    //   this.$toast.fail('用户验证失败')
    //   this.$router.push('/login')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('userId')
    // }
  },
  methods: {
    async exit() {
      // 引入 Dialog 组件后，会自动在 Vue 的 prototype 上挂载 $dialog 方法，在所有组件内部都可以直接调用此方法
      // try {可能会报错的代码} catch(e){报错后的处理}
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定需要退出吗？'
        })
        // 执行到下面的代码说明点了确定按钮
        this.$toast.success('退出成功')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
      } catch (e) {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .user {
        .tt {
            height: 24px;
            background-color: #757575;
        }
        .title {
            // background-color: #f2f2f2;
            display: flex;
            align-content: center;
            padding: 30px 20px;
            border-bottom: 5px solid #e4e4e4;
            .avator {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 16px;
                img {
                    width: 100%;
                }
            }
            .info {
                flex: 1;
                margin-top: 14px;
                .name {
                    font-size: 14px;
                    .iconxingbienan {
                        color: #a1c9ec;
                        margin-right: 6px;
                    }
                }
                .time {
                    padding-top: 10px;
                    font-size: 14px;
                    color: #a0a0a0;
                }
            }
            .arrow {
                margin-top: 16px;
            }
        }
        .btn {
          margin-top: 8px;
        }
    }
</style>
