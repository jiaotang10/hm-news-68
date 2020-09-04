<template>
  <div >
    <newsHeader>登录</newsHeader>
    <newsLogo></newsLogo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rule.user"
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
    <p class="tips">没有账号？去<router-link to='/register'>注册</router-link></p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  // 通过钩子函数 created 接收参数
  created() {
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.userInfo.username = username
    this.userInfo.password = password
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      // username: '',
      // password: '',
      rule: {
        // 将校验用户名和密码的规则放到data里，然后让rules调用
        user: [
          { required: true, message: '请填写用户名' },
          { pattern: /^\d{5,10}$/, message: '用户名请输入5-10位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码' },
          { pattern: /^\d{3,6}$/, message: '密码请输入3-6位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    // 用async 去接收一个返回的值
    async onSubmit() {
      console.log('我被提交了')
      // async函数会返回一个promise对象
      // 基准地址 ‘http://locallhost:3000'已经添加到默认了
      const res = await this.$axios.post('/login', this.userInfo)
      //  { username: this.username,
      //   password: this.password
      // })
      console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        // 将token和id存储到localstorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 在组件中使用 toast，必须 用 this.$toast
        this.$toast.success(message)
        // 登录成功 跳转到个人中心页面 user
        this.$router.push('/user')
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
