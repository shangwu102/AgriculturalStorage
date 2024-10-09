<!-- eslint-disable indent -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="form-container">
    <el-form class="custom-form">
      <el-form-item label class="form-item-inline">
        <el-row style="margin-top: 20px;">
          <el-col :span="5">
            <el-input v-model="guanjianzi" style="margin-left: 10px;" placeholder="请输入要搜索的关键字" />
          </el-col>
          <el-col :span="5" style="margin-left: 5px;">
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              />
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">搜索</el-button>
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="classList"
          height="75vh"
          style="width: 100%"
          border
          :row-style="{height: '62.4px'}"
        >
          <el-table-column
            prop="id"
            label="预警类型"
            width="130"
          />
          <el-table-column
            prop="name"
            label="预警来源"
            width="180"
          />
          <el-table-column
            prop="code"
            label="预警区域"
          />
          <el-table-column
            prop="companyCode"
            label="设备名称"
          />
          <el-table-column
            prop="companyCode"
            label="预警信息"
          />
          <el-table-column
            prop="intoTime"
            label="合格率"
          />
          <el-table-column
            prop="creationTime"
            label="时间"
          />
        </el-table>
      </el-col>
    </el-row>
    <el-pagination
      class="yema"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      classList: [{ id: 1, name: '高标小麦-1号仓库', code: '42', companyCode: '37', creationTime: '2022-02-25 17:36:41', intoTime: '2024-02-25 17:36:41' },
        { id: 2, name: '高标玉米-2号仓库', code: '43', companyCode: '38', creationTime: '2022-02-26 17:36:41', intoTime: '2024-02-26 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' }
      ],
      classname: '',
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            // eslint-disable-next-line indent
              start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.yema{
  /* border: 1px solid red; */
  height: 8vh;
  min-height:6vh ;
  display: flex;
  justify-content: center;
  align-items:center;
}
</style>
