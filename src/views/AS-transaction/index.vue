<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-label>TxHash</el-label>
        <el-input v-model="sousuo" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="id" label="编号" width="60" />
      <el-table-column prop="repertoryName" label="交易哈希" width="500" />
      <el-table-column prop="recipientAddress" label="接收者地址" />
      <el-table-column prop="orderStatus" label="订单状态" width="155" />
      <el-table-column prop="createTime" label="提交时间" />
    </el-table>
    <div class="yema">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="zhongjianshuju.length"
        :current-page.sync="dangqianyema"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sousuo: '',
      tableData: [
        { id: '1', repertoryName: '0x887e3520f06156498d2d83207ef96d6b83c5ea001ce8072e0f89fca7982c50d', createTime: '2021-02-15 12:24:27', recipientAddress: '0x1BB611c5e9cEF84aCF3065B1b1eb128e3057E665', orderStatus: '待发货' },
        { id: '2', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '3', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '4', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '5', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '6', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '7', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '8', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '9', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '10', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '11', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' },
        { id: '12', repertoryName: '0x721fa75f639f62569d98d0826f2b450094e85041431c44458d8b3d06dc2cea', createTime: '2021-02-16 14:24:29', recipientAddress: '0xADe2DEa5c8A206C69778836dEE9986fFbACbD4B', orderStatus: '已发货' }
        // 更多数据省略...
      ],
      zhongjianshuju: [],
      newdata: [],
      dangqianyema: 1
    }
  },
  created() {
    this.chaxun()
  },
  methods: {
    chaxun() {
      this.zhongjianshuju = this.tableData.filter(item => {
        return (
          item.repertoryName.includes(this.sousuo) ||
          item.recipientAddress.includes(this.sousuo)
        )
      })
      this.fenye(1)
    },
    handlePageChange(page) {
      this.fenye(page)
    },
    fenye(page) {
      const pageSize = 10
      const start = (page - 1) * pageSize
      const end = page * pageSize
      this.newdata = this.zhongjianshuju.slice(start, end)
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 17vw;
}

.yema {
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-container {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
