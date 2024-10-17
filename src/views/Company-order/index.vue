<template>
  <div class="order-container">
    <el-card class="order-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>发布粮食订单需求</span>
      </div>
      <el-form ref="orderForm" :model="orderForm" :rules="rules" label-width="120px" class="order-form">
        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model="orderForm.orderName" placeholder="请输入订单名称" />
        </el-form-item>
        <el-form-item label="粮食品种" prop="grainType">
          <el-select v-model="orderForm.grainType" placeholder="请选择粮食品种">
            <el-option v-for="item in grainOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="需求数量(吨)" prop="quantity">
          <el-input-number v-model="orderForm.quantity" :min="1" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="交货日期" prop="deliveryDate">
          <el-date-picker v-model="orderForm.deliveryDate" type="date" placeholder="请选择交货日期" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="orderForm.remarks" type="textarea" placeholder="请输入备注信息" rows="4" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('orderForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('orderForm')">提交订单</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderForm: {
        orderName: '',
        grainType: '',
        quantity: null,
        deliveryDate: '',
        remarks: ''
      },
      grainOptions: [
        { value: 'wheat', label: '小麦' },
        { value: 'rice', label: '大米' },
        { value: 'corn', label: '玉米' },
        { value: 'soybean', label: '大豆' }
      ],
      rules: {
        orderName: [{ required: true, message: '请输入订单名称', trigger: 'blur' }],
        grainType: [{ required: true, message: '请选择粮食品种', trigger: 'change' }],
        quantity: [{ required: true, message: '请输入需求数量', trigger: 'blur' }],
        deliveryDate: [{ required: true, message: '请选择交货日期', trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success('订单提交成功！')

          // 从 localStorage 获取现有订单数组
          let existingOrders = localStorage.getItem('orderStatus')
          if (existingOrders) {
            existingOrders = JSON.parse(existingOrders)
          } else {
            existingOrders = []
          }

          // 新订单对象
          const newOrder = {
            orderName: this.orderForm.orderName,
            grainType: this.orderForm.grainType,
            status: '待审核', // 初始状态为 "待审核"
            quantity: this.orderForm.quantity,
            deliveryDate: this.orderForm.deliveryDate,
            remarks: this.orderForm.remarks
          }

          // 将新订单添加到订单数组中
          existingOrders.push(newOrder)

          // 保存更新后的订单数组到 localStorage
          localStorage.setItem('orderStatus', JSON.stringify(existingOrders))

          // 跳转到订单状态页面
          this.$router.push('/order-management/status')
        } else {
          this.$message.error('请填写完整订单信息！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.order-container {
  width: 60%;
  margin: 20px auto;
}

.order-card {
  margin-bottom: 5%;
  padding: 20px;
  background-color: #f9f9f9;
}

.order-form {
  margin-top: 20px;
}

.el-input,
.el-input-number,
.el-select,
.el-date-picker {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
