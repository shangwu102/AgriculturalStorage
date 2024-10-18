<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="chaxun">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入产品姓名" />
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
        <!-- 弹框 -->
        <el-dialog title="新增入库" :visible.sync="xinzengdialogFormVisible" width="60vw">
          <div class="biaodan">
            <el-form ref="xinzengForm" :model="form" :rules="shujujianyan" class="xingzengshuju">
              <div class="diyi">
                <el-form-item label="仓库名称" prop="repertoryName">
                  <el-select v-model="form.repertoryName" placeholder="请选择仓库">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="粮食种类" prop="productType">
                  <el-select v-model="form.productType" placeholder="请选择粮食种类">
                    <el-option v-for="item in productTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="粮食产地" prop="productOrigin">
                  <el-input v-model="form.productOrigin" autocomplete="off" />
                </el-form-item>
                <el-form-item label="上游企业链上地址" prop="pass">
                  <el-input v-model="form.pass" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="检测人员" prop="inspector">
                  <el-input v-model="form.inspector" autocomplete="off" />
                </el-form-item>
                <el-form-item label="保管人员" prop="storagePerson">
                  <el-input v-model="form.storagePerson" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库日期" prop="storageDate">
                  <el-date-picker v-model="form.storageDate" type="datetime" placeholder="选择日期时间" style="width: 17vw" />
                </el-form-item>
                <el-form-item label="上游企业收获日期" prop="harvestDate">
                  <el-date-picker v-model="form.harvestDate" type="datetime" placeholder="选择日期时间" style="width: 17vw" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库数量" prop="joinAmount">
                  <el-input v-model="form.joinAmount" autocomplete="off" />
                </el-form-item>
                <el-form-item label="入库描述信息" prop="description">
                  <el-input v-model="form.description" type="textarea" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="产品名称" prop="productName">
                  <el-input v-model="form.productName" autocomplete="off" />
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
    <el-table :data="newdata" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="id" label="编号" width="130" />
      <el-table-column prop="repertoryName" label="仓库名称" width="140" />
      <el-table-column prop="productType" label="产品种类" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="joinAmount" label="入库量" />
      <el-table-column prop="pass" label="合格率" />
      <el-table-column prop="createTime" label="入库时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="chakan(scope.row)">查看</el-button>
          <el-button type="warning" size="small" @click="chukuxianshi(scope.row)">出库</el-button>
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
    <!-- 出库弹窗 -->
    <el-dialog title="新增出库" :visible.sync="chukudialogFormVisible">
      <div class="biaodan">
        <el-form ref="chukuForm" :model="chukuForm" :rules="chukuShujujianyan" class="xingzengshuju">
          <div class="form-row">
            <el-form-item label="仓库名称" prop="repertoryName">
              <el-select v-model="chukuForm.repertoryName" placeholder="请选择仓库" disabled>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="操作员" prop="account">
              <el-input v-model="chukuForm.account" disabled autocomplete="off" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="产品种类" prop="productType">
              <el-input v-model="chukuForm.productType" disabled autocomplete="off" />
            </el-form-item>
            <el-form-item label="合格率" prop="pass">
              <el-input v-model="chukuForm.pass" autocomplete="off" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="chukuForm.productName" disabled autocomplete="off" />
            </el-form-item>
          </div>
          <div class="form-row">
            <el-form-item label="出库数量" prop="joinAmount">
              <el-input v-model="chukuForm.joinAmount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="出库时间" prop="createTime">
              <el-date-picker v-model="chukuForm.createTime" type="datetime" placeholder="选择日期时间" style="width: 100%" />
            </el-form-item>
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
    <el-drawer title="库存详情" :visible.sync="celan" direction="rtl" size="40%">
      <div class="xiangqing">
        <h3 class="el-icon-s-order">产品信息</h3>
        <el-table :data="gridData">
          <el-table-column property="date" label="企业名称" />
          <el-table-column property="name" label="产品编号" />
          <el-table-column property="address" label="产品名称" />
          <el-table-column property="address" label="产品种类" />
          <el-table-column property="address" label="仓库名称" />
          <el-table-column property="address" label="库存" />
        </el-table>
        <h3 class="el-icon-s-order">入库记录</h3>
        <el-table :data="gridData">
          <el-table-column property="date" label="企业名称" />
          <el-table-column property="name" label="产品编号" />
          <el-table-column property="address" label="产品名称" />
          <el-table-column property="address" label="产品种类" />
          <el-table-column property="address" label="仓库名称" />
          <el-table-column property="address" label="库存" />
        </el-table>
        <h3 class="el-icon-s-order">出库记录</h3>
        <el-table :data="gridData">
          <el-table-column property="date" label="企业名称" />
          <el-table-column property="name" label="产品编号" />
          <el-table-column property="address" label="产品名称" />
          <el-table-column property="address" label="产品种类" />
          <el-table-column property="address" label="仓库名称" />
          <el-table-column property="address" label="库存" />
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getOrder } from '@/utils/order'

export default {
  data() {
    const options = [
      { value: '主仓库', label: '主仓库' },
      { value: '辅仓库', label: '辅仓库' }
    ]
    const productTypes = [
      { value: '粮食', label: '粮食' },
      { value: '电子产品', label: '电子产品' },
      { value: '家电', label: '家电' },
      { value: '日用产品', label: '日用产品' }
      // 添加更多粮食种类
    ]
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
      // 其他数据...
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
      productOrigin: '',
      pass: '',
      inspector: '',
      storagePerson: '',
      storageDate: '',
      harvestDate: '',
      joinAmount: '',
      description: '',
      productName: '' // 添加 productName
    }
    const newrukuxxjianyan = {
      repertoryName: [
        { required: true, message: '请输入仓库名称', trigger: 'blur' }
      ],
      productType: [
        { required: true, message: '请输入粮食种类', trigger: 'blur' }
      ],
      productOrigin: [
        { required: true, message: '请输入粮食产地', trigger: 'blur' }
      ],
      pass: [
        { required: true, message: '请输入合格率', trigger: 'blur' }
      ],
      inspector: [
        { required: true, message: '请输入检测人员', trigger: 'blur' }
      ],
      storagePerson: [
        { required: true, message: '请输入保管人员', trigger: 'blur' }
      ],
      storageDate: [
        { required: true, message: '请输入入库日期', trigger: 'change' }
      ],
      harvestDate: [
        { required: true, message: '请输入收获日期', trigger: 'change' }
      ],
      joinAmount: [
        { required: true, message: '请输入入库数量', trigger: 'blur' }
      ],
      description: [
        { required: true, message: '请输入入库描述信息', trigger: 'blur' }
      ],
      productName: [ // 添加 productName 的验证
        { required: true, message: '请输入产品名称', trigger: 'blur' }
      ]
    }
    const chukuShujujianyan = {
      tracingCode: [{ required: true, message: '请选择订单名称', trigger: 'change' }],
      repertoryName: [
        { required: true, message: '请输入仓库名称', trigger: 'blur' }
      ],
      productType: [
        { required: true, message: '请输入产品类型', trigger: 'blur' }
      ],
      productName: [
        { required: true, message: '请输入产品名称', trigger: 'blur' }
      ],
      joinAmount: [
        { required: true, message: '请输入出库数量', trigger: 'blur' }
      ],
      pass: [{ required: true, message: '请输入合格率', trigger: 'blur' }],
      createTime: [
        { required: true, message: '请输入出库时间', trigger: 'blur' }
      ],
      account: [{ required: true, message: '请输入操作账号', trigger: 'blur' }]
    }
    const gridData = []
    return {
      options: options,
      productTypes: productTypes,
      value: '',
      sousuo: '',
      tableData: tableData,
      newdata: [],
      zhongjianshuju: '',
      xinzengdialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      dangqianyema: 1,
      celan: false,
      chukudialogFormVisible: false,
      gridData: gridData,
      hangshuju: '',
      // 新增出库相关
      chukuForm: {
        tracingCode: '',
        repertoryName: '',
        account: '',
        productType: '',
        pass: '',
        productName: '',
        joinAmount: '',
        createTime: ''
      },
      chukuShujujianyan: chukuShujujianyan,
      orders: [] // 添加 orders 数据
    }
  },
  computed: {
    // 计算待发货的订单
    pendingOrders() {
      return this.orders.filter(order => order.status === '待出库')
    },
    // 计算当前页显示的订单列表
    paginatedOrderList() {
      const start = (this.dangqianyema - 1) * 10
      const end = this.dangqianyema * 10
      return this.tableData.slice(start, end)
    }
  },
  created() {
    this.huqushuju()
    this.chaxun()
    this.loadOrders() // 加载订单数据
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
      this.tableData.forEach((item) => {
        if (
          (item.repertoryName === this.value || this.value === '') &&
          ((item.productName && item.productName.includes(this.sousuo)) || this.sousuo === '')
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
    // 新增入库
    xinzeng() {
      this.$refs.xinzengForm.validate((valid) => {
        if (valid) {
          const newEntry = {
            id: this.tableData.length + 1,
            repertoryName: this.form.repertoryName,
            productType: this.form.productType,
            productOrigin: this.form.productOrigin,
            pass: this.form.pass,
            inspector: this.form.inspector,
            storagePerson: this.form.storagePerson,
            storageDate: this.form.storageDate,
            harvestDate: this.form.harvestDate,
            joinAmount: this.form.joinAmount,
            description: this.form.description,
            productName: this.form.productName, // 确保添加 productName
            account: '灌溉系统1' // 或其他逻辑
          }
          this.tableData.push(newEntry)
          this.fenye(this.dangqianyema)
          this.chaxun()
          // 重置表单
          Object.assign(this.form, {
            repertoryName: '',
            productType: '',
            productOrigin: '',
            pass: '',
            inspector: '',
            storagePerson: '',
            storageDate: '',
            harvestDate: '',
            joinAmount: '',
            description: '',
            productName: '' // 重置 productName
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
      this.celan = true
      console.log(e)
      // 这里可以加载详细信息到 gridData
    },
    // 出库显示
    chukuxianshi(e) {
      this.hangshuju = e
      this.chukudialogFormVisible = true
      // 预填充出库表单数据
      this.chukuForm.repertoryName = e.repertoryName
      this.chukuForm.productType = e.productType
      this.chukuForm.productName = e.productName
      this.chukuForm.account = e.account
    },
    // 出库操作
    chuku() {
      this.$refs.chukuForm.validate((valid) => {
        if (valid) {
          const orderIndex = this.orders.findIndex(
            (order) => order.tracingCode === this.chukuForm.tracingCode && order.status === '待出库'
          )
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = '待收货'
            localStorage.setItem('orderStatus', JSON.stringify(this.orders))
            this.$message.success('订单状态已更新！')
          } else {
            this.$message.error('未找到对应的待发货订单！')
            return
          }

          if (
            this.chukuForm.joinAmount === '' ||
            this.chukuForm.pass === '' ||
            this.chukuForm.createTime === ''
          ) {
            this.$message.error('请输入全部出库数据')
          } else {
            const index = this.tableData.findIndex(item => item.id === this.hangshuju.id)
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
              repertoryName: '',
              account: '',
              productType: '',
              pass: '',
              productName: '',
              joinAmount: '',
              createTime: ''
            })
          }
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

.el-input {
  width: 17vw;
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
