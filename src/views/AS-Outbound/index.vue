<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="query">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="search" placeholder="请输入产品名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="newdata"
      style="width: 100%"
      border
      :row-style="{height: '64px'}"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="130"
      />
      <el-table-column
        prop="repertoryName"
        label="仓库名称"
        width="180"
      />
      <el-table-column
        prop="productType"
        label="粮食种类"
      />
      <el-table-column
        prop="productName"
        label="粮食名称"
      />
      <el-table-column
        prop="joinAmount"
        label="出库量"
      />
      <el-table-column
        prop="pass"
        label="仓库负责人"
      />
      <el-table-column
        prop="updateTime"
        label="出库时间"
      />
      <!-- <el-table-column
        label="操作"
      >
        <template>
          <el-button
            type="primary"
            size="small"
            @click="table = true"
          >查看</el-button>
        </template>
        <el-drawer
          title="我嵌套了表格!"
          :visible.sync="table"
          direction="rtl"
          size="30%"
          modal="false"
        >
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150" />
            <el-table-column property="name" label="姓名" width="200" />
            <el-table-column property="address" label="地址" />
          </el-table>
        </el-drawer>
      </el-table-column> -->
    </el-table>
    <div class="pageNumber">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="intermediateData.length"
        :current-page.sync="currentPageNumber"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const options = [
      { value: '一号仓库', label: '一号仓库' },
      { value: '二号仓库', label: '二号仓库' },
      { value: '三号仓库', label: '三号仓库' },
      { value: '四号仓库', label: '四号仓库' },
      { value: '五号仓库', label: '五号仓库' }
    ]
    const tableData = [
      {
        id: '1',
        repertoryName: '一号仓库',
        productType: '粮食',
        productName: '小麦',
        joinAmount: 1500, // 数量以千克为单位
        pass: 'xxx', // 合格率
        createTime: '2024-10-20 10:00:00', // 更新时间
        account: 'admin'
      },
      {
        id: '2',
        repertoryName: '一号仓库',
        productType: '粮食',
        productName: '大米',
        joinAmount: 2000,
        pass: 'xxx',
        createTime: '2024-10-19 14:30:00',
        account: 'admin'
      }
    ]

    const formData = {
      repertoryName: '',
      productType: '',
      productName: '',
      joinAmount: '',
      pass: '',
      createTime: '',
      account: ''
    }
    const formDataVerification = {
      repertoryName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
      productType: [{ required: true, message: '请输入产品类型', trigger: 'blur' }],
      productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
      joinAmount: [{ required: true, message: '请输入入库数量', trigger: 'blur' }],
      pass: [{ required: true, message: '请输入合格率', trigger: 'blur' }],
      createTime: [{ required: true, message: '请输入入库时间', trigger: 'blur' }],
      account: [{ required: true, message: '请输入操作账号', trigger: 'blur' }]
    }
    return {
      options: options,
      value: '',
      search: '',
      tableData: tableData,
      newdata: [],
      zhonjianshuju: '',
      dialogFormVisible: false,
      form: formData,
      formDataVerification: formDataVerification,
      table: true,
      currentPageNumber: 1
    }
  },
  created() {
    this.getData()
    this.query()
  },
  methods: {
    getData() {
      this.newdata = this.tableData
    },
    query() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.repertoryName === this.value && item.productName.includes(this.search)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.repertoryName === this.value && this.search === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.productName.includes(this.search)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.search === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log(newdata)
      this.intermediateData = newdata
      console.log('中间', this.intermediateData)
      this.currentPageNumber = 1
      this.paging(1)
    },
    handlePageChange(ym) {
      console.log(ym)
      this.currentPage = ym
      this.paging(ym)
    },
    paging(e) {
      this.newdata = []
      for (let i = (e - 1) * 10; i < ((e - 1) * 10) + 10; i++) {
        console.log(this.intermediateData[i])
        if (this.intermediateData[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        } else {
          this.newdata.push(this.intermediateData[i])
        }
      }
      console.log('分页数据', this.newdata)
    }
  }
}
</script>
<style scoped>
.el-select{
  width: 17vw;
}
.pageNumber{
  /* border: 1px solid red; */
  /* position: absolute;
  bottom: 0px ; */
  /* left: 40vw; */
  height: 6vh;
  min-height:6vh ;
  display: flex;
  justify-content: center;
  align-items:center;
}
.xingzengshuju{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  /* width: 90%; */
}
.el-input {
  width: 17vw;
}
.first{
  display: flex;
  justify-content: space-between;
}
.second{
  display: flex;
  justify-content: space-between;

}
.disan input{
  width: 40vw;
}
.disi{
  display: flex;
  justify-content: space-between;
}
.app-container{
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid red; */
}
</style>
