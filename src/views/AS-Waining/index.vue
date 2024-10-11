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
        <el-button type="primary" @click="chaxun">搜素</el-button>
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
        prop="alert_type"
        label="预警类型"
      />
      <el-table-column
        prop="alert_source"
        label="预警来源"
      />
      <el-table-column
        prop="alert_area"
        label="预警区域"
      />
      <el-table-column
        prop="device_name"
        label="设备名称"
      />
      <el-table-column
        prop="alert_message"
        label="预警信息"
        width="250"
      />
      <el-table-column
        prop="alert_time"
        label="时间"
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
        id: 1,
        alert_type: '地震预警',
        alert_source: '地震监测中心',
        alert_area: '四川省',
        device_name: '地震监测仪',
        alert_message: '发生5.2级地震，请做好避险准备。',
        alert_time: '2024-10-02 09:15'
      },
      {
        id: 2,
        alert_type: '空气质量预警',
        alert_source: '环保局',
        alert_area: '某城市',
        device_name: '空气质量监测仪',
        alert_message: 'PM2.5浓度过高，请减少户外活动。',
        alert_time: '2024-10-06 12:00'
      },
      {
        id: 3,
        alert_type: '滑坡预警',
        alert_source: '地质灾害监测中心',
        alert_area: '山区',
        device_name: '地质监测仪',
        alert_message: '近期降雨量大，请注意滑坡风险。',
        alert_time: '2024-10-10 15:45'
      },
      {
        id: 4,
        alert_type: '库存预警',
        alert_source: '供应链管理系统',
        alert_area: '物流中心',
        device_name: '库存监测系统',
        alert_message: '重要物资库存不足，请尽快补充。',
        alert_time: '2024-10-10 11:30'
      },
      {
        id: 5,
        alert_type: '地震预警',
        alert_source: '地震监测中心',
        alert_area: '云南省',
        device_name: '地震监测仪',
        alert_message: '发生4.8级地震，请做好避险准备。',
        alert_time: '2024-10-03 12:30'
      },
      {
        id: 6,
        alert_type: '空气质量预警',
        alert_source: '环保局',
        alert_area: '某工业区',
        device_name: '空气质量监测仪',
        alert_message: 'PM10浓度过高，空气污染严重。',
        alert_time: '2024-10-07 08:00'
      },
      {
        id: 7,
        alert_type: '滑坡预警',
        alert_source: '地质灾害监测中心',
        alert_area: '南方山区',
        device_name: '地质监测仪',
        alert_message: '近期有降雨，滑坡风险增加。',
        alert_time: '2024-10-08 14:20'
      },
      {
        id: 8,
        alert_type: '库存预警',
        alert_source: '供应链管理系统',
        alert_area: '物流仓库',
        device_name: '库存监测系统',
        alert_message: '食品类物资库存不足，请尽快补充。',
        alert_time: '2024-10-09 09:45'
      },
      {
        id: 9,
        alert_type: '地震预警',
        alert_source: '地震监测中心',
        alert_area: '新疆地区',
        device_name: '地震监测仪',
        alert_message: '发生5.5级地震，震感强烈，请做好防护。',
        alert_time: '2024-10-05 16:00'
      },
      {
        id: 10,
        alert_type: '空气质量预警',
        alert_source: '环保局',
        alert_area: '北方城市',
        device_name: '空气质量监测仪',
        alert_message: '沙尘暴来袭，空气质量恶化。',
        alert_time: '2024-10-04 10:30'
      },
      {
        id: 11,
        alert_type: '滑坡预警',
        alert_source: '地质灾害监测中心',
        alert_area: '东部山区',
        device_name: '地质监测仪',
        alert_message: '连续降雨，可能发生滑坡，请注意。',
        alert_time: '2024-10-06 18:00'
      },
      {
        id: 12,
        alert_type: '库存预警',
        alert_source: '供应链管理系统',
        alert_area: '港口物流中心',
        device_name: '库存监测系统',
        alert_message: '建筑材料库存告急，请及时补货。',
        alert_time: '2024-10-08 13:10'
      },
      {
        id: 13,
        alert_type: '地震预警',
        alert_source: '地震监测中心',
        alert_area: '甘肃省',
        device_name: '地震监测仪',
        alert_message: '发生4.6级地震，震源较浅，请避险。',
        alert_time: '2024-10-09 07:55'
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
