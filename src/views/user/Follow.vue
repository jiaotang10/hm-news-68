<template>
  <div class="follow">
      <newsHeader>我的关注</newsHeader>
      <div class="myfollow">
          <div class="list" v-for="item in this.followList" :key='item.id'>
            <div class="left">
                <img :src="base + item.head_img" alt="">
            </div>
            <div class="content">
                <p class="name">{{item.nickname}}</p>
                <p class="time">{{item.create_date | time}}</p>
            </div>
            <div class="right">
                <van-button round type="info" class="btn" @click="cancelFn(item.id)">取消关注</van-button>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      followList: []
    }
  },
  created() {
    this.getFollow()
  },
  methods: {
    async getFollow() {
      const res = await this.$axios.get('/user_follows')
      // console.log(res.data)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
    },
    async cancelFn(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认要取消关注吗？'
        })
      } catch (error) {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getFollow()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list {
    display: flex;
    height: 80px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    align-items: center;
    .left {
        margin: 20px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .content {
        flex: 1;
        text-align: left;
        font-size: 16px;
        .time {
            color: #707070;
        }
    }
    .right {
        margin: 20px;
        .btn {
            border-color: #ccc;
            background-color: #ccc;
        }
    }
}
</style>
