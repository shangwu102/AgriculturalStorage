<template>
  <div class="order-status-container">
    <el-card class="order-status-card" shadow="hover">
      <div v-if="orders && orders.length">
        <div class="order-grid">
          <div v-for="(order, index) in orders" :key="index" class="order-col">
            <el-card class="order-item-card">

              <el-steps :active="getActiveStep(order.status)" align-center>
                <!-- 待审核 -->
                <el-step title="待审核" :status="getStepStatus(order.status, 0)" class="step-with-description">
                  <template #description>
                    <span
                      :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 0 }"
                    >
                      <!-- 如果状态是 待审核 显示 审核中，如果是除已关闭以外的显示 审核通过 如果是已关闭 显示审核未通过 -->
                      {{
                        order.status === '待审核'
                          ? '审核中'
                          : order.status === '已关闭'
                            ? '审核未通过'
                            : '审核通过'
                      }}
                    </span>
                  </template>
                </el-step>

                <!-- 如果订单状态为“已关闭”，则显示一个“已关闭”步骤 -->
                <el-step
                  v-if="order.status === '已关闭'"
                  title="已关闭"
                  :status="getStepStatus(order.status, 4)"
                  class="step-with-description"
                >
                  <template #description>
                    <span
                      :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 4 }"
                    >
                      订单已关闭
                    </span>
                  </template>
                </el-step>
                <template v-else>
                  <!-- 待支付 -->
                  <el-step title="待支付" :status="getStepStatus(order.status, 1)" class="step-with-description">
                    <template #description>
                      <span
                        :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 1 }"
                      >
                        {{ order.status === '待支付' ? '付款中' :'付款成功' }}

                      </span>
                    </template>
                  </el-step>
                  <!-- 待出库 -->
                  <el-step title="待出库" :status="getStepStatus(order.status, 2)" class="step-with-description">
                    <template #description>
                      <span
                        :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 2 }"
                      >
                        订单准备出库
                      </span>
                    </template>
                  </el-step>
                  <!-- 待收货 -->
                  <el-step title="待收货" :status="getStepStatus(order.status, 3)" class="step-with-description">
                    <template #description>
                      <span
                        :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 3 }"
                      >
                        请确认收货
                      </span>
                    </template>
                  </el-step>
                  <!-- 已完成 -->
                  <el-step title="已完成" :status="getStepStatus(order.status, 4)" class="step-with-description">
                    <template #description>
                      <span
                        :class="{ 'step-description': true, 'visible-description': getActiveStep(order.status) >= 4 }"
                      >
                        订单已完成
                      </span>
                    </template>
                  </el-step>
                </template>
              </el-steps>

              <div class="status-info">
                <p><strong>批次号&nbsp;&nbsp;&nbsp;：</strong>{{ order.tracingCode }}</p>
                <p><strong>需求数量：</strong>{{ order.weight }} 吨</p>
                <p><strong>配送地址：</strong>{{ order.deliveryAddr }}</p>
                <p :style="{ color: getStatusColor(order.status) }">
                  <strong>当前状态：</strong>{{ currentStatus(order.status) }}
                </p>

                <!-- 确认收到按钮 -->
                <el-button
                  v-if="order.status === '待收货'"
                  type="primary"
                  size="small"
                  style="float: right;"
                  @click="confirmReceipt(order)"
                >
                  确认收到
                </el-button>
                <!-- 待支付按钮 -->
                <el-button
                  v-if="order.status === '待支付'"
                  type="primary"
                  size="small"
                  style="float: right;"
                  @click="payment(order)"
                >
                  请支付金额
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
import { getOrder, setOrder } from '@/utils/order'

export default {
  data() {
    return {
      steps: ['待审核', '待支付', '待出库', '待收货', '已完成'],
      orders: [],
      confirmDialogVisible: false, // 控制确认对话框的显示
      currentOrder: null // 当前要确认收货的订单
    }
  },
  mounted() {
    // 从 localStorage 获取存储的订单数组
    const savedOrders = getOrder()
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders)
    } else {
      this.orders = []
    }
  },
  methods: {
    getActiveStep(status) {
      switch (status) {
        case '待审核':
          return 0
        case '待支付':
          return 1
        case '待出库':
          return 2
        case '待收货':
          return 3
        case '已完成':
        case '已关闭':
          return 4
        default:
          return 0
      }
    },
    getStepStatus(orderStatus, stepIndex) {
      const activeStep = this.getActiveStep(orderStatus)
      if (stepIndex < activeStep) {
        return 'finish' // 已完成的步骤
      } else if (stepIndex === activeStep) {
        if (stepIndex === 4) {
          // 处理最后一个步骤的特殊状态
          if (orderStatus === '已完成') {
            return 'success' // 显示绿色
          } else if (orderStatus === '已关闭') {
            return 'error' // 显示红色
          } else {
            return 'process' // 当前进行的步骤
          }
        } else {
          return 'process' // 当前进行的步骤
        }
      } else {
        return 'wait' // 等待中的步骤
      }
    },
    getStatusColor(status) {
      switch (status) {
        case '待审核':
          return 'orange'
        case '待支付':
          return 'blue'
        case '待出库':
          return 'blueviolet'
        case '待收货':
          return 'gray'
        case '已完成':
          return 'green'
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
        this.$message.success('订单状态已更新！')
      }
    },
    // 更新订单状态并保存到 localStorage
    updateOrderStatus(updatedOrder) {
      const orderIndex = this.orders.findIndex(order => order.tracingCode === updatedOrder.tracingCode)
      if (orderIndex !== -1) {
        this.orders[orderIndex] = updatedOrder
        setOrder(this.orders)
      }
    },
    payment(order) {
      const orderIndex = this.orders.findIndex(o => o.tracingCode === order.tracingCode)
      if (orderIndex !== -1) {
        this.orders[orderIndex].status = '待出库'
        setOrder(this.orders)
        this.$message.success('订单状态已更新')
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

.step-with-description {
  position: relative;
}

.step-description {
  position: absolute;
  left: 60%;
  /* 控制描述文字距离步骤的距离 */
  top: 0;
  transform: translateY(-50%);
  white-space: nowrap;
  color: #333;
  font-size: 11px;
  display: none;
  /* 初始隐藏 */
}

.visible-description {
  display: inline-block;
  /* 激活状态或已完成时显示 */
}
</style>
