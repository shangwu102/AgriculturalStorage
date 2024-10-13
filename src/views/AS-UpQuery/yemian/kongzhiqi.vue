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
        <el-input v-model="sousuo" placeholder="请输入控制器名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜素</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :key="newdata.id"
      :data="newdata"
      style="width: 100%"
      border
      :row-style="{height: '64px'}"
    >
      <el-table-column
        prop="status"
        label="状态"
        width="130"
      />
      <el-table-column
        prop="device_id"
        label="编号"
        width="70px"
      />
      <el-table-column
        prop="icon"
        label="图标"
        width="130"
      />
      <el-table-column
        prop="controller_name"
        label="传感器名称"
      />
      <el-table-column
        prop="value"
        label="数值"
        width="300"
      />
      <el-table-column
        prop="controller_status"
        label="控制器状态"
      >
        <el-switch
          value="controller_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template>
          <el-button size="small" type="success">设置</el-button>
          <el-button size="small" type="warning">重命名</el-button>
        </template>
      </el-table-column>
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
    const options = [{
      value: '✅',
      label: '正常'
    },
    {
      value: '❌',
      label: '警告'
    },
    {
      value: '⚠',
      label: '故障'
    }
    ]
    const tableData = [
      {
        'status': '✅',
        'device_id': 1,
        'icon': '正常图标.png',
        'controller_name': '温度控制器',
        'value': 23.5,
        'controller_status': 1
      },
      {
        'status': '❌',
        'device_id': 2,
        'icon': '警告图标.png',
        'controller_name': '湿度控制器',
        'value': 68.2,
        'controller_status': 0
      },
      {
        'status': '⚠',
        'device_id': 3,
        'icon': '故障图标.png',
        'controller_name': '压力控制器',
        'value': null,
        'controller_status': 1
      },
      {
        'status': '✅',
        'device_id': 4,
        'icon': '正常图标.png',
        'controller_name': '气体控制器',
        'value': 15.3,
        'controller_status': 0
      },
      {
        'status': '✅',
        'device_id': 5,
        'icon': '正常图标.png',
        'controller_name': '温度控制器',
        'value': 22.8,
        'controller_status': 1
      },
      {
        'status': '❌',
        'device_id': 6,
        'icon': '警告图标.png',
        'controller_name': '湿度控制器',
        'value': 72.5,
        'controller_status': 0
      },
      {
        'status': '⚠',
        'device_id': 7,
        'icon': '故障图标.png',
        'controller_name': '压力控制器',
        'value': null,
        'controller_status': 1
      },
      {
        'status': '✅',
        'device_id': 8,
        'icon': '正常图标.png',
        'controller_name': '气体控制器',
        'value': 12.6,
        'controller_status': 0
      },
      {
        'status': '❌',
        'device_id': 9,
        'icon': '警告图标.png',
        'controller_name': '温度控制器',
        'value': 30.2,
        'controller_status': 1
      },
      {
        'status': '✅',
        'device_id': 10,
        'icon': '正常图标.png',
        'controller_name': '湿度控制器',
        'value': 55.4,
        'controller_status': 0
      },
      {
        'status': '⚠',
        'device_id': 11,
        'icon': '故障图标.png',
        'controller_name': '气压控制器',
        'value': null,
        'controller_status': 1
      },
      {
        'status': '✅',
        'device_id': 12,
        'icon': '正常图标.png',
        'controller_name': '风速控制器',
        'value': 5.4,
        'controller_status': 0
      },
      {
        'status': '❌',
        'device_id': 13,
        'icon': '警告图标.png',
        'controller_name': '温度控制器',
        'value': 29.9,
        'controller_status': 1
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
      zhongjianshuju: '',
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true,
      dangqianyema: 1,
      activeName: 'chuangganqi'
    }
  },
  created() {
    this.huqushuju()
    this.chaxun()
  },
  methods: {
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.status === this.value && item.controller_name.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.status === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log(newdata)
      this.zhongjianshuju = newdata
      console.log('中间', this.zhonjianshuju)
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
  bottom: 0px ;
  left: 40vw; */
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
  padding: 0;
  /* position: relative; */
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid rgb(46, 251, 0); */
}
</style>
