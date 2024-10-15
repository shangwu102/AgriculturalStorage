<template>
  <div class="app-container">
    <!-- 表格展示订单数据 -->
    <el-table :data="paginatedOrderList" style="width: 100%" border :row-style="{ height: '64px' }">
      <!-- 订单名称 -->
      <el-table-column prop="orderName" label="订单名称" />

      <!-- 粮食品种 -->
      <el-table-column prop="grainType" label="粮食品种" />

      <!-- 需求数量（吨） -->
      <el-table-column prop="quantity" label="需求数量(吨)" width="140" />

      <!-- 交货日期 -->
      <el-table-column prop="deliveryDate" label="交货日期" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.deliveryDate).toLocaleString() }}
        </template>
      </el-table-column>

      <!-- 订单状态 -->
      <el-table-column prop="status" label="订单状态" width="120" />

      <!-- 操作 -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- 同意订单按钮 -->
          <el-button v-if="scope.row.status === '待接单'" type="primary" size="small" @click="agreeOrder(scope.row)">
            同意
          </el-button>

          <!-- 已同意按钮，禁用状态 -->
          <el-button v-else-if="scope.row.status === '待发货'" type="success" size="small" disabled>
            已审批✅
          </el-button>

          <!-- 已完成按钮，禁用状态 -->
          <el-button v-else-if="scope.row.status === '已完成'" type="success" size="small" disabled>
            已审批✅
          </el-button>

          <!-- 已关闭按钮，禁用状态 -->
          <el-button v-else-if="scope.row.status === '已关闭'" type="danger" size="small" disabled>
            已审批❎
          </el-button>

          <!-- 取消订单按钮 -->
          <el-button v-if="scope.row.status === '待接单'" type="danger" size="small" @click="cancelOrder(scope.row)">
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="yema">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 同意订单的确认对话框 -->
    <el-dialog title="确认同意订单" :visible.sync="agreeDialogVisible" width="30%">
      <span v-if="currentOrder">确认同意订单：{{ currentOrder.orderName }}?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agreeDialogVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!currentOrder" @click="confirmAgreeOrder">确认</el-button>
      </div>
    </el-dialog>

    <!-- 取消订单的确认对话框 -->
    <el-dialog title="取消订单" :visible.sync="cancelDialogVisible" width="30%">
      <span v-if="currentOrder">确认取消订单：{{ currentOrder.orderName }}?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">关闭</el-button>
        <el-button type="danger" :disabled="!currentOrder" @click="confirmCancelOrder">确认取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [], // 订单列表
      loading: true, // 加载状态
      agreeDialogVisible: false, // 同意订单对话框状态
      cancelDialogVisible: false, // 取消订单对话框状态
      currentOrder: null, // 当前操作的订单
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      total: 0 // 总条数
    }
  },
  computed: {
    // 计算当前页显示的订单列表，并将 "待接单" 的订单排在前面
    paginatedOrderList() {
      const sortedOrders = [...this.orderList].sort((a, b) => {
        if (a.status === '待接单' && b.status !== '待接单') {
          return -1
        } else if (a.status !== '待接单' && b.status === '待接单') {
          return 1
        }
        return 0
      })
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return sortedOrders.slice(start, end)
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    // 从本地存储或API获取订单
    fetchOrders() {
      try {
        const orders = JSON.parse(localStorage.getItem('orderStatus')) || []
        this.orderList = orders
        this.total = this.orderList.length
        console.log(this.orderList) // 检查订单数据是否正确加载
        console.log('总条目数:', this.total) // 检查总条目数是否正确
      } catch (error) {
        this.$message.error('加载订单失败！')
      } finally {
        this.loading = false
      }
    },

    // 同意订单操作
    agreeOrder(order) {
      this.currentOrder = { ...order }
      this.agreeDialogVisible = true
    },

    // 确认同意订单
    confirmAgreeOrder() {
      if (this.currentOrder && this.currentOrder.status === '待接单') {
        this.currentOrder.status = '待发货'
        this.updateOrderStatus()
        this.agreeDialogVisible = false
        this.$message.success('订单已同意！')
      } else {
        this.$message.error('该订单无法同意！')
      }
    },

    // 取消订单操作
    cancelOrder(order) {
      this.currentOrder = { ...order }
      this.cancelDialogVisible = true
    },

    // 确认取消订单
    confirmCancelOrder() {
      if (this.currentOrder && this.currentOrder.status === '待接单') {
        this.currentOrder.status = '已关闭'
        this.updateOrderStatus()
        this.cancelDialogVisible = false
        this.$message.success('订单已取消！')
      } else {
        this.$message.error('该订单无法取消！')
      }
    },

    // 更新订单状态并保存到本地存储
    updateOrderStatus() {
      if (this.currentOrder) {
        const updatedOrders = this.orderList.map((order) =>
          order.orderName === this.currentOrder.orderName ? this.currentOrder : order
        )
        this.orderList = updatedOrders
        this.total = this.orderList.length
        localStorage.setItem('orderStatus', JSON.stringify(updatedOrders))
      }
    },

    // 处理页码变化
    handlePageChange(page) {
      this.currentPage = page
      console.log('当前页码:', this.currentPage) // 确认页码更新是否生效
    }
  }
}
</script>

<style scoped>
.app-container {
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.yema {
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-footer {
  text-align: right;
}
</style>
