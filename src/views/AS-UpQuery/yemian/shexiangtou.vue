<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
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
        <el-input v-model="sousuo" placeholder="请输入摄像头名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜素</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :key="newdata.id"
      :data="newdata"
      style="width: 100%"
      border
      :row-style="{height: '64px'}"
    >
      <el-table-column
        prop="icon"
        label="图标"
        width="130"
      />
      <el-table-column
        prop="camera_name"
        label="摄像头名称"
        width="130"
      />
      <el-table-column
        prop="camera_url"
        label="摄像头URL"
        width="130"
      />
      <el-table-column
        prop="channel"
        label="通道"
        width="130"
      />
      <el-table-column
        prop="username"
        label="用户名"
        width="200"
      />
      <el-table-column
        prop="password"
        label="密码"
        width="200"
      />
      <el-table-column
        prop="create_time"
        label="创建时间"
      />
      <el-table-column
        label="操作"
      >
        <template>

          <el-button size="small" type="warning">重命名</el-button>
          <el-button size="small" type="primary">视频查看</el-button>
        </template>
      </el-table-column>
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
        :total="zhongjianshuju.length"
        :current-page.sync="dangqianyema"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const options = [{
      value: 1,
      label: '通道1'
    },
    {
      value: 2,
      label: '通道2'
    },
    {
      value: 3,
      label: '通道3'
    }
    ]
    const tableData = [
      {
        'icon': 'camera1.png',
        'camera_name': '前门摄像头',
        'camera_url': '',
        'channel': 1,
        'username': 'admin1',
        'password': 'password1',
        'create_time': '2024-01-01 10:00:00'
      },
      {
        'icon': 'camera2.png',
        'camera_name': '后门摄像头',
        'camera_url': '',
        'channel': 1,
        'username': 'admin2',
        'password': 'password2',
        'create_time': '2024-01-02 11:00:00'
      },
      {
        'icon': 'camera3.png',
        'camera_name': '车库摄像头',
        'camera_url': '',
        'channel': 2,
        'username': 'admin3',
        'password': 'password3',
        'create_time': '2024-01-03 12:00:00'
      },
      {
        'icon': 'camera4.png',
        'camera_name': '大厅摄像头',
        'camera_url': '',
        'channel': 2,
        'username': 'admin4',
        'password': 'password4',
        'create_time': '2024-01-04 13:00:00'
      },
      {
        'icon': 'camera5.png',
        'camera_name': '走廊摄像头',
        'camera_url': '',
        'channel': 3,
        'username': 'admin5',
        'password': 'password5',
        'create_time': '2024-01-05 14:00:00'
      },
      {
        'icon': 'camera6.png',
        'camera_name': '楼梯摄像头',
        'camera_url': '',
        'channel': 3,
        'username': 'admin6',
        'password': 'password6',
        'create_time': '2024-01-06 15:00:00'
      },
      {
        'icon': 'camera7.png',
        'camera_name': '阳台摄像头',
        'camera_url': '',
        'channel': 1,
        'username': 'admin7',
        'password': 'password7',
        'create_time': '2024-01-07 16:00:00'
      },
      {
        'icon': 'camera8.png',
        'camera_name': '地下室摄像头',
        'camera_url': '',
        'channel': 2,
        'username': 'admin8',
        'password': 'password8',
        'create_time': '2024-01-08 17:00:00'
      },
      {
        'icon': 'camera9.png',
        'camera_name': '厨房摄像头',
        'camera_url': '',
        'channel': 3,
        'username': 'admin9',
        'password': 'password9',
        'create_time': '2024-01-09 18:00:00'
      },
      {
        'icon': 'camera10.png',
        'camera_name': '客厅摄像头',
        'camera_url': '',
        'channel': 1,
        'username': 'admin10',
        'password': 'password10',
        'create_time': '2024-01-10 19:00:00'
      },
      {
        'icon': 'camera11.png',
        'camera_name': '办公室摄像头',
        'camera_url': '',
        'channel': 2,
        'username': 'admin11',
        'password': 'password11',
        'create_time': '2024-01-11 20:00:00'
      },
      {
        'icon': 'camera12.png',
        'camera_name': '洗手间摄像头',
        'camera_url': '',
        'channel': 3,
        'username': 'admin12',
        'password': 'password12',
        'create_time': '2024-01-12 21:00:00'
      },
      {
        'icon': 'camera13.png',
        'camera_name': '花园摄像头',
        'camera_url': '',
        'channel': 1,
        'username': 'admin13',
        'password': 'password13',
        'create_time': '2024-01-13 22:00:00'
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
      newdata: [],
      zhongjianshuju: '',
      dialogFormVisible: false,
      form: newrukuxx,
      shujujianyan: newrukuxxjianyan,
      table: true,
      dangqianyema: 1,
      activeName: 'chuangganqi'
    }
  },
  created() {
    this.huqushuju()
    this.chaxun()
  },
  methods: {
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.channel === this.value && item.camera_name.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.channel === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log(newdata)
      this.zhongjianshuju = newdata
      console.log('中间', this.zhonjianshuju)
      this.dangqianyema = 1
      this.fenye(1)
    },
    handlePageChange(ym) {
      console.log(ym)
      this.currentPage = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = []
      for (let i = (e - 1) * 10; i < ((e - 1) * 10) + 10; i++) {
        console.log(this.zhongjianshuju[i])
        if (this.zhongjianshuju[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        } else {
          this.newdata.push(this.zhongjianshuju[i])
        }
      }
      console.log('分页数据', this.newdata)
    }
  }
}
</script>

<style scoped>
.el-select{
  width: 17vw;
}
.yema{
  /* border: 1px solid red; */
  /* position: absolute;
  bottom: 0px ;
  left: 40vw; */
  height: 6vh;
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
  padding: 0;
  /* position: relative; */
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid rgb(46, 251, 0); */
}
</style>
