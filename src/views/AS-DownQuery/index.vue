<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择仓库" @change="chaxun">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入批次号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="xinzeng"
          type="success"
          icon="el-icon-plus"
          @click="xinzengdialogFormVisible = true"
        >新增入库</el-button>
        <!-- 新增入库弹框 -->
        <el-dialog title="新增入库" :visible.sync="xinzengdialogFormVisible" width="60vw">
          <div class="biaodan">
            <el-form ref="xinzengForm" :model="form" :rules="shujujianyan" class="xingzengshuju">
              <div class="diyi">
                <el-form-item label="批次号" prop="batchId">
                  <el-input v-model="form.batchId" autocomplete="off" />
                </el-form-item>
                <el-form-item label="粮食种类" prop="goodKind">
                  <el-select v-model="form.goodKind" placeholder="请选择粮食种类">
                    <el-option v-for="item in productTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="粮食产地" prop="origin">
                  <el-input v-model="form.origin" autocomplete="off" />
                </el-form-item>
                <el-form-item label="上游企业链上地址" prop="upStreamFirm">
                  <el-input v-model="form.upStreamFirm" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
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
            <el-button type="primary" @click="xinzeng">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>

    <!-- 表格显示 -->
    <el-table :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="batchId" label="批次号" width="130" />
      <el-table-column prop="goodKind" label="粮食的种类" />
      <el-table-column prop="upStreamFirm" label="上游企业的区块链地址" />
      <el-table-column prop="origin" label="粮食的产地" />
      <el-table-column prop="enterWareHouse" label="入库的仓库名称" />
      <el-table-column prop="inDepotDate" label="入库日期" :formatter="formatTimestamp" />
      <el-table-column prop="harvestDate" label="粮食收获日期" :formatter="formatTimestamp" />
      <el-table-column prop="inspector" label="检测人员" />
      <el-table-column prop="custodian" label="保管人员" />
      <el-table-column prop="description" label="入库的描述信息" />
      <el-table-column prop="amount" label="入库数量" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="chakan(scope.row)">查看</el-button>
          <el-button type="warning" size="small" @click="chukuxianshi(scope.row)">出库</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="yema">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="zhongjianshuju.length"
        :current-page.sync="dangqianyema"
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
          <el-table-column prop="origin" label="粮食产地" />
          <el-table-column prop="inspector" label="检测人员" />
          <el-table-column prop="upStreamFirm" label="上游企业链上地址" />
          <el-table-column prop="harvestDate" label="收获日期" :formatter="formatTimestamp" />
          <el-table-column prop="description" label="入库描述信息" />
        </el-table>
        <h3 class="el-icon-s-order">入库记录</h3>
        <!-- 您可以在这里添加入库记录的表格 -->
        <h3 class="el-icon-s-order">出库记录</h3>
        <!-- 您可以在这里添加出库记录的表格 -->
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addGrain } from '@/api/Store'
import { getOrder } from '@/utils/order'

export default {
  data() {
    const options = [
      { value: '一号仓库', label: '一号仓库' },
      { value: '二号仓库', label: '二号仓库' },
      { value: '三号仓库', label: '三号仓库' },
      { value: '四号仓库', label: '四号仓库' },
      { value: '五号仓库', label: '五号仓库' }
    ]
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

    const tableData = [
      {
        batchId: '1',
        goodKind: '小麦',
        upStreamFirm: '上游企业1',
        origin: '黑龙江',
        enterWareHouse: '一号仓库',
        inDepotDate: Date.parse('2024-10-20 10:00:00'), // 存储为时间戳
        harvestDate: Date.parse('2024-09-15 08:00:00'),
        inspector: '张三',
        custodian: '李四',
        description: '新收获的小麦，质量优良',
        amount: 1500 // 数量以千克为单位
      },
      {
        batchId: '2',
        goodKind: '大米',
        upStreamFirm: '上游企业2',
        origin: '吉林',
        enterWareHouse: '二号仓库',
        inDepotDate: Date.parse('2024-10-19 14:30:00'),
        harvestDate: Date.parse('2024-09-10 09:00:00'),
        inspector: '王五',
        custodian: '赵六',
        description: '新收获的大米，颗粒饱满',
        amount: 2000
      }
    ]

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

    const shujujianyan = {
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
      options,
      productTypes,
      value: '',
      sousuo: '',
      tableData,
      newdata: [],
      zhongjianshuju: '',
      xinzengdialogFormVisible: false,
      form,
      shujujianyan,
      dangqianyema: 1,
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
    this.huqushuju()
    this.chaxun()
    this.loadOrders()
  },
  methods: {
    // 加载订单数据从 localStorage
    loadOrders() {
      const savedOrders = getOrder()
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      } else {
        this.orders = []
      }
    },
    // 查询功能
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (
          (item.enterWareHouse === this.value || this.value === '') &&
          ((item.batchId && item.batchId.includes(this.sousuo)) || this.sousuo === '')
        ) {
          newdata.push(item)
        }
      })
      this.zhongjianshuju = newdata
      this.dangqianyema = 1
      this.fenye(1)
    },
    // 分页处理
    handlePageChange(ym) {
      this.dangqianyema = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = this.zhongjianshuju.slice((e - 1) * 10, e * 10)
    },
    // 格式化时间戳为日期字符串
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
      if (value) {
        this.form.inDepotDate = Date.parse(value)
      } else {
        this.form.inDepotDate = null
      }
    },
    // 处理收获日期的变化，将其转换为时间戳
    handleHarvestDateChange(value) {
      if (value) {
        this.form.harvestDate = Date.parse(value)
      } else {
        this.form.harvestDate = null
      }
    },
    // 处理出库日期的变化，将其转换为时间戳
    handleOutDepotDateChange(value) {
      if (value) {
        this.chukuForm.outDepotDate = Date.parse(value)
      } else {
        this.chukuForm.outDepotDate = null
      }
    },
    // 新增入库
    async xinzeng() {
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
          // 新增入库
          const result = await addGrain(newEntry)
          console.log(result)
          this.tableData.push(newEntry)
          this.fenye(this.dangqianyema)
          this.chaxun()
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
            this.fenye(this.dangqianyema)
            this.chaxun()
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
    },
    // 获取初始数据
    huqushuju() {
      this.newdata = this.tableData
    }
  }
}
</script>

<style scoped>
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

.yema {
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

.diyi,
.dier,
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
