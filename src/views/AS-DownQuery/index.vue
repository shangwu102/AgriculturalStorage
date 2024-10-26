<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择仓库" @change="query">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="search" placeholder="请输入批次号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="newlyAdded"
          type="success"
          icon="el-icon-plus"
          @click="xinzengdialogFormVisible = true"
        >新增入库</el-button>
        <!-- 新增入库弹框 -->
        <el-dialog title="新增入库" :visible.sync="xinzengdialogFormVisible" width="60vw">
          <div class="biaodan">
            <el-form ref="xinzengForm" :model="form" :rules="formDataVerification" class="xingzengshuju">
              <div class="first">
                <el-form-item label="批次号" prop="batchId">
                  <el-input v-model="form.batchId" autocomplete="off" />
                </el-form-item>
                <el-form-item label="粮食种类" prop="goodKind">
                  <el-select v-model="form.goodKind" placeholder="请选择粮食种类">
                    <el-option v-for="item in productTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="second">
                <el-form-item label="粮食产地" prop="origin">
                  <el-input v-model="form.origin" autocomplete="off" />
                </el-form-item>
                <el-form-item label="上游企业链上地址" prop="upStreamFirm">
                  <el-input v-model="form.upStreamFirm" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="second">
                <el-form-item label="检测人员" prop="inspector">
                  <el-input v-model="form.inspector" autocomplete="off" />
                </el-form-item>
                <el-form-item label="保管人员" prop="custodian">
                  <el-input v-model="form.custodian" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库日期" prop="inDepotDate">
                  <el-date-picker
                    v-model="form.inDepotDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width: 17vw"
                    @change="handleInDepotDateChange"
                  />
                </el-form-item>
                <el-form-item label="收获日期" prop="harvestDate">
                  <el-date-picker
                    v-model="form.harvestDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width: 17vw"
                    @change="handleHarvestDateChange"
                  />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库数量" prop="amount">
                  <el-input v-model="form.amount" autocomplete="off" />
                </el-form-item>
                <el-form-item label="入库描述信息" prop="description">
                  <el-input v-model="form.description" type="textarea" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库仓库名称" prop="enterWareHouse">
                  <el-select v-model="form.enterWareHouse" placeholder="请选择仓库">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="xinzengdialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :loading="loadingSubmit" @click="newlyAdded">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>

    <!-- 表格显示 -->
    <el-table v-loading="loadingTable" :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="batchId" label="批次号" width="80" />
      <el-table-column prop="goodKind" label="粮食种类" width="130" />
      <el-table-column prop="origin" label="粮食产地" width="130" />
      <el-table-column prop="amount" label="入库数量" width="130" />
      <el-table-column prop="upStreamFirm" label="上游企业区块链地址" width="350" />
      <el-table-column prop="inDepotDate" label="入库日期" :formatter="formatTimestamp1" />
      <el-table-column prop="harvestDate" label="粮食收获日期" :formatter="formatTimestamp1" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="chakan(scope.row)">查看</el-button>
          <el-button type="warning" size="small" @click="chukuxianshi(scope.row)">出库</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="!loading" class="pageNumber">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="intermediateData.length"
        :current-page.sync="currentPageNumber"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 出库弹窗 -->
    <el-dialog title="新增出库" :visible.sync="chukudialogFormVisible">
      <div class="biaodan">
        <el-form ref="chukuForm" :model="chukuForm" :rules="chukuShujujianyan" class="xingzengshuju">
          <div class="form-row">
            <el-form-item label="批次号" prop="batchId">
              <el-input v-model="chukuForm.batchId" disabled autocomplete="off" />
            </el-form-item>
            <el-form-item label="仓库名称" prop="enterWareHouse">
              <el-select v-model="chukuForm.enterWareHouse" placeholder="请选择仓库" disabled>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="粮食种类" prop="goodKind">
              <el-input v-model="chukuForm.goodKind" disabled autocomplete="off" />
            </el-form-item>
            <el-form-item label="操作员" prop="account">
              <el-input v-model="chukuForm.account" disabled autocomplete="off" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="出库数量" prop="amount">
              <el-input v-model="chukuForm.amount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="出库时间" prop="outDepotDate">
              <el-date-picker
                v-model="chukuForm.outDepotDate"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%"
                @change="handleOutDepotDateChange"
              />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="订单名称" prop="tracingCode">
              <el-select v-model="chukuForm.tracingCode" placeholder="请选择订单">
                <el-option
                  v-for="order in pendingOrders"
                  :key="order.orderId"
                  :label="order.tracingCode"
                  :value="order.tracingCode"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chukudialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="chuku">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 侧栏详情 -->
    <el-drawer title="库存详情" :visible.sync="celan" direction="rtl" size="40%">
      <div class="xiangqing">
        <h3 class="el-icon-s-order">产品信息</h3>
        <el-table :data="[currentRow]">
          <el-table-column prop="batchId" label="批次号" />
          <el-table-column prop="goodKind" label="粮食种类" />
          <el-table-column prop="origin" label="粮食产地" />
          <el-table-column prop="amount" label="入库数量" />
          <el-table-column prop="description" label="入库描述信息" />

        </el-table>

        <h3 class="el-icon-s-order">相关人员</h3>
        <el-table :data="[currentRow]">
          <el-table-column prop="inspector" label="检测人员" />
          <el-table-column prop="custodian" label="保管人员" />

        </el-table>
        <h3 class="el-icon-s-order">相关日期</h3>
        <el-table :data="[currentRow]">
          <el-table-column prop="harvestDate" label="粮食收获日期" :formatter="formatTimestamp" />
          <el-table-column prop="inDepotDate" label="入库日期" :formatter="formatTimestamp" />
        </el-table>
        <h3 class="el-icon-s-order">上游地址</h3>
        <el-table :data="[currentRow]">
          <el-table-column prop="upStreamFirm" label="上游企业区块链地址" width="350" />
        </el-table>

      </div>
    </el-drawer>
  </div>
</template>

<script>
import { createInDepotInfo, getAllInDepotInfo, getDepotNames } from '@/api/Store'
import { getOrder } from '@/utils/order'

export default {
  data() {
    const options = []
    const productTypes = [
      { value: '小麦', label: '小麦' },
      { value: '大米', label: '大米' },
      { value: '玉米', label: '玉米' },
      { value: '大豆', label: '大豆' },
      { value: '燕麦', label: '燕麦' },
      { value: '高粱', label: '高粱' },
      { value: '荞麦', label: '荞麦' },
      { value: '大麦', label: '大麦' },
      { value: '米粉', label: '米粉' },
      { value: '面粉', label: '面粉' },
      { value: '红米', label: '红米' },
      { value: '荞麦面', label: '荞麦面' }
    ]

    const tableData = []

    const form = {
      batchId: '',
      goodKind: '',
      upStreamFirm: '',
      origin: '',
      enterWareHouse: '',
      inDepotDate: null, // 将日期字段初始化为 null
      harvestDate: null,
      inspector: '',
      custodian: '',
      description: '',
      amount: ''
    }

    const formDataVerification = {
      batchId: [{ required: true, message: '请输入批次号', trigger: 'blur' }],
      goodKind: [{ required: true, message: '请选择粮食种类', trigger: 'change' }],
      upStreamFirm: [
        { required: true, message: '请输入上游企业链上地址', trigger: 'blur' }
      ],
      origin: [{ required: true, message: '请输入粮食产地', trigger: 'blur' }],
      enterWareHouse: [
        { required: true, message: '请选择入库仓库名称', trigger: 'change' }
      ],
      inDepotDate: [
        { required: true, message: '请选择入库日期', trigger: 'change' }
      ],
      harvestDate: [
        { required: true, message: '请选择收获日期', trigger: 'change' }
      ],
      inspector: [
        { required: true, message: '请输入检测人员姓名', trigger: 'blur' }
      ],
      custodian: [
        { required: true, message: '请输入保管人员姓名', trigger: 'blur' }
      ],
      description: [
        { required: true, message: '请输入入库描述信息', trigger: 'blur' }
      ],
      amount: [{ required: true, message: '请输入入库数量', trigger: 'blur' }]
    }

    const chukuShujujianyan = {
      tracingCode: [
        { required: true, message: '请选择订单名称', trigger: 'change' }
      ],
      batchId: [{ required: true, message: '请输入批次号', trigger: 'blur' }],
      enterWareHouse: [
        { required: true, message: '请输入仓库名称', trigger: 'blur' }
      ],
      goodKind: [
        { required: true, message: '请输入粮食种类', trigger: 'blur' }
      ],
      amount: [{ required: true, message: '请输入出库数量', trigger: 'blur' }],
      outDepotDate: [
        { required: true, message: '请输入出库时间', trigger: 'change' }
      ],
      account: [{ required: true, message: '请输入操作账号', trigger: 'blur' }]
    }

    return {
      loadingSubmit: false, // 表单提交的加载状态
      loadingTable: false,
      options,
      productTypes,
      value: '',
      search: '',
      tableData,
      newdata: [],
      intermediateData: [], // 初始化为空数组
      xinzengdialogFormVisible: false,
      form,
      formDataVerification,
      currentPageNumber: 1,
      celan: false,
      chukudialogFormVisible: false,
      gridData: [],
      hangshuju: '',
      currentRow: null, // 当前选中的行数据
      chukuForm: {
        tracingCode: '',
        batchId: '',
        enterWareHouse: '',
        account: '',
        goodKind: '',
        amount: '',
        outDepotDate: null
      },
      chukuShujujianyan,
      orders: []
    }
  },
  computed: {
    pendingOrders() {
      return this.orders.filter(order => order.status === '待出库')
    }
  },
  created() {
    this.loadOrders()
    this.getDepotNames() // 获取所有仓库名称
    this.getData()
  },
  methods: {
    async getDepotNames() {
      try {
        const result = await getDepotNames()
        if (result.data.code === 1) {
          // 假设 result.data.data 是仓库名称的字符串数组
          this.options = result.data.data.map(item => ({
            value: item, // 如果有唯一的 id，建议使用 id 作为 value
            label: item // 如果有更友好的名称，可以使用 name 作为 label
          }))
          console.log('仓库选项:', this.options)
        } else {
          this.$message.error('获取仓库名称失败')
        }
      } catch (error) {
        console.error('获取仓库名称时出错:', error)
        this.$message.error('请求仓库名称时出错')
      }
    },
    // 加载订单数据从 localStorage
    loadOrders() {
      const savedOrders = getOrder()
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      } else {
        this.orders = []
      }
    },
    // 获取入库数据
    async getData() {
      try {
        this.loadingTable = true
        const result = await getAllInDepotInfo()
        if (result.data.code === 1) {
          // 扁平化数据结构
          this.tableData = result.data.data.map(item => ({
            batchId: item.inDepotDetail.batchId || '无', // 确保 batchId 存在
            goodKind: item.goodKind,
            upStreamFirm: item.inDepotDetail.upStreamFirm,
            origin: item.inDepotDetail.origin,
            enterWareHouse: item.inDepotDetail.enterWareHouse,
            inDepotDate: item.inDepotDetail.inDepotDate,
            harvestDate: item.inDepotDetail.harvestDate,
            inspector: item.inDepotDetail.inspector,
            custodian: item.inDepotDetail.custodian,
            description: item.inDepotDetail.description,
            amount: item.inDepotDetail.amount
          }))
          this.intermediateData = this.tableData
          this.paging(1)
          console.log('入库数据:', this.tableData)
        } else {
          this.$message.error('获取入库数据失败')
        }
      } catch (error) {
        console.error('获取入库数据时出错:', error)
        this.$message.error('请求入库数据时出错')
      } finally {
        this.loadingTable = false
      }
    },
    // 查询功能
    query() {
      this.intermediateData = this.tableData.filter(item => {
        return (
          (item.enterWareHouse === this.value || this.value === '') &&
          (item.batchId.includes(this.search) || this.search === '')
        )
      })
      this.currentPageNumber = 1
      this.paging(1)
    },
    // 分页处理
    handlePageChange(ym) {
      this.currentPageNumber = ym
      this.paging(ym)
    },
    paging(e) {
      const pageSize = 10
      const start = (e - 1) * pageSize
      const end = e * pageSize
      this.newdata = this.intermediateData.slice(start, end)
    },
    // 格式化时间戳为日期字符串
    formatTimestamp1(row, column, cellValue) {
      if (!cellValue) return ''
      const date = new Date(cellValue)
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      return Y + M + D
    },
    formatTimestamp(row, column, cellValue) {
      if (!cellValue) return ''
      const date = new Date(cellValue)
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    // 处理入库日期的变化，将其转换为时间戳
    handleInDepotDateChange(value) {
      this.form.inDepotDate = value ? Date.parse(value) : null
    },
    // 处理收获日期的变化，将其转换为时间戳
    handleHarvestDateChange(value) {
      this.form.harvestDate = value ? Date.parse(value) : null
    },
    // 处理出库日期的变化，将其转换为时间戳
    handleOutDepotDateChange(value) {
      this.chukuForm.outDepotDate = value ? Date.parse(value) : null
    },
    // 新增入库
    async newlyAdded() {
      this.$refs.xinzengForm.validate(async valid => {
        if (valid) {
          const newEntry = {
            batchId: this.form.batchId,
            goodKind: this.form.goodKind,
            upStreamFirm: this.form.upStreamFirm,
            origin: this.form.origin,
            enterWareHouse: this.form.enterWareHouse,
            inDepotDate: this.form.inDepotDate,
            harvestDate: this.form.harvestDate,
            inspector: this.form.inspector,
            custodian: this.form.custodian,
            description: this.form.description,
            amount: this.form.amount
          }
          try {
            // 新增入库
            this.loadingSubmit = true
            const result = await createInDepotInfo(newEntry)
            if (result.data.code === 1) {
              this.tableData.push(newEntry)
              this.query()
              // 重置表单
              Object.assign(this.form, {
                batchId: '',
                goodKind: '',
                upStreamFirm: '',
                origin: '',
                enterWareHouse: '',
                inDepotDate: null,
                harvestDate: null,
                inspector: '',
                custodian: '',
                description: '',
                amount: ''
              })
              this.xinzengdialogFormVisible = false
              this.$message({
                message: '入库信息保存成功',
                type: 'success'
              })
            } else {
              this.$message.error('保存入库信息失败')
            }
          } catch (error) {
            console.error('新增入库时出错:', error)
            this.$message.error('请求出错')
          } finally {
            this.loadingSubmit = false
          }
        } else {
          this.$message.error('请输入全部数据')
        }
      })
    },
    // 查看详情
    chakan(e) {
      this.currentRow = e
      this.celan = true
    },
    // 出库显示
    chukuxianshi(e) {
      this.hangshuju = e
      this.chukudialogFormVisible = true
      // 预填充出库表单数据
      this.chukuForm.batchId = e.batchId
      this.chukuForm.enterWareHouse = e.enterWareHouse
      this.chukuForm.goodKind = e.goodKind
      this.chukuForm.account = '操作员1' // 根据需要填写
    },
    // 出库操作
    chuku() {
      this.$refs.chukuForm.validate(valid => {
        if (valid) {
          const orderIndex = this.orders.findIndex(
            order =>
              order.tracingCode === this.chukuForm.tracingCode && order.status === '待出库'
          )
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = '待收货'
            localStorage.setItem('orderStatus', JSON.stringify(this.orders))
            this.$message.success('订单状态已更新！')
          } else {
            this.$message.error('未找到对应的待发货订单！')
            return
          }

          const index = this.tableData.findIndex(
            item => item.batchId === this.hangshuju.batchId
          )
          if (index !== -1) {
            this.tableData.splice(index, 1)
            this.query()
            this.chukudialogFormVisible = false
            this.$message({
              message: '出库信息保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('未找到对应的入库记录！')
          }

          // 重置出库表单
          Object.assign(this.chukuForm, {
            tracingCode: '',
            batchId: '',
            enterWareHouse: '',
            account: '',
            goodKind: '',
            amount: '',
            outDepotDate: null
          })
        } else {
          this.$message.error('表单验证失败，请检查输入内容！')
        }
      })
    }
  }
}
</script>

<style scoped>
h3 {
  margin-top: 1%;
}
.el-select {
  width: 17vw;
}

.el-input {
  width: 17vw;
}

.el-date-picker {
  width: 17vw;
}

.xiangqing {
  padding: 20px;
}

.pageNumber {
  height: 6vh;
  min-height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xingzengshuju {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}

.first,
.second,
.disi,
.form-row {
  display: flex;
  justify-content: space-between;
}

.app-container {
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.el-form-item__content {
  display: inline-block;
}

.xingzengshuju .el-form-item {
  display: flex;
  flex-direction: row;
  margin: 0;
}
</style>
