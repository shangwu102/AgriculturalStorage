<template>
  <div class="app-container">
    <el-form :inline="true" :model="a" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="chaxun">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入产品ID">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜素</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="xinzeng" type="success" icon="el-icon-plus" @click="dialogFormVisible = true">新增入库</el-button>
        <!-- 弹框 -->
        <el-dialog title="新增入库" :visible.sync="dialogFormVisible">
          <div class="biaodan">
            <el-form :model="form" :rules="shujujianyan" class="xingzengshuju">
              <div class="diyi">
                <el-form-item label="仓库名称" :label-width="formLabelWidth" prop="repertoryName">
                  <el-select v-model="form.repertoryName" placeholder="请选择仓库">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="操作员" :label-width="formLabelWidth" prop="account">
                  <el-input v-model="form.account" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="dier">
                <el-form-item label="产品种类" :label-width="formLabelWidth" prop="productType">
                  <el-input v-model="form.productType" autocomplete="off" />
                </el-form-item>
                <el-form-item label="合格率" :label-width="formLabelWidth" prop="pass">
                  <el-input v-model="form.pass" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disan">
                <el-form-item label="产品名称" :label-width="formLabelWidth" prop="productName">
                  <el-input v-model="form.productName" autocomplete="off" />
                </el-form-item>
              </div>
              <div class="disi">
                <el-form-item label="入库数量" :label-width="formLabelWidth" prop="joinAmount">
                  <el-input v-model="form.joinAmount" autocomplete="off" />
                </el-form-item>
                <el-form-item label="入库时间" :label-width="formLabelWidth" prop="createTime">
                  <el-date-picker
                    v-model="form.createTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width: 17vw;"
                  />
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="xingzeng">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-table
      :data="newdata"
      height="75vh"
      style="width: 100%"
      border
      :row-style="{height: '62.4px'}"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="130"
      />
      <el-table-column
        prop="repertoryName"
        label="仓库名称"
        width="180"
      />
      <el-table-column
        prop="productType"
        label="产品种类"
      />
      <el-table-column
        prop="productName"
        label="产品名称"
      />
      <el-table-column
        prop="joinAmount"
        label="入库量"
      />
      <el-table-column
        prop="pass"
        label="合格率"
      />
      <el-table-column
        prop="createTime"
        label="入库时间"
      />
      <el-table-column
        prop="account"
        label="操作员"
      />
      <!-- <el-table-column
        label="操作"
      >
        <template>
          <el-button
            type="primary"
            size="small"
            @click="table = true"
          >查看</el-button>
        </template>
        <el-drawer
          title="我嵌套了表格!"
          :visible.sync="table"
          direction="rtl"
          size="30%"
          modal="false"
        >
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150" />
            <el-table-column property="name" label="姓名" width="200" />
            <el-table-column property="address" label="地址" />
          </el-table>
        </el-drawer>
      </el-table-column> -->
    </el-table>
    <div class="yema">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const options = [{
      value: '主仓库',
      label: '主仓库'
    }, {
      value: '辅仓库',
      label: '辅仓库'
    }]
    const tableData = [
      {
        id: '1',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '手机',
        joinAmount: 150,
        pass: '90%',
        createTime: '2021-02-05 12:00:00',
        account: '灌溉系统1'
      },
      {
        id: '2',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '手机',
        joinAmount: 200,
        pass: '95%',
        createTime: '2021-03-10 14:30:45',
        account: '灌溉系统1'
      },
      {
        id: '3',
        repertoryName: '辅仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 250,
        pass: '85%',
        createTime: '2021-04-15 09:15:30',
        account: '灌溉系统1'
      },
      {
        id: '4',
        repertoryName: '辅仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 300,
        pass: '92%',
        createTime: '2021-05-20 16:45:10',
        account: '灌溉系统1'
      },
      {
        id: '5',
        repertoryName: '主仓库',
        productType: '日用产品',
        productName: '洗发水',
        joinAmount: 180,
        pass: '88%',
        createTime: '2021-06-25 11:20:55',
        account: '灌溉系统1'
      },
      {
        id: '6',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '洗衣机',
        joinAmount: 220,
        pass: '91%',
        createTime: '2021-07-30 08:50:25',
        account: '灌溉系统1'
      },
      {
        id: '7',
        repertoryName: '辅仓库',
        productType: '电子产品',
        productName: '耳机',
        joinAmount: 130,
        pass: '80%',
        createTime: '2021-08-05 13:05:40',
        account: '灌溉系统1'
      },
      {
        id: '8',
        repertoryName: '辅仓库',
        productType: '日用产品',
        productName: '牙刷',
        joinAmount: 175,
        pass: '89%',
        createTime: '2021-09-10 15:25:15',
        account: '灌溉系统1'
      },
      {
        id: '9',
        repertoryName: '主仓库',
        productType: '电子产品',
        productName: '笔记本电脑',
        joinAmount: 210,
        pass: '93%',
        createTime: '2021-10-15 10:10:05',
        account: '灌溉系统1'
      },
      {
        id: '10',
        repertoryName: '主仓库',
        productType: '家电',
        productName: '电视',
        joinAmount: 250,
        pass: '96%',
        createTime: '2021-11-20 17:40:50',
        account: '灌溉系统1'
      }
    ]
    const newrukuxx = {
      repertoryName: '',
      productType: '',
      productName: '',
      joinAmount: '',
      pass: '',
      createTime: '',
      account: ''
    }
    const newrukuxxjianyan = {
      repertoryName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
      productType: [{ required: true, message: '请输入产品类型', trigger: 'blur' }],
      productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
      joinAmount: [{ required: true, message: '请输入入库数量', trigger: 'blur' }],
      pass: [{ required: true, message: '请输入合格率', trigger: 'blur' }],
      createTime: [{ required: true, message: '请输入入库时间', trigger: 'blur' }],
      account: [{ required: true, message: '请输入操作账号', trigger: 'blur' }]
    }
    return {
      options: options,
      value: '',
      sousuo: '',
      tableData: tableData,
      newdata: tableData,
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true
    }
  },
  methods: {
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.repertoryName === this.value && item.productName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.repertoryName === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      },
      console.log(newdata)
      )
      this.newdata = newdata
    },
    xingzeng() {
      this.newdata.push({
        id: this.newdata.length + 1,
        ...this.form
      })
      console.log(this.newdata)
      this.dialogFormVisible = false
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
.xingzengshuju{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  /* width: 90%; */
}
.el-input {
  width: 17vw;
}
.diyi{
  display: flex;
  justify-content: space-between;
}
.dier{
  display: flex;
  justify-content: space-between;

}
.disan input{
  width: 40vw;
}
.disi{
  display: flex;
  justify-content: space-between;
}
.app-container{
  height: calc(100vh - 50px);
  /* border: 1px solid red; */
}
</style>
