<template>
  <div class="manage">
      <newsHeader>栏目管理</newsHeader>
      <div class="del">
          <p>点击删除以下频道</p>
          <div class="list">
              <div class="item" v-for="item in delList" :key="item.id" @click="delFn(item.id)">{{item.name}}</div>
          </div>
      </div>
      <div class="undel">
          <p>点击添加以下频道</p>
          <div class="list">
              <div class="item" v-for="item in undelList" :key="item.id" @click="undelFn(item.id)">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delList: [],
      undelList: []
    }
  },
  created() {
    // 因为localstorage里存储的是字符串格式的
    const delList = JSON.parse(localStorage.getItem('delList'))
    const undelList = JSON.parse(localStorage.getItem('undelList'))
    if (delList) {
      this.delList = delList
      this.undelList = undelList
      return
    }
    this.getList()
  },
  // 当栏目数据发生了改变，需要保存localStorage中
  watch: {
    delList: {
      deep: true,
      handler(value) {
        // console.log(value)
        // value的值是一个对象
        localStorage.setItem('delList', JSON.stringify(this.delList))
        localStorage.setItem('undelList', JSON.stringify(this.undelList))
      }
    }
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/category')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.delList = data
        // console.log(this.delList)
      }
    },
    delFn(id) {
      // 注意这个id 不是数组的下标
      if (this.delList.length > 4) {
        const index = this.delList.findIndex(item => item.id === id)
        //  console.log(index)
        this.undelList.push(this.delList[index])
        this.delList.splice(index, 1)
      }
    },
    undelFn(id) {
      const index = this.undelList.findIndex(item => item.id === id)
      //  console.log(index)
      this.delList.push(this.undelList[index])
      this.undelList.splice(index, 1)
    }
  }
}
</script>

<style lang='less' scoped>
p {
    color: #999;
    font-size: 14px;
    margin: 10px 0;
}
.manage {
    padding: 20px;
        // display: flex;
    .list {
        overflow: hidden;
        .item {
        float: left;
        width: 70px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        margin: 6px;
    }
    }
}
</style>
