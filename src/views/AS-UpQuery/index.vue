<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="传感器" name="chuangganqi">
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
            prop="icon"
            label="图标"
          />
          <el-table-column
            prop="sensor_name"
            label="传感器名称"
          />
          <el-table-column
            prop="value"
            label="数值"
          />
          <el-table-column
            prop="device_name"
            label="操作"
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
        <div class="yema">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData.length"
            :current-page="dangqianyema"
            @current-change="handlePageChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="控制器" name="kongzhiqi">配置管理</el-tab-pane>
      <el-tab-pane label="摄像头" name="shexiangtou">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    const options = [{
      value: '地震预警',
      label: '地震预警'
    },
    {
      value: '空气质量预警',
      label: '空气质量预警'
    },
    {
      value: '滑坡预警',
      label: '滑坡预警'
    },
    {
      value: '库存预警',
      label: '库存预警'
    }]
    const tableData = [
      {
        'id': 1,
        'status': '正常',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 23.5
      },
      {
        'id': 2,
        'status': '警告',
        'icon': '警告图标.png',
        'sensor_name': '湿度传感器',
        'value': 70.2
      },
      {
        'id': 3,
        'status': '故障',
        'icon': '故障图标.png',
        'sensor_name': '压力传感器',
        'value': null
      },
      {
        'id': 4,
        'status': '正常',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 24.1
      },
      {
        'id': 5,
        'status': '警告',
        'icon': '警告图标.png',
        'sensor_name': '气体传感器',
        'value': 18.6
      },
      {
        'id': 6,
        'status': '正常',
        'icon': '正常图标.png',
        'sensor_name': '湿度传感器',
        'value': 60.5
      },
      {
        'id': 7,
        'status': '故障',
        'icon': '故障图标.png',
        'sensor_name': '温度传感器',
        'value': null
      },
      {
        'id': 8,
        'status': '正常',
        'icon': '正常图标.png',
        'sensor_name': '温度传感器',
        'value': 22.8
      },
      {
        'id': 9,
        'status': '警告',
        'icon': '警告图标.png',
        'sensor_name': '湿度传感器',
        'value': 75.1
      },
      {
        'id': 10,
        'status': '故障',
        'icon': '故障图标.png',
        'sensor_name': '压力传感器',
        'value': null
      },
      {
        'id': 11,
        'status': '正常',
        'icon': '正常图标.png',
        'sensor_name': '气体传感器',
        'value': 15.3
      },
      {
        'id': 12,
        'status': '警告',
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
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true,
      dangqianyema: 1,
      activeName: 'chuangganqi'
    }
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.newdata.push(this.tableData[i])
    }
  },
  mounted() {
    // 初始化时获取第一页的数据
    this.fetchData(this.dangqianyema)
  },
  methods: {
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.alert_type === this.value && item.alert_source.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.alert_type === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      },
      console.log(newdata)
      )
      this.newdata = newdata
    },
    xingzeng() {
      if (this.form.repertoryName === '' ||
    this.form.productType === '' ||
    this.form.productName === '' ||
    this.form.joinAmount === '' ||
    this.form.pass === '' ||
    this.form.createTime === '' ||
    this.form.account === '') {
        // 如果所有字段都不为空时，执行这里的逻辑
        this.$message({
          message: '请输入全部数据',
          type: 'warning'
        })
      } else {
        console.log(this.form)
        this.newdata.push({
          id: this.newdata.length + 1,
          ...this.form
        })
        console.log(this.newdata)
        this.form = {
          repertoryName: '',
          productType: '',
          productName: '',
          joinAmount: '',
          pass: '',
          createTime: '',
          account: ''
        }
        this.dialogFormVisible = false
      }
    },
    handlePageChange(page) {
      // 处理页码切换逻辑
      this.currentPage = page
      console.log('当前页码为:', page)
      // 这里可以根据 page 发送请求，获取相应的分页数据
      this.fetchData(page)
    },
    fetchData(page) {
      // 模拟获取数据
      console.log(`正在获取第 ${page} 页的数据...`)
      // 请求数据的逻辑
      // 可以将请求到的数据显示在 tableData 中
      const fenyeshuj = []
      for (let i = (page - 1) * 10; i < ((page - 1) * 10) + 10; i++) {
        console.log(this.tableData[i])
        if (this.tableData[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        }
        fenyeshuj.push(this.tableData[i])
      }
      this.newdata = fenyeshuj
    }
  }
}
</script>
<style scoped>
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
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid red; */
}
</style>
