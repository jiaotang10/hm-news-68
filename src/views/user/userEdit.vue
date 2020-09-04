<template>
  <div class="edit">
    <newsHeader>编辑资料</newsHeader>
    <div class="avator">
      <img :src="base + user.head_img" alt="">
    </div>
    <newsNav @click="nicknameFn">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </newsNav>
     <newsNav @click="passwordFn">
      <template >密码</template>
      <template #content>******</template>
    </newsNav>
     <newsNav @click="genderFn">
      <template>性别</template>
      <template #content>{{user.gender === 1 ? '男':'女'}}</template>
    </newsNav>
    <!-- 渲染 dialog -->
    <van-dialog v-model="showNick" title="温馨提示" show-cancel-button @confirm='updateUser'>
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <van-dialog v-model="showPass" title="温馨提示" show-cancel-button @confirm='updatePassword'>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="showGender" title="温馨提示" show-cancel-button @confirm='updateGender'>
      <van-radio-group v-model="gender">
        <!-- name前面要加冒号 因为定义的gender是数字 -->
        <van-radio :name="0">女</van-radio>
        <van-radio :name="1">男</van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      showNick: false,
      nickname: '',
      showPass: false,
      password: '',
      showGender: false,
      gender: '0'
    }
  },
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    // 封装的修改用户每个信息的函数
    async updateUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      if (res.data.statusCode === 200) {
        // 重新渲染页面
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    nicknameFn() {
      this.showNick = true
      this.nickname = this.user.nickname
    },
    async updateNickname() {
      this.updateUser({
        nickname: this.nickname
      })
    },
    passwordFn() {
      this.showPass = true
      this.password = this.user.password
    },
    async updatePassword() {
      this.updateUser({
        password: this.password
      })
    },
    genderFn() {
      this.showGender = true
      this.gender = this.user.gender
    },
    async updateGender() {
      this.updateUser({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang='less' scoped>
.avator {
  margin: 30px 0;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
}
/deep/ .van-dialog__content {
  margin: 15px;
  .van-field {
    border: 1px solid #ccc;
  }
}
</style>
