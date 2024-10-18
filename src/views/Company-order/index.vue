<template>
  <div class="order-container">
    <el-card class="order-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold;">发布粮食订单需求</span>
      </div>
      <el-form ref="orderForm" :model="orderForm" :rules="rules" label-width="120px" class="order-form">
        <el-form-item label="批次号" prop="tracingCode">
          <el-input v-model="orderForm.tracingCode" placeholder="请输入批次号" />
        </el-form-item>

        <el-form-item label="需求数量(吨)" prop="weight">
          <el-input-number v-model="orderForm.weight" :min="1" placeholder="请输入数量" style="width: 100%;" />
        </el-form-item>

        <el-form-item label="邮政编码" prop="postalCode">
          <el-input v-model="orderForm.postalCode" placeholder="请输入邮政编码" />
        </el-form-item>

        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="orderForm.tel" placeholder="请输入联系方式" />
        </el-form-item>

        <el-form-item label="配送地址" prop="deliveryAddr">
          <el-input v-model="orderForm.deliveryAddr" placeholder="请输入配送地址" />
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
import { getOrder, setOrder } from '@/utils/order'

export default {
  data() {
    return {
      orderForm: {
        tracingCode: '',
        quantity: null,
        weight: '',
        tel: '',
        deliveryAddr: '',
        remarks: '',
        postalCode: ''
      },
      grainOptions: [
        { value: 'wheat', label: '小麦' },
        { value: 'rice', label: '大米' },
        { value: 'corn', label: '玉米' },
        { value: 'soybean', label: '大豆' }
      ],
      rules: {
        tracingCode: [
          { required: true, message: '请输入批次号', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入需求数量', trigger: 'blur' }
        ],
        postalCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          {
            pattern: /^[0-9]{6}$/,
            message: '邮政编码格式不正确',
            trigger: 'blur'
          }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '联系方式格式不正确',
            trigger: 'blur'
          }
        ],
        deliveryAddr: [
          { required: true, message: '请输入配送地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('订单提交成功！')

          // 从 localStorage 获取现有订单数组
          let existingOrders = JSON.parse(getOrder())
          if (!existingOrders) {
            existingOrders = []
          }

          // 新订单对象
          const newOrder = {
            tracingCode: this.orderForm.tracingCode,
            status: '待审核', // 初始状态为 "待审核"
            quantity: this.orderForm.quantity,
            weight: this.orderForm.weight,
            tel: this.orderForm.tel,
            deliveryAddr: this.orderForm.deliveryAddr,
            remarks: this.orderForm.remarks
          }

          // 将新订单添加到订单数组中
          existingOrders.push(newOrder)

          // 保存更新后的订单数组到 localStorage
          setOrder(existingOrders)
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
