<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="chaxun">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入产品姓名">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜索</el-button>
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
        label="产品种类"
      />
      <el-table-column
        prop="productName"
        label="产品名称"
      />
      <el-table-column
        prop="joinAmount"
        label="入库量"
      />
      <el-table-column
        prop="pass"
        label="合格率"
      />
      <el-table-column
        prop="createTime"
        label="入库时间"
      />
      <el-table-column
        prop="account"
        label="操作员"
      />
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
import { hqkc } from '@/api/kucunkongzhi'
export default {
  data() {
    const options = [{
      value: '主仓库',
      label: '主仓库'
    }, {
      value: '辅仓库',
      label: '辅仓库'
    }]
    const tableData = [
      {
        id: '1',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '小麦',
        joinAmount: 1400, // 数量小于等于上一次
        pass: '95%', // 合格率
        updateTime: '2024-10-20 10:00:00', // 更新时间
        account: 'admin'
      },
      {
        id: '2',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '大米',
        joinAmount: 1700, // 数量小于等于上一次
        pass: '97%',
        updateTime: '2024-10-19 14:30:00',
        account: 'admin'
      },
      {
        id: '3',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '玉米',
        joinAmount: 1600, // 数量小于等于上一次
        pass: '94%',
        updateTime: '2024-10-18 09:15:00',
        account: 'admin'
      },
      {
        id: '4',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '大豆',
        joinAmount: 1100, // 数量小于等于上一次
        pass: '92%',
        updateTime: '2024-10-17 16:45:00',
        account: 'admin'
      },
      {
        id: '5',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '燕麦',
        joinAmount: 700, // 数量小于等于上一次
        pass: '90%',
        updateTime: '2024-10-16 11:20:00',
        account: 'admin'
      },
      {
        id: '6',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '高粱',
        joinAmount: 900, // 数量小于等于上一次
        pass: '93%',
        updateTime: '2024-10-15 08:50:00',
        account: 'admin'
      },
      {
        id: '7',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '荞麦',
        joinAmount: 600, // 数量小于等于上一次
        pass: '88%',
        updateTime: '2024-10-14 13:05:00',
        account: 'admin'
      },
      {
        id: '8',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '大麦',
        joinAmount: 1000, // 数量小于等于上一次
        pass: '91%',
        updateTime: '2024-10-13 15:25:00',
        account: 'admin'
      },
      {
        id: '9',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '米粉',
        joinAmount: 650, // 数量小于等于上一次
        pass: '89%',
        updateTime: '2024-10-12 10:10:00',
        account: 'admin'
      },
      {
        id: '10',
        repertoryName: '主仓库',
        productType: '粮食',
        productName: '面粉',
        joinAmount: 800, // 数量小于等于上一次
        pass: '96%',
        updateTime: '2024-10-11 17:40:00',
        account: 'admin'
      },
      {
        id: '11',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '红豆',
        joinAmount: 500, // 新增产品，设置数量
        pass: '90%',
        updateTime: '2024-10-10 12:00:00',
        account: 'admin'
      },
      {
        id: '12',
        repertoryName: '辅仓库',
        productType: '粮食',
        productName: '绿豆',
        joinAmount: 400, // 新增产品，设置数量
        pass: '88%',
        updateTime: '2024-10-09 11:00:00',
        account: 'admin'
      }
    ]

    const newrukuxx = {
      repertoryName: '',
      productType: '',
      productName: '',
      joinAmount: '',
      pass: '',
      createTime: '',
      account: ''
    }
    const newrukuxxjianyan = {
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
      sousuo: '',
      tableData: tableData,
      newdata: [],
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true,
      dangqianyema: 1
    }
  },
  created() {
    this.qingqui()
    this.huqushuju()
    this.chaxun()
  },
  methods: {
    async qingqui() {
      try {
        const ref = await hqkc()
        console.log('数据', ref)
      } catch (error) {
        console.log('错误', error)
      }
    },
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.repertoryName === this.value && item.productName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.repertoryName === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.productName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      },
      console.log(newdata)
      )
      this.zhongjianshuju = newdata
      console.log('中间', this.zhongjianshuju)
      this.dangqianyema = 1
      this.fenye(1)
    },
    handlePageChange(ym) {
      console.log(ym)
      this.currentPage = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = []
      for (let i = (e - 1) * 10; i < ((e - 1) * 10) + 10; i++) {
        console.log(this.zhongjianshuju[i])
        if (this.zhongjianshuju[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        } else {
          this.newdata.push(this.zhongjianshuju[i])
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
.yema{
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
.diyi{
  display: flex;
  justify-content: space-between;
}
.dier{
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
