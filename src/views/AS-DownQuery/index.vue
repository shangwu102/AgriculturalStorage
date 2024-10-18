<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="chaxun">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入产品姓名">''</el-input>
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
        <el-dialog title="新增入库" :visible.sync="xinzengdialogFormVisible">
          <div class="biaodan">
            <el-form :model="form" :rules="shujujianyan" class="xingzengshuju">
              <div class="diyi">
                <el-form-item label="仓库名称" prop="repertoryName">
                  <el-select v-model="form.repertoryName" placeholder="请选择仓库">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="操作员" prop="account">
                  <el-input v-model="form.account" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="产品种类" prop="productType">
                  <el-input v-model="form.productType" autocomplete="off" />
                </el-form-item>
                <el-form-item label="合格率" prop="pass">
                  <el-input v-model="form.pass" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disan">
                <el-form-item label="产品名称" prop="productName">
                  <el-input v-model="form.productName" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库数量" prop="joinAmount">
                  <el-input v-model="form.joinAmount" autocomplete="off" />
                </el-form-item>
                <el-form-item label="入库时间" prop="createTime">
                  <el-date-picker v-model="form.createTime" type="datetime" placeholder="选择日期时间" style="width: 17vw" />
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
            <el-form-item label="订单名称" prop="orderName">
              <el-select v-model="chukuForm.orderName" placeholder="请选择订单">
                <el-option
                  v-for="order in pendingOrders"
                  :key="order.orderId"
                  :label="order.orderName"
                  :value="order.orderName"
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
export default {
  data() {
    const options = [
      {
        value: '主仓库',
        label: '主仓库'
      },
      {
        value: '辅仓库',
        label: '辅仓库'
      }
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
      {
        id: '4',
        repertoryName: '辅仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 300,
        pass: '92%',
        createTime: '2021-05-20 16:45:10',
        account: '灌溉系统1'
      },
      {
        id: '5',
        repertoryName: '主仓库',
        productType: '日用产品',
        productName: '洗发水',
        joinAmount: 180,
        pass: '88%',
        createTime: '2021-06-25 11:20:55',
        account: '灌溉系统1'
      },
      {
        id: '6',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 220,
        pass: '91%',
        createTime: '2021-07-30 08:50:25',
        account: '灌溉系统1'
      },
      {
        id: '7',
        repertoryName: '辅仓库',
        productType: '电子产品',
        productName: '耳机',
        joinAmount: 130,
        pass: '80%',
        createTime: '2021-08-05 13:05:40',
        account: '灌溉系统1'
      },
      {
        id: '8',
        repertoryName: '辅仓库',
        productType: '日用产品',
        productName: '牙刷',
        joinAmount: 175,
        pass: '89%',
        createTime: '2021-09-10 15:25:15',
        account: '灌溉系统1'
      },
      {
        id: '9',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '笔记本电脑',
        joinAmount: 210,
        pass: '93%',
        createTime: '2021-10-15 10:10:05',
        account: '灌溉系统1'
      },
      {
        id: '10',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
      },
      {
        id: '11',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
      },
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
      productName: '',
      joinAmount: '',
      pass: '',
      createTime: '',
      account: ''
    }
    const newrukuxxjianyan = {
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
        { required: true, message: '请输入入库数量', trigger: 'blur' }
      ],
      pass: [{ required: true, message: '请输入合格率', trigger: 'blur' }],
      createTime: [
        { required: true, message: '请输入入库时间', trigger: 'blur' }
      ],
      account: [{ required: true, message: '请输入操作账号', trigger: 'blur' }]
    }
    const chukuShujujianyan = {
      orderName: [{ required: true, message: '请选择订单名称', trigger: 'change' }],
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
        orderName: '',
        repertoryName: '',
        account: '',
        productType: '',
        pass: '',
        productName: '',
        joinAmount: '',
        createTime: ''
      },
      chukuShujujianyan: chukuShujujianyan
    }
  },
  computed: {
    // 计算待发货的订单
    pendingOrders() {
      return this.orders.filter(order => order.status === '待出库')
    },
    // 计算当前页显示的订单列表
    paginatedOrderList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
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
      const savedOrders = localStorage.getItem('orderStatus')
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders)
      } else {
        this.orders = []
      }
      console.log('加载的订单数据:', this.orders)
    },
    // 查询功能
    chaxun() {
      const newdata = []
      this.tableData.forEach((item) => {
        if (
          item.repertoryName === this.value &&
          item.productName.includes(this.sousuo)
        ) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.repertoryName === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.productName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      })
      console.log('搜索结果:', newdata)
      this.zhongjianshuju = newdata
      console.log('中间数据', this.zhongjianshuju)
      this.dangqianyema = 1
      this.fenye(1)
    },
    // 分页处理
    handlePageChange(ym) {
      console.log('当前页:', ym)
      this.currentPage = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = []
      for (let i = (e - 1) * 10; i < (e - 1) * 10 + 10; i++) {
        console.log(this.zhongjianshuju[i])
        if (this.zhongjianshuju[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        } else {
          this.newdata.push(this.zhongjianshuju[i])
        }
      }
      console.log('分页数据', this.newdata)
    },
    // 新增入库
    xinzeng() {
      if (
        this.form.repertoryName === '' ||
        this.form.productType === '' ||
        this.form.productName === '' ||
        this.form.joinAmount === '' ||
        this.form.pass === '' ||
        this.form.createTime === '' ||
        this.form.account === ''
      ) {
        this.$message.error('请输入全部数据')
      } else {
        console.log(this.form)
        this.tableData.push({
          id: this.tableData.length + 1,
          ...this.form
        })
        this.fenye(this.dangqianyema)
        console.log(this.tableData)
        this.chaxun()
        this.form = {
          repertoryName: '',
          productType: '',
          productName: '',
          joinAmount: '',
          pass: '',
          createTime: '',
          account: ''
        }
        this.xinzengdialogFormVisible = false
        this.$message({
          message: '入库信息保存成功',
          type: 'success'
        })
      }
    },
    // 查看详情
    chakan(e) {
      this.celan = true
      console.log(e)
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
      console.log('出库行数据:', this.hangshuju)
      // 验证出库表单
      this.$refs.chukuForm.validate((valid) => {
        if (valid) {
          // 从订单列表中找到对应的订单并更新状态
          const orderIndex = this.orders.findIndex(
            (order) => order.orderName === this.chukuForm.orderName && order.status === '待出库'
          )
          if (orderIndex !== -1) {
            // 更新订单状态为已发货
            this.orders[orderIndex].status = '待收货'
            // 保存更新后的订单列表到 localStorage
            localStorage.setItem('orderStatus', JSON.stringify(this.orders))
            this.$message.success('订单状态已更新！')
          } else {
            this.$message.error('未找到对应的待发货订单！')
            return
          }

          // 更新出库记录
          if (
            this.chukuForm.joinAmount === '' ||
            this.chukuForm.pass === '' ||
            this.chukuForm.createTime === ''
          ) {
            this.$message.error('请输入全部出库数据')
          } else {
            console.log('当前行的数据', this.hangshuju)
            // 使用 orderId 而不是 id 以确保唯一性
            const index = this.tableData.findIndex(item => item.id === this.hangshuju.id)
            if (index !== -1) {
              // 移除出库后的入库记录
              this.tableData.splice(index, 1)
              console.log(this.dangqianyema)
              this.fenye(this.dangqianyema)
              console.log(this.tableData)
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
            this.chukuForm = {
              orderName: '',
              repertoryName: '',
              account: '',
              productType: '',
              pass: '',
              productName: '',
              joinAmount: '',
              createTime: ''
            }
          }
        } else {
          this.$message.error('表单验证失败，请检查输入内容！')
          return false
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
  /* border: 1px solid red; */
  /* position: absolute;
  bottom: 0px ; */
  /* left: 40vw; */
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
  /* width: 90%; */
}

.el-input {
  width: 17vw;
}

.diyi {
  display: flex;
  justify-content: space-between;
}

.dier {
  display: flex;
  justify-content: space-between;
}

.disan .el-input {
  width: calc(50vw - 160px);
}

.disi {
  display: flex;
  justify-content: space-between;
}

.app-container {
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid red; */
}

.el-form-item__content {
  display: inline-block;
}

.xingzengshuju .el-form-item {
  display: flex;
  flex-direction: row;
  margin: 0;
}

/* .el-dialog {
  margin-bottom: 0;
  border: 55px;
  box-shadow: 9px 5px 8px red !important;
  -webkit-box-shadow:0 !important;
} */
</style>
