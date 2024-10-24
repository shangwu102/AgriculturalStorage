<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择仓库" @change="chaxun">
          <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入产品名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="id" label="编号" width="130" />
      <el-table-column prop="repertoryName" label="仓库名称" width="180" />
      <el-table-column prop="productType" label="产品种类" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="joinAmount" label="入库量" />
      <el-table-column prop="pass" label="仓库负责人" />
      <el-table-column prop="createTime" label="入库时间" />
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
      options: [
        { value: '1', name: '一号仓库' },
        { value: '2', name: '二号仓库' },
        { value: '3', name: '三号仓库' },
        { value: '4', name: '四号仓库' },
        { value: '5', name: '五号仓库' }
      ],
      value: '', // 仓库选择
      sousuo: '', // 产品搜索输入
      tableData: [
        {
          'id': '1',
          'repertoryName': '一号仓库',
          'productType': '粮食',
          'productName': '小麦',
          'joinAmount': 1500,
          'pass': 'xxx',
          'createTime': '2024-10-20 10:00:00',
          'account': 'admin'
        },
        {
          'id': '2',
          'repertoryName': '二号仓库',
          'productType': '粮食',
          'productName': '大米',
          'joinAmount': 2000,
          'pass': 'xxx',
          'createTime': '2024-10-19 14:30:00',
          'account': 'admin'
        },
        {
          'id': '3',
          'repertoryName': '三号仓库',
          'productType': '粮食',
          'productName': '玉米',
          'joinAmount': 1800,
          'pass': 'xxx',
          'createTime': '2024-10-18 09:15:00',
          'account': 'admin'
        },
        {
          'id': '4',
          'repertoryName': '四号仓库',
          'productType': '粮食',
          'productName': '大豆',
          'joinAmount': 1200,
          'pass': 'xxx',
          'createTime': '2024-10-17 16:45:00',
          'account': 'admin'
        },
        {
          'id': '5',
          'repertoryName': '五号仓库',
          'productType': '粮食',
          'productName': '燕麦',
          'joinAmount': 900,
          'pass': 'xxx',
          'createTime': '2024-10-16 11:20:00',
          'account': 'admin'
        },
        {
          'id': '6',
          'repertoryName': '一号仓库',
          'productType': '粮食',
          'productName': '高粱',
          'joinAmount': 1100,
          'pass': 'xxx',
          'createTime': '2024-10-15 08:50:00',
          'account': 'admin'
        },
        {
          'id': '7',
          'repertoryName': '二号仓库',
          'productType': '粮食',
          'productName': '荞麦',
          'joinAmount': 700,
          'pass': 'xxx',
          'createTime': '2024-10-14 13:05:00',
          'account': 'admin'
        },
        {
          'id': '8',
          'repertoryName': '三号仓库',
          'productType': '粮食',
          'productName': '大麦',
          'joinAmount': 1300,
          'pass': 'xxx',
          'createTime': '2024-10-13 15:25:00',
          'account': 'admin'
        },
        {
          'id': '9',
          'repertoryName': '四号仓库',
          'productType': '粮食',
          'productName': '米粉',
          'joinAmount': 850,
          'pass': 'xxx',
          'createTime': '2024-10-12 10:10:00',
          'account': 'admin'
        },
        {
          'id': '10',
          'repertoryName': '五号仓库',
          'productType': '粮食',
          'productName': '面粉',
          'joinAmount': 1000,
          'pass': 'xxx',
          'createTime': '2024-10-11 17:40:00',
          'account': 'admin'
        },
        {
          'id': '11',
          'repertoryName': '一号仓库',
          'productType': '粮食',
          'productName': '红米',
          'joinAmount': 1600,
          'pass': 'xxx',
          'createTime': '2024-10-09 11:30:00',
          'account': 'admin'
        },
        {
          'id': '12',
          'repertoryName': '二号仓库',
          'productType': '粮食',
          'productName': '荞麦面',
          'joinAmount': 400,
          'pass': 'xxx',
          'createTime': '2024-10-08 09:00:00',
          'account': 'admin'
        }
      ],
      newdata: [],
      zhongjianshuju: [], // 存储查询结果
      dangqianyema: 1 // 当前页码
    }
  },
  created() {
    this.huqushuju()
  },
  methods: {
    huqushuju() {
      this.newdata = this.tableData
      this.zhongjianshuju = this.tableData
      this.fenye(1)
    },
    chaxun() {
      const newdata = this.tableData.filter(item => {
        const matchesWarehouse = !this.value || item.repertoryName === this.options.find(opt => opt.value === this.value).name
        const matchesProduct = !this.sousuo || item.productName.includes(this.sousuo)
        return matchesWarehouse && matchesProduct
      })
      this.zhongjianshuju = newdata
      this.dangqianyema = 1
      this.fenye(1)
    },
    handlePageChange(ym) {
      this.dangqianyema = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = this.zhongjianshuju.slice((e - 1) * 10, e * 10)
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 17vw;
}

.yema {
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-input {
  width: 17vw;
}

.app-container {
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
