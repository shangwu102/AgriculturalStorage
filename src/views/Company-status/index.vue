<template>
  <div class="order-status-container">
    <el-card class="order-status-card" shadow="hover">
      <div v-if="orders && orders.length">
        <!-- Flex container for two cards per row -->
        <div class="order-grid">
          <div v-for="(order, index) in orders" :key="index" class="order-col">
            <el-card class="order-item-card">
              <el-steps :active="getActiveStep(order.status)" finish-status="success" align-center>
                <el-step title="待接单" :status="getStepStatus(order.status, 0)" />
                <el-step title="待发货" :status="getStepStatus(order.status, 1)" />
                <el-step title="已发货" :status="getStepStatus(order.status, 2)" />
                <el-step :title="order.status === '已关闭' ? '已关闭' : '已完成'" :status="getStepStatus(order.status, 3)" />
              </el-steps>
              <div class="status-info">
                <p><strong>订单名称：</strong>{{ order.orderName }}</p>
                <p><strong>粮食品种：</strong>{{ order.grainType }}</p>
                <p><strong>需求数量：</strong>{{ order.quantity }} 吨</p>
                <p><strong>交货日期：</strong>{{ order.deliveryDate }}</p>
                <p :style="{ color: getStatusColor(order.status) }">
                  <strong>当前状态：</strong>{{ currentStatus(order.status) }}
                </p>

                <!-- 确认收到按钮 -->
                <el-button v-if="order.status === '已发货'" type="primary" size="small" style="float: right;" @click="confirmReceipt(order)">
                  确认收到
                </el-button>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div v-else>
        <p>暂无订单状态。</p>
      </div>

      <!-- 确认对话框 -->
      <el-dialog title="确认收货" :visible.sync="confirmDialogVisible" width="30%">
        <span>确认已经收到订单吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmOrderReceived">确认</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: ['待接单', '待发货', '已发货', '已完成', '已关闭'],
      orders: [],
      confirmDialogVisible: false, // 控制确认对话框的显示
      currentOrder: null // 当前要确认收货的订单
    }
  },
  mounted() {
    // 从 localStorage 获取存储的订单数组
    const savedOrders = localStorage.getItem('orderStatus')
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders)
    } else {
      this.orders = []
    }
  },
  methods: {
    getActiveStep(status) {
      switch (status) {
        case '待接单':
          return 0
        case '待发货':
          return 1
        case '已发货':
          return 2
        case '已完成':
        case '已关闭':
          return 3
        default:
          return 0
      }
    },
    getStepStatus(orderStatus, stepIndex) {
      const activeStep = this.getActiveStep(orderStatus)
      if (stepIndex < activeStep) {
        return 'finish' // 已完成的步骤
      } else if (stepIndex === activeStep) {
        return 'process' // 当前进行的步骤
      } else {
        return 'wait' // 等待中的步骤
      }
    },
    getStatusColor(status) {
      switch (status) {
        case '待接单':
          return 'orange'
        case '待发货':
          return 'blue'
        case '已发货':
          return 'green'
        case '已完成':
          return 'gray'
        case '已关闭':
          return 'red'
        default:
          return 'black'
      }
    },
    currentStatus(status) {
      if (status === '已关闭') {
        return '已关闭'
      } else {
        const index = this.getActiveStep(status)
        return this.steps[index]
      }
    },
    // 打开确认对话框
    confirmReceipt(order) {
      this.currentOrder = order
      this.confirmDialogVisible = true
    },
    // 确认收货并更新状态为已完成
    confirmOrderReceived() {
      if (this.currentOrder) {
        this.currentOrder.status = '已完成'
        // 更新 localStorage 中的订单状态
        this.updateOrderStatus(this.currentOrder)
        this.confirmDialogVisible = false
        this.$message.success('订单状态已更新为已完成！')
      }
    },
    // 更新订单状态并保存到 localStorage
    updateOrderStatus(updatedOrder) {
      const orderIndex = this.orders.findIndex(order => order.orderName === updatedOrder.orderName)
      if (orderIndex !== -1) {
        this.orders[orderIndex] = updatedOrder
        localStorage.setItem('orderStatus', JSON.stringify(this.orders))
      }
    }
  }
}
</script>

<style scoped>
.order-status-container {
  width: 100%;
  margin: 20px auto;
  max-height: 100vh;
  overflow-y: auto;
}

.order-status-card {
  margin-bottom: 5%;
  padding: 20px;
  background-color: #f9f9f9;
}

.order-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.order-col {
  width: calc(50% - 10px);
  /* Two cards per row */
}

.order-item-card {
  padding: 15px;
  background-color: #ffffff;
  height: 100%;
}

.status-info {
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.order-status-container::-webkit-scrollbar {
  width: 8px;
}

.order-status-container::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}
</style>
