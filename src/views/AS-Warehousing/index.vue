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
        productType: '电子产品',
        productName: '手机',
        joinAmount: 150,
        pass: '90%',
        createTime: '2021-02-05 12:00:00',
        account: '灌溉系统1'
      },
      {
        id: '2',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '手机',
        joinAmount: 200,
        pass: '95%',
        createTime: '2021-03-10 14:30:45',
        account: '灌溉系统1'
      },
      {
        id: '3',
        repertoryName: '辅仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 250,
        pass: '85%',
        createTime: '2021-04-15 09:15:30',
        account: '灌溉系统1'
      },
      {
        id: '4',
        repertoryName: '辅仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 300,
        pass: '92%',
        createTime: '2021-05-20 16:45:10',
        account: '灌溉系统1'
      },
      {
        id: '5',
        repertoryName: '主仓库',
        productType: '日用产品',
        productName: '洗发水',
        joinAmount: 180,
        pass: '88%',
        createTime: '2021-06-25 11:20:55',
        account: '灌溉系统1'
      },
      {
        id: '6',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 220,
        pass: '91%',
        createTime: '2021-07-30 08:50:25',
        account: '灌溉系统1'
      },
      {
        id: '7',
        repertoryName: '辅仓库',
        productType: '电子产品',
        productName: '耳机',
        joinAmount: 130,
        pass: '80%',
        createTime: '2021-08-05 13:05:40',
        account: '灌溉系统1'
      },
      {
        id: '8',
        repertoryName: '辅仓库',
        productType: '日用产品',
        productName: '牙刷',
        joinAmount: 175,
        pass: '89%',
        createTime: '2021-09-10 15:25:15',
        account: '灌溉系统1'
      },
      {
        id: '9',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '笔记本电脑',
        joinAmount: 210,
        pass: '93%',
        createTime: '2021-10-15 10:10:05',
        account: '灌溉系统1'
      },
      {
        id: '10',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
      },
      {
        id: '11',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
      },
      {
        id: '12',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
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
