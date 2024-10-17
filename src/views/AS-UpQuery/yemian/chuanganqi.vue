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
        width="270px"
      >
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="shezhi(scope.row)">设置</el-button>
          <el-button size="small" type="primary">查看报表</el-button>
          <el-button size="small" type="warning" @click="chongmm(scope.row)">重命名</el-button>
          <el-drawer
            title="传感器设置列表"
            :visible.sync="table"
            direction="rtl"
            size="50%"
          >
            <div class="celan">
              <el-button type="primary" @click="xinzeng()">新增设置</el-button>
              <el-table :data="gridData">
                <el-table-column property="sensorStart" label="开始时间" width="150" />
                <el-table-column property="sensorEnd" label="结束时间" width="200" />
                <el-table-column property="lessValue" label="小于报警值" />
                <el-table-column property="bigValue" label="大于报警值" />
                <el-table-column property="sensorStatus" label="状态" />
                <el-table-column label="操作">
                  <template slot-scope="szscope">
                    <el-button size="small" type="warning" icon="el-icon-edit" @click="xuigai(szscope.row)" />
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="shanchushezhi(szscope.row)" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-drawer>
          <el-dialog title="新增传感器设置" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="shujujianyan" class="xinzenshuju">
              <div class="diyi">
                <el-form-item label="开始时间" prop="sensorStart">
                  <el-time-select
                    v-model="form.sensorStart"
                    :picker-options="{
                      start: '00:00',
                      step: '00:05',
                      end: '23:55'
                    }"
                    placeholder="选择时间"
                  />
                </el-form-item>
                <el-form-item label="小于报警值" prop="lessValue">
                  <el-input v-model="form.lessValue" autocomplete="off" />
                </el-form-item>
                <el-form-item label="状态" prop="sensorStatus">
                  <el-input v-model="form.sensorStatus" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="结束时间" prop="sensorEnd">
                  <el-time-select
                    v-model="form.sensorEnd"
                    :picker-options="{
                      start: '00:00',
                      step: '00:05',
                      end: '23:55'
                    }"
                    placeholder="选择时间"
                  />
                </el-form-item>
                <el-form-item label="大于报警值" prop="bigValue">
                  <el-input v-model="form.bigValue" autocomplete="off" />
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="xinzengqr()">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改设置" :visible.sync="xuigaixs">
            <el-form :model="form" :rules="shujujianyan" class="xinzenshuju">
              <div class="diyi">
                <el-form-item label="开始时间" prop="sensorStart">
                  <el-time-select
                    v-model="form.sensorStart"
                    :picker-options="{
                      start: '00:00',
                      step: '00:05',
                      end: '23:55'
                    }"
                    placeholder="选择时间"
                  />
                </el-form-item>
                <el-form-item label="小于报警值" prop="lessValue">
                  <el-input v-model="form.lessValue" autocomplete="off" />
                </el-form-item>
                <el-form-item label="状态" prop="sensorStatus">
                  <el-input v-model="form.sensorStatus" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="结束时间" prop="sensorEnd">
                  <el-time-select
                    v-model="form.sensorEnd"
                    :picker-options="{
                      start: '00:00',
                      step: '00:05',
                      end: '23:55'
                    }"
                    placeholder="选择时间"
                  />
                </el-form-item>
                <el-form-item label="大于报警值" prop="bigValue">
                  <el-input v-model="form.bigValue" autocomplete="off" />
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="xuigaixs = false">取 消</el-button>
              <el-button type="primary" @click="xuigaiqr()">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="重命名" :visible.sync="chongmmxs">
            <el-form :model="dangqianhangshuju" :rules="shujujianyan1" class="xinzenshuju">
              <el-form-item label="传感器名称" prop="sensorName">
                <el-input v-model="dangqianhangshuju.sensorName" placeholder="请输入内容" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="chongmmxs = false">取 消</el-button>
              <el-button type="primary" @click="chongmmqr()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
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
import { cgqsbhq } from '@/api/chuanganqishebei.js'
import { qgqszhq } from '@/api/chuanganqishebei.js'
import { xzcgqsz } from '@/api/chuanganqishebei.js'
import { shanchu } from '@/api/chuanganqishebei.js'
import { chongmingming } from '@/api/chuanganqishebei.js'
import { xuigaishuju } from '@/api/chuanganqishebei.js'
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
      id: '',
      sensorStart: '',
      sensorEnd: '',
      lessValue: '',
      bigValue: '',
      sensorStatus: ''
    }
    const newrukuxxcz = {
      id: '',
      sensorStart: '',
      sensorEnd: '',
      lessValue: '',
      bigValue: '',
      sensorStatus: ''
    }
    const newrukuxxjianyan = {
      sensorStart: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
      sensorEnd: [{ required: true, message: '请输入结束时间', trigger: 'blur' }],
      lessValue: [{ required: true, message: '请输入报警值', trigger: 'blur' }],
      bigValue: [{ required: true, message: '请输入报警值', trigger: 'blur' }],
      sensorStatus: [{ required: true, message: '请输入状态', trigger: 'blur' }]
    }
    const newrukuxxjianyan1 = {
      sensorName: [{ required: true, message: '请输入传感器名称', trigger: 'blur' }]
    }
    const gridData = [
      {
        'sensorStart': '00:00',
        'sensorEnd': '01:00',
        'lessValue': 5,
        'bigValue': 10,
        'sensorStatus': '正常'
      },
      {
        'sensorStart': '02:00',
        'sensorEnd': '03:00',
        'lessValue': 3,
        'bigValue': 12,
        'sensorStatus': '警报'
      },
      {
        'sensorStart': '04:00',
        'sensorEnd': '05:00',
        'lessValue': 1,
        'bigValue': 15,
        'sensorStatus': '正常'
      },
      {
        'sensorStart': '06:00',
        'sensorEnd': '07:00',
        'lessValue': 7,
        'bigValue': 20,
        'sensorStatus': '警报'
      }
    ]

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
      shujujianyan1: newrukuxxjianyan1,
      table: false,
      dangqianyema: 1,
      activeName: 'chuangganqi',
      dangqianhangshuju: '',
      gridData: gridData,
      xuigaixs: false,
      chongmmxs: false,
      shezhidqhsj: '',
      sensorId: '',
      cmmmc: '',
      fromcz: newrukuxxcz
    }
  },
  created() {
    this.chushihua()
  },
  methods: {
    async chongmmqr() {
      if (!this.dangqianhangshuju.sensorName) {
        this.$message.error('请输入传感器名称')
        this.dangqianhangshuju.sensorName = this.cmmmc
      } else {
        try {
          const e = this.dangqianhangshuju
          console.log('重命名', e)
          const json = {
            id: e.id,
            sensorName: e.sensorName
          }
          const ref = await chongmingming(json)
          this.$message({
            message: '重命名成功',
            type: 'success'
          })
          console.log(json)
          console.log(ref)
          this.chushihua()
        } catch (error) {
          console.log('错误', error)
        }
        console.log(this.dangqianhangshuju)
        this.chongmmxs = false
      }
    },
    chongmm(e) {
      this.cmmmc = e.sensorName
      this.chongmmxs = true
      this.dangqianhangshuju = JSON.parse(JSON.stringify(e))
      console.log('当前行', this.dangqianhangshuju)
    },
    async shanchushezhi(e) {
      try {
        console.log('删除', e)
        const json = {
          sensorId: e.sensorId
        }
        const ref = await shanchu(json)
        console.log(json)
        console.log(ref)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        console.log('错误', error)
      }
      console.log('删除', e.id)
      this.shezhi(this.shezhidqhsj)
    },
    async xuigaiqr() {
      if (!this.sensorId || // 新增的字段
          !this.form.bigValue || // 新增的字段
          !this.form.sensorStart || // 新增的字段
          !this.form.sensorEnd || // 新增的字段
          !this.form.lessValue || // 新增的字段
          !this.form.sensorStatus) { // 新增的字段
        this.$message.error('请输入全部数据')
      } else {
        try {
          const json = {
            sensorId: this.sensorId,
            ...this.form
          }
          console.log(json.sensorId)
          console.log('修改后', json)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          const ref = await xuigaishuju(json)
          console.log(json)
          console.log(ref)
        } catch (error) {
          console.log('错误', error)
        }
        this.form = JSON.parse(JSON.stringify(this.fromcz))

        console.log('修改后的数据', this.form)
        this.xuigaixs = false
        this.shezhi(this.shezhidqhsj)
      }
    },
    xuigai(e) {
      this.xuigaixs = true
      console.log('修改', e)
      this.sensorId = e.sensorId
      this.form.id = e.id
      this.form.bigValue = e.bigValue
      this.form.sensorStart = e.sensorStart
      this.form.sensorEnd = e.sensorEnd
      this.form.lessValue = e.lessValue
      this.form.sensorStatus = e.sensorStatus
    },
    async shezhi(e) {
      console.log('ID', e.id)
      this.shezhidqhsj = e
      try {
        const json = {
          id: e.id
        }
        const ref = await qgqszhq(json)
        console.log('数据', ref)
        this.gridData = ref.data.data
        console.log('替换完的数据', this.gridData)
      } catch (error) {
        console.log('错误', error)
      }
      this.table = true
      console.log('当前行数据', e)
      this.dangqianhangshuju = e
      console.log('新增那条数据的设置', this.dangqianhangshuju)
    },
    async xinzengqr() {
      if (!this.form.bigValue || // 新增的字段
          !this.form.sensorStart || // 新增的字段
          !this.form.sensorEnd || // 新增的字段
          !this.form.lessValue || // 新增的字段
          !this.form.sensorStatus) { // 新增的字段
        this.$message.error('请输入全部数据')
      } else {
        try {
          this.form.id = this.dangqianhangshuju.id
          const ref = await xzcgqsz(this.form)
          console.log('返回数据', ref.data.code)
          this.$message({
            message: '新增设置成功',
            type: 'success'
          })
        } catch (error) {
          console.log('错误', error)
        }
        console.log(this.form)
        this.dialogFormVisible = false
        this.shezhi(this.shezhidqhsj)
      }
    },
    xinzeng() {
      console.log('重置数据', this.fromcz)
      this.form = JSON.parse(JSON.stringify(this.fromcz))
      this.dialogFormVisible = true
      console.log('新增那条数据的设置', this.dangqianhangshuju)
    },
    async chushihua() {
      try {
        const ref = await cgqsbhq()
        console.log('原始', this.tableData)
        console.log('数据', ref)
        this.tableData = ref.data.data
        console.log('修改后', this.tableData)
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
.celan{
  padding: 20px;
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
.xinzenshuju{
  /* border: 7px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.el-input {
  width: 17vw;
}
.diyi{
  display: flex;
  flex-direction: column;
}
.dier{
  display: flex;
  flex-direction: column;
}
.app-container{
  padding: 0;
  /* position: relative; */
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* overflow: auto; */
  /* border: 1px solid rgb(46, 251, 0); */
}
</style>
