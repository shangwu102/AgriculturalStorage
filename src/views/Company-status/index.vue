<template>
  <div class="order-status-container">
    <el-card class="order-status-card" shadow="hover">
      <div v-if="orders && orders.length">
        <!-- 使用 el-row 和 el-col 来实现每行两个订单 -->
        <el-row :gutter="20">
          <el-col v-for="(order, index) in orders" :key="index" :span="12">
            <el-card class="order-item-card">
              <el-steps :active="getActiveStep(order.status)" finish-status="success" align-center>
                <el-step title="待接单" :status="getStepStatus(order.status, 0)" />
                <el-step title="待发货" :status="getStepStatus(order.status, 1)" />
                <el-step title="已发货" :status="getStepStatus(order.status, 2)" />
                <el-step title="已完成" :status="getStepStatus(order.status, 3)" />
              </el-steps>
              <div class="status-info">
                <p><strong>订单名称：</strong>{{ order.orderName }}</p>
                <p><strong>粮食品种：</strong>{{ order.grainType }}</p>
                <p><strong>需求数量：</strong>{{ order.quantity }} 吨</p>
                <p><strong>交货日期：</strong>{{ order.deliveryDate }}</p>
                <p :style="{ color: getStatusColor(order.status) }"><strong>当前状态：</strong>{{
                  steps[getActiveStep(order.status)] }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <p>暂无订单状态。</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: ['待接单', '待发货', '已发货', '已完成'],
      orders: []
    }
  },
  mounted() {
    // 从 localStorage 获取存储的订单数组
    const savedOrders = localStorage.getItem('orderStatus')
    if (savedOrders) {
      // 如果有订单数据，将其解析为数组
      this.orders = JSON.parse(savedOrders)
    } else {
      // 如果没有数据，初始化为空数组
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
      // 根据订单状态返回不同的颜色
      switch (status) {
        case '待接单':
          return 'orange'
        case '待发货':
          return 'blue'
        case '已发货':
          return 'green'
        case '已完成':
          return 'gray'
        default:
          return 'black'
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

.order-item-card {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #ffffff;
  height: 100%;
}

.status-info {
  margin-top: 20px;
}

/* 控制滚动条样式（可选） */
.order-status-container::-webkit-scrollbar {
  width: 8px;
}

.order-status-container::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}
</style>

