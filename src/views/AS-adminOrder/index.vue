<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryOrder">搜索</el-button>
      </el-form-item>
    </el-form>
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
        <template #default="scope">
          {{ new Date(scope.row.deliveryDate).toLocaleString() }}
        </template>
      </el-table-column>

      <!-- 订单状态 -->
      <el-table-column prop="status" label="订单状态" width="120" />

      <!-- 操作 -->
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button v-if="scope.row.status === '待审核'" type="primary" size="small" @click="agreeOrder(scope.row)">
            同意
          </el-button>
          <el-button v-else-if="scope.row.status === '待支付' || '待出库'" type="success" size="small" disabled>
            已审批✅
          </el-button>
          <el-button v-else-if="scope.row.status === '已完成'" type="success" size="small" disabled>
            已完成✅
          </el-button>
          <el-button v-else-if="scope.row.status === '已关闭'" type="danger" size="small" disabled>
            已关闭❎
          </el-button>
          <el-button v-if="scope.row.status === '待审核'" type="danger" size="small" @click="cancelOrder(scope.row)">
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
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
      <template #footer>
        <el-button @click="agreeDialogVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!currentOrder" @click="confirmAgreeOrder">确认</el-button>
      </template>
    </el-dialog>

    <!-- 取消订单的确认对话框 -->
    <el-dialog title="取消订单" :visible.sync="cancelDialogVisible" width="30%">
      <span v-if="currentOrder">确认取消订单：{{ currentOrder.orderName }}?</span>
      <template #footer>
        <el-button @click="cancelDialogVisible = false">关闭</el-button>
        <el-button type="danger" :disabled="!currentOrder" @click="confirmCancelOrder">确认取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [], // 订单列表
      filteredOrderList: [], // 根据订单名称过滤后的订单列表
      loading: true, // 加载状态
      agreeDialogVisible: false, // 同意订单对话框状态
      cancelDialogVisible: false, // 取消订单对话框状态
      currentOrder: null, // 当前操作的订单
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      name: '' // 查询订单的名称
    }
  },
  computed: {
    // 计算当前页显示的订单列表，并将 "待接单" 的订单排在前面
    paginatedOrderList() {
      const sortedOrders = [...this.filteredOrderList].sort((a, b) => {
        if (a.status === '待审核' && b.status !== '待审核') {
          return -1
        } else if (a.status !== '待审核' && b.status === '待审核') {
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
        this.filteredOrderList = orders // 默认展示全部订单
        this.total = this.filteredOrderList.length
      } catch (error) {
        this.$message.error('加载订单失败！')
      } finally {
        this.loading = false
      }
    },

    // 查询订单，根据订单名称过滤
    queryOrder() {
      if (this.name.trim() === '') {
        this.filteredOrderList = this.orderList // 如果查询条件为空，则显示全部订单
      } else {
        this.filteredOrderList = this.orderList.filter(order =>
          order.orderName.includes(this.name.trim())
        )
      }
      this.total = this.filteredOrderList.length // 更新总条目数
      this.currentPage = 1 // 重置分页到第一页
    },

    // 同意订单操作
    agreeOrder(order) {
      this.currentOrder = { ...order }
      this.agreeDialogVisible = true
    },

    // 确认同意订单
    confirmAgreeOrder() {
      if (this.currentOrder && this.currentOrder.status === '待审核') {
        this.currentOrder.status = '待支付'
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
      if (this.currentOrder && this.currentOrder.status === '待审核') {
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
        this.filteredOrderList = updatedOrders
        this.total = this.filteredOrderList.length
        localStorage.setItem('orderStatus', JSON.stringify(updatedOrders))
      }
    },

    // 处理页码变化
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 17vw;
}

.app-container {
  position: relative;
  height: calc(100vh - 50px);
  overflow-y: auto;
}

.pagination-container {
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-footer {
  text-align: right;
}
</style>
