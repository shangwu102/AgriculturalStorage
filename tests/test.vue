<!-- <template>
  <el-steps :active="getActiveStep(order.status)" finish-status="success" align-center>
    <el-step title="待审核" :status="getStepStatus(order.status, 0)" class="step-with-description">
      <template #description>
        <span :class="{'step-description': true, 'visible-description': getActiveStep(order.status) >= 0}">
          {{ order.status === '已完成' ? '审核通过' : '审核未通过' }}
        </span>
      </template>
    </el-step>

    <el-step title="待支付" :status="getStepStatus(order.status, 1)" class="step-with-description">
      <template #description>
        <span :class="{'step-description': true, 'visible-description': getActiveStep(order.status) >= 1}">
          付款成功
        </span>
      </template>
    </el-step>

    <el-step title="待出库" :status="getStepStatus(order.status, 2)" class="step-with-description">
      <template #description>
        <span :class="{'step-description': true, 'visible-description': getActiveStep(order.status) >= 2}">
          订单已准备出库
        </span>
      </template>
    </el-step>

    <el-step title="待收货" :status="getStepStatus(order.status, 3)" class="step-with-description">
      <template #description>
        <span :class="{'step-description': true, 'visible-description': getActiveStep(order.status) >= 3}">
          请确认收货
        </span>
      </template>
    </el-step>

    <el-step title="已完成" :status="getStepStatus(order.status, 4)" class="step-with-description">
      <template #description>
        <span :class="{'step-description': true, 'visible-description': getActiveStep(order.status) >= 4}">
          订单已完成
        </span>
      </template>
    </el-step>
  </el-steps>

</template> -->
