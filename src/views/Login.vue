<template>
  <div>
    <newsHeader>登录界面</newsHeader>
   <newsLogo></newsLogo>
    <van-form @submit="onSubmit">
   <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="请输入用户名"
    :rules="rule.user"
  />
  <van-field
    v-model="password"
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rule: {
        // 将校验用户名和密码的规则放到data里，然后让vules调用
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
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
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

<style lang='less'>

</style>
