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
        <el-input v-model="search" placeholder="请输入传感器名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
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
          <span v-if="scope.row.sensorStatus === '1'" style="color: green;">
            <i class="el-icon-check" /> 正常
          </span>
          <span v-else style="color: red;">
            <i class="el-icon-close" /> 异常
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sensorTag"
        label="设备唯一标识"
      />
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
          <el-button size="small" type="success" @click="setUp(scope.row)">设置</el-button>
          <el-button size="small" type="warning" @click="rename(scope.row)">重命名</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="传感器设置列表"
      :visible.sync="table"
      direction="rtl"
      size="50%"
    >
      <div class="celan">
        <el-button type="primary" @click="newlyAdded()">新增设置</el-button>
        <el-table :data="gridData">
          <el-table-column property="sensorStart" label="开始时间" width="150" />
          <el-table-column property="sensorEnd" label="结束时间" width="200" />
          <el-table-column property="lessValue" label="小于报警值" />
          <el-table-column property="bigValue" label="大于报警值" />
          <el-table-column property="sensorStatus" label="状态" />
          <el-table-column label="操作" width="150px">
            <template slot-scope="szscope">
              <el-button size="small" type="warning" icon="el-icon-edit" @click="modify(szscope.row)" />
              <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteSettings(szscope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <el-dialog title="新增传感器设置" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="formDataVerification" class="addNewData">
        <div class="first">
          <el-form-item label="设备唯一标识" prop="sensorTag">
            <el-input v-model="form.sensorTag" disabled autocomplete="off" />
          </el-form-item>
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
        </div>
        <div class="second">
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
          <el-form-item label="状态" prop="sensorStatus">
            <!-- <el-input v-model="form.sensorStatus" autocomplete="off" /> -->
            <el-select v-model="form.sensorStatus" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirmation()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改设置" :visible.sync="modifyDisplay">
      <el-form :model="form" :rules="formDataVerification" class="addNewData">
        <div class="first">
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
        <div class="second">
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
        <el-button @click="modifyDisplay = false">取 消</el-button>
        <el-button type="primary" @click="modificationConfirmation()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重命名" :visible.sync="renameDisplay">
      <el-form :model="currentRowData" :rules="formDataVerification1" class="addNewData">
        <el-form-item label="传感器名称" prop="sensorName">
          <el-input v-model="currentRowData.sensorName" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameDisplay = false">取 消</el-button>
        <el-button type="primary" @click="renameConfirmation()">确 定</el-button>
      </div>
    </el-dialog>
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
import { cgqsbhq } from '@/api/chuanganqishebei.js'
import { qgqszhq } from '@/api/chuanganqishebei.js'
import { xzcgqsz } from '@/api/chuanganqishebei.js'
import { shanchu } from '@/api/chuanganqishebei.js'
import { chongmingming } from '@/api/chuanganqishebei.js'
import { xuigaishuju } from '@/api/chuanganqishebei.js'
export default {
  data() {
    const options = [{
      value: '1',
      label: '正常'
    },
    {
      value: '0',
      label: '警告'
    }
    ]
    const state = [{
      value: '开启',
      label: '开启'
    },
    {
      value: '关闭',
      label: '关闭'
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

    const formData = {
      id: '',
      sensorTag: '',
      sensorStart: '',
      sensorEnd: '',
      lessValue: '',
      bigValue: '',
      sensorStatus: ''
    }
    const formDataReset = {
      id: '',
      sensorStart: '',
      sensorEnd: '',
      lessValue: '',
      bigValue: '',
      sensorStatus: ''
    }
    const formDataVerification = {
      sensorStart: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
      sensorEnd: [{ required: true, message: '请输入结束时间', trigger: 'blur' }],
      lessValue: [{ required: true, message: '请输入报警值', trigger: 'blur' }],
      bigValue: [{ required: true, message: '请输入报警值', trigger: 'blur' }],
      sensorStatus: [{ required: true, message: '请输入状态', trigger: 'blur' }]
    }
    const formDataVerification1 = {
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
      search: '',
      tableData: tableData,
      newdata: [],
      intermediateData: '',
      dialogFormVisible: false,
      form: formData,
      formDataVerification: formDataVerification,
      formDataVerification1: formDataVerification1,
      table: false,
      currentPageNumber: 1,
      activeName: 'chuangganqi',
      currentRowData: '',
      gridData: gridData,
      modifyDisplay: false,
      renameDisplay: false,
      setCurrentRowData: '',
      sensorId: '',
      renameName: '',
      formDataReset: formDataReset,
      state: state
    }
  },
  created() {
    this.initialization()
  },
  methods: {
    async renameConfirmation() {
      if (!this.currentRowData.sensorName) {
        this.$message.error('请输入传感器名称')
        this.currentRowData.sensorName = this.renameName
      } else {
        try {
          const e = this.currentRowData
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
          this.initialization()
        } catch (error) {
          console.log('错误', error)
        }
        console.log(this.currentRowData)
        this.renameDisplay = false
      }
    },
    rename(e) {
      this.renameName = e.sensorName
      this.renameDisplay = true
      this.currentRowData = JSON.parse(JSON.stringify(e))
      console.log('当前行', this.currentRowData)
    },
    async deleteSettings(e) {
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
      this.setUp(this.setCurrentRowData)
    },
    async modificationConfirmation() {
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
        this.form = JSON.parse(JSON.stringify(this.formDataReset))

        console.log('修改后的数据', this.form)
        this.modifyDisplay = false
        this.setUp(this.setCurrentRowData)
      }
    },
    modify(e) {
      this.modifyDisplay = true
      console.log('修改', e)
      this.sensorId = e.sensorId
      this.form.id = e.id
      this.form.bigValue = e.bigValue
      this.form.sensorStart = e.sensorStart
      this.form.sensorEnd = e.sensorEnd
      this.form.lessValue = e.lessValue
      this.form.sensorStatus = e.sensorStatus
    },
    async setUp(e) {
      console.log('ID', e.id)
      this.setCurrentRowData = e
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
      this.currentRowData = e
      console.log('新增那条数据的设置', this.currentRowData)
    },
    async addConfirmation() {
      if (!this.form.bigValue || // 新增的字段
          !this.form.sensorStart || // 新增的字段
          !this.form.sensorEnd || // 新增的字段
          !this.form.lessValue || // 新增的字段
          !this.form.sensorStatus) { // 新增的字段
        this.$message.error('请输入全部数据')
      } else {
        try {
          this.form.id = this.currentRowData.id
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
        this.setUp(this.setCurrentRowData)
      }
    },
    newlyAdded() {
      console.log('重置数据', this.formDataReset)
      this.form = JSON.parse(JSON.stringify(this.formDataReset))
      console.log('设备唯一表示数据', this.currentRowData)
      this.form.sensorTag = this.currentRowData.sensorTag
      this.dialogFormVisible = true
      console.log('新增那条数据的设置', this.currentRowData)
    },
    async initialization() {
      try {
        const ref = await cgqsbhq()
        console.log('原始', this.tableData)
        console.log('数据', ref)
        this.tableData = ref.data.data
        console.log('修改后', this.tableData)
      } catch (error) {
        console.log('错误', error)
      }
      this.getData()
      this.query()
    },
    getData() {
      this.newdata = this.tableData
    },
    query() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.sensorStatus === this.value && item.sensorName.includes(this.search)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.sensorStatus === this.value && this.search === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.sensorName.includes(this.search)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.search === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log('搜索后的结果', newdata)
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
        console.log(`第${e}页的数据${i}`, this.intermediateData[i])
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
.celan{
  padding: 20px;
}
.pageNumber{
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
.addNewData{
  /* border: 7px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.el-input {
  width: 17vw;
}
.first{
  display: flex;
  flex-direction: column;
}
.second{
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
