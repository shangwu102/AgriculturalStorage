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
      <!-- <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入区域名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜索</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-badge :value="weidu.length">
          <el-button type="primary" class="xiaoxi" @click="xuigaijiluzhuangtai">消息</el-button>
        </el-badge>
      </el-form-item>
    </el-form>
    <el-table
      :data="newdata"
      style="width: 100%"
      border
      :row-style="{height: '64px'}"
      :row-class-name="shifouyidu"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="130"
      />
      <el-table-column
        prop="warnType"
        label="预警类型"
      />
      <el-table-column
        prop="warnCome"
        label="预警来源"
      />
      <el-table-column
        prop="warnStore"
        label="设备名称"
      />
      <el-table-column
        prop="warnInfo"
        label="预警信息"
        width="250"
      />
      <el-table-column
        prop="time"
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
        :total="zhongjianshuju.length"
        :current-page.sync="dangqianyema"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { yujingxinxi } from '@/api/anquanyujing.js'
import { querenyidu } from '@/api/anquanyujing.js'
export default {
  data() {
    const options = [{
      value: '仓库1',
      label: '仓库1'
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
      zhongjianshuju: '',
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true,
      dangqianyema: 1,
      weidu: []
    }
  },
  created() {
    this.chushihua()
  },
  methods: {
    shifouyidu(row) {
      console.log(row)
      console.log(row.row.status)
      if (row.row.status === 0) {
        console.log('成功')
        return 'warning-row'
      }
    },
    weidushuju() {
      this.weidu = this.tableData.filter(e => {
        return e.status === 0
      })
      console.log('数据', this.tableData)
      console.log('未读数据', this.weidu)
    },
    async xuigaijiluzhuangtai() {
      try {
        const json = {
          status: 1
        }
        const ref = await querenyidu(json)
        console.log('返回值', ref)
        this.chushihua()
        this.weidushuju()
      } catch (error) {
        console.log('错误', error)
      }
    },
    async chushihua() {
      try {
        const ref = await yujingxinxi()
        console.log('原始', this.tableData)
        console.log('数据', ref)
        this.tableData = ref.data.data
        console.log('修改后', this.tableData)
        this.weidushuju()
      } catch (error) {
        console.log('错误', error)
      }
      this.huqushuju()
      this.chaxun()
    },
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.warnCome === this.value && item.warnStore.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.warnCome === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.warnStore.includes(this.sousuo)) {
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
.xiaoxi{
  margin-bottom: 10px;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

