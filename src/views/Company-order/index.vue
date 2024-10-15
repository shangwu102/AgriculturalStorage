<template>
  <div class="company-orders">
    <!-- 发布粮食需求订单的表单 -->
    <el-form :model="orderForm" label-width="120px" class="order-form">
      <el-form-item label="订单名称">
        <el-input v-model="orderForm.orderName" placeholder="请输入订单名称" />
      </el-form-item>
      <el-form-item label="需求量 (吨)">
        <el-input-number v-model="orderForm.quantity" :min="1" />
      </el-form-item>
      <el-form-item label="交货日期">
        <el-date-picker v-model="orderForm.deliveryDate" type="date" placeholder="请选择交货日期" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitOrder">发布订单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderForm: {
        orderName: '',
        quantity: 1,
        deliveryDate: ''
      },
      orders: [] // 已发布的订单列表
    }
  },
  methods: {
    submitOrder() {
      // 添加订单到订单列表
      if (this.orderForm.orderName && this.orderForm.quantity && this.orderForm.deliveryDate) {
        this.orders.push({
          orderName: this.orderForm.orderName,
          quantity: this.orderForm.quantity,
          deliveryDate: this.orderForm.deliveryDate,
          status: '待处理' // 默认订单状态为待处理
        })

        // 清空表单
        this.orderForm.orderName = ''
        this.orderForm.quantity = 1
        this.orderForm.deliveryDate = ''

        this.$message({
          message: '订单发布成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: '请完整填写表单！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.company-orders {
  padding: 20px;
}

.order-form {
  margin-bottom: 20px;
}
</style>
