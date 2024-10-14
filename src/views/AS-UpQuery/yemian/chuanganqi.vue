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
        <el-input v-model="sousuo" placeholder="请输入传感器名称">''</el-input>
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
        prop="sensorStatus"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.sensorStatus === 1" style="color: green;">
            <i class="el-icon-check" /> 正常
          </span>
          <span v-else style="color: red;">
            <i class="el-icon-close" /> 异常
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
      />
      <el-table-column
        prop="sensorName"
        label="传感器名称"
      />
      <el-table-column
        prop="sensorValue"
        label="数值"
      />
      <el-table-column
        label="操作"
      >
        <template>
          <el-button size="small" type="success">设置</el-button>
          <el-button size="small" type="primary">查看报表</el-button>
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
import { cgqsbhq } from '@/api/cangkushebei.js'
export default {
  data() {
    const options = [{
      value: 1,
      label: '正常'
    },
    {
      value: 0,
      label: '警告'
    }
    ]
    const tableData = [
      {
        'id': 1,
        'status': '✅',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 23.5
      },
      {
        'id': 2,
        'status': '❌',
        'icon': '警告图标.png',
        'sensor_name': '湿度传感器',
        'value': 70.2
      },
      {
        'id': 3,
        'status': '⚠',
        'icon': '故障图标.png',
        'sensor_name': '压力传感器',
        'value': null
      },
      {
        'id': 4,
        'status': '✅',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 24.1
      },
      {
        'id': 5,
        'status': '❌',
        'icon': '警告图标.png',
        'sensor_name': '气体传感器',
        'value': 18.6
      },
      {
        'id': 6,
        'status': '✅',
        'icon': '正常图标.png',
        'sensor_name': '湿度传感器',
        'value': 60.5
      },
      {
        'id': 7,
        'status': '⚠',
        'icon': '故障图标.png',
        'sensor_name': '温度传感器',
        'value': null
      },
      {
        'id': 8,
        'status': '✅',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 22.8
      },
      {
        'id': 9,
        'status': '❌',
        'icon': '警告图标.png',
        'sensor_name': '湿度传感器',
        'value': 75.1
      },
      {
        'id': 10,
        'status': '⚠',
        'icon': '故障图标.png',
        'sensor_name': '压力传感器',
        'value': null
      },
      {
        'id': 11,
        'status': '✅',
        'icon': '正常图标.png',
        'sensor_name': '气体传感器',
        'value': 15.3
      },
      {
        'id': 12,
        'status': '❌',
        'icon': '警告图标.png',
        'sensor_name': '温度传感器',
        'value': 28.4
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
  async created() {
    try {
      const ref = await cgqsbhq()
      console.log('原始', this.tableData)

      console.log('数据', ref)
      this.tableData = ref.data.data
      console.log('修改后', this.tableData)
    } catch (error) {
      console.log('错误', error)
    }
    // this.hqcgq()
    this.huqushuju()
    this.chaxun()
  },
  methods: {
    // async hqcgq() {
    //   try {
    //     const ref = await cgqsbhq()
    //     console.log(this.tableData)

    //     console.log('数据', ref)
    //     this.tableData = ref.data.data
    //     console.log(this.tableData)
    //   } catch (error) {
    //     console.log('错误', error)
    //   }
    // },
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.sensorStatus === this.value && item.sensorName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.sensorStatus === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.sensorName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log('搜索后的结果', newdata)
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
        console.log(`第${e}页的数据${i}`, this.zhongjianshuju[i])
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
