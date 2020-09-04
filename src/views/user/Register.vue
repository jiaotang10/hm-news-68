<template>
  <div >
    <newsHeader>注册</newsHeader>
    <newsLogo></newsLogo>
    <van-form @submit="register">
      <van-field
        v-model="userInfo.username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rule.user"
      />
      <van-field
        v-model="userInfo.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rule.nick"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rule.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="tips">已有账号？去<router-link to='/login'>登录</router-link></p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        nickname: '',
        password: ''
      },
      rule: {
        user: [
          { required: true, message: '请填写用户名' },
          { pattern: /^\d{5,10}$/, message: '用户名请输入5-10位数字', trigger: 'onChange' }
        ],
        nick: [
          { required: true, message: '请填写昵称' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称请输入2-6位中文', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码' },
          { pattern: /^\d{3,6}$/, message: '密码请输入3-6位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register() {
      // console.log('成功')
      // 基准地址 ‘http://locallhost:3000'已经添加到默认了
      const res = await this.$axios.post('/register', this.userInfo)
      //   username: this.username,
      //   nickname: this.nickname,
      //   password: this.password
      // })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // this.$router.push('/login')
        // 将填写的信息传递给login页面,跳转路由,通过params，命名路由通过index.js里规则里定义的name属性
        this.$router.push({
          name: 'login',
          params: this.userInfo
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .tips {
  float: right;
  font-size: 12px;
  padding-right: 8px;

    a {
      color: orange;
      font-weight: 700;
    }
  }
</style>
