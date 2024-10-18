<template>
  <div class="app-container">
    <!-- 上方搜索框 -->
    <el-row class="search-row">
      <el-col :span="8" class="search-input">
        <el-input v-model="searchQuery" placeholder="请输入仓库名称或编号" />
      </el-col>
      <el-col :span="4" class="search-button">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
      <el-col :span="12" class="addwarehouse">
        <el-button type="primary" @click="openDialog">添加仓库</el-button>
      </el-col>
    </el-row>

    <!-- 下方列表框 -->
    <div class="house_data">
      <!-- 为每个仓库创建一个单独的列表 -->
      <div v-for="(item) in filteredData" :key="item.id" class="warehouse-list">
        <el-row class="align-items-center warehouse-item">
          <!-- 左边仓库信息 -->
          <el-col :span="18" class="warehouse-info">
            <strong class="warehouse-name cursor-pointer" @click="openDrawer(item)">{{ item.name }}</strong>
            <el-row>
              <el-col :span="12" class="p-2">
                <el-row class="data-row">
                  <el-col :span="8">编号:</el-col>
                  <el-col :span="16">{{ item.depotId }}</el-col>
                </el-row>
                <el-row class="data-row">
                  <el-col :span="8">建立时间:</el-col>
                  <el-col :span="16">{{ item.creationTime }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>

          <!-- 右边仓库图片 -->
          <el-col :span="6" class="info-icon">
            <el-image :src="item.img" alt="仓库图片" class="aligned-image" />
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 添加仓库弹出框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加仓库">
      <el-form ref="warehouseForm" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="仓库编号" prop="depotId">
          <el-input v-model="formData.depotId" />
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="建立时间" prop="creationTime">
          <el-date-picker v-model="formData.creationTime" type="datetime" placeholder="选择日期时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="仓库描述" prop="description">
          <el-input v-model="formData.description" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">完成</el-button>
      </span>
    </el-dialog>

    <!-- Drawer 抽屉 -->
    <el-drawer title="仓库详细信息" :visible.sync="drawerVisible" direction="rtl" size="40%">
      <div v-if="selectedItem" class="drawer-content">
        <!-- 仓库名称 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>仓库名称:</strong></el-col>
          <el-col :span="16">{{ selectedItem.name }}</el-col>
        </el-row>
        <el-divider />

        <!-- 仓库编号 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>编号:</strong></el-col>
          <el-col :span="16">{{ selectedItem.depotId }}</el-col>
        </el-row>
        <el-divider />

        <!-- 仓库描述 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>描述:</strong></el-col>
          <el-col :span="16">{{ selectedItem.description }}</el-col>
        </el-row>
        <el-divider />

        <!-- 粮食种类列表 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>粮食种类:</strong></el-col>
          <el-col :span="16">
            <ul>
              <li v-for="(kind, index) in selectedItem.goodkind" :key="index">{{ kind }}</li>
            </ul>
          </el-col>
        </el-row>
        <el-divider />

        <!-- 批次号列表 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>批次号:</strong></el-col>
          <el-col :span="16">
            <ul>
              <li v-for="(batch, index) in selectedItem.batchIds" :key="index">{{ batch }}</li>
            </ul>
          </el-col>
        </el-row>
        <el-divider />

        <!-- 建立时间 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>建立时间:</strong></el-col>
          <el-col :span="16">{{ selectedItem.creationTime }}</el-col>
        </el-row>
        <el-divider />
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      drawerVisible: false, // 控制Drawer显示
      selectedItem: null, // 存储选中的仓库信息
      dialogVisible: false, // 添加仓库
      dataList: [
        {
          id: 1,
          name: '1号仓库',
          depotId: 'WH001',
          location: '北京市朝阳区',
          description: '主要储存小麦和玉米的大型仓库。',
          goodkind: ['小麦', '玉米'],
          batchIds: ['BATCH101', 'BATCH102'],
          creationTime: '2022-02-25 17:36:41',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        },
        {
          id: 2,
          name: '2号仓库',
          depotId: 'WH002',
          location: '上海市浦东新区',
          description: '用于存放大米和大豆的中型仓库。',
          goodkind: ['大米', '大豆'],
          batchIds: ['BATCH201', 'BATCH202'],
          creationTime: '2022-02-26 17:36:41',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        },
        {
          id: 3,
          name: '3号仓库',
          depotId: 'WH003',
          location: '广州市天河区',
          description: '一个小型仓库，专用于储存油菜籽。',
          goodkind: ['油菜籽'],
          batchIds: ['BATCH301'],
          creationTime: '2022-02-27 17:36:41',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        },
        {
          id: 4,
          name: '4号仓库',
          depotId: 'WH004',
          location: '深圳市福田区',
          description: '储存小麦、大豆和玉米的多功能仓库。',
          goodkind: ['小麦', '大豆', '玉米'],
          batchIds: ['BATCH401', 'BATCH402', 'BATCH403'],
          creationTime: '2022-02-28 17:36:41',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        },
        {
          id: 5,
          name: '5号仓库',
          depotId: 'WH005',
          location: '成都市武侯区',
          description: '用于存储谷物和其他粮食作物的大型仓库。',
          goodkind: ['谷物', '小麦'],
          batchIds: ['BATCH501', 'BATCH502'],
          creationTime: '2022-03-01 10:00:00',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        },
        {
          id: 6,
          name: '6号仓库',
          depotId: 'WH006',
          location: '重庆市渝北区',
          description: '新建仓库，主要用于储存玉米。',
          goodkind: ['玉米'],
          batchIds: ['BATCH601'],
          creationTime: '2022-03-02 12:00:00',
          img: 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png'
        }
      ],
      formData: {
        depotId: '',
        name: '',
        creationTime: '',
        description: ''
      },
      formRules: {
        depotId: [
          { required: true, message: '请输入仓库编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
        creationTime: [
          { type: 'date', required: true, message: '请选择建立时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入仓库描述', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    filteredData() {
      if (!this.searchQuery.trim()) {
        return this.dataList
      }
      // 根据仓库名称或编号进行过滤（忽略大小写）
      const query = this.searchQuery.trim().toLowerCase()
      return this.dataList.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.depotId.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    handleSearch() {
      // 搜索功能已通过 computed 属性实现，此方法可以用于额外的搜索逻辑
      // 例如，记录搜索日志或触发其他操作
      console.log('搜索关键词:', this.searchQuery)
    },
    openDrawer(item) {
      this.selectedItem = item // 更新选中的仓库信息
      this.drawerVisible = true // 打开Drawer
    },
    openDialog() {
      this.dialogVisible = true
    },
    submitForm() {
      this.$refs.warehouseForm.validate((valid) => {
        if (valid) {
          // 生成新的唯一ID
          const newId = this.dataList.length
            ? Math.max(...this.dataList.map(item => item.id)) + 1
            : 1
          // 添加新仓库到 dataList
          const newWarehouse = {
            id: newId,
            name: this.formData.name,
            depotId: this.formData.depotId,
            description: this.formData.description,
            creationTime: this.formatDateTime(this.formData.creationTime),
            img: this.formData.img || 'https://hiwcq.oss-cn-beijing.aliyuncs.com/logo.png' // 默认图片
          }
          this.dataList.push(newWarehouse)
          // 关闭对话框并清空表单
          this.dialogVisible = false
          this.resetForm()
          // 提示用户
          this.$message({
            message: '仓库添加成功！',
            type: 'success'
          })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetForm() {
      this.formData = {
        depotId: '',
        name: '',
        creationTime: '',
        description: ''
      }
      this.$refs.warehouseForm.resetFields()
    },
    formatDateTime(date) {
      const pad = (n) => n < 10 ? '0' + n : n
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.search-row {
  margin-bottom: 20px;
}

.search-input {
  display: flex;
  justify-content: flex-start;
}

.search-button {
  display: flex;
  justify-content: flex-start;
}

.addwarehouse {
  text-align: right;
}

.house_data {
  border: 1px solid #ccc;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
}

.warehouse-list {
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  transition: background-color 0.3s;
}

.warehouse-list:hover {
  background-color: #f0f9ff;
}

.warehouse-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  transition: color 0.3s;
}

.warehouse-name:hover {
  color: #409eff;
}

.cursor-pointer {
  cursor: pointer;
}

.info-icon {
  text-align: right;
  font-size: 18px;
}

.aligned-image {
  vertical-align: middle;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

/* Drawer 样式 */
.drawer-content {
  padding: 20px;
}

.drawer-row {
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.drawer-row strong {
  font-size: 14px;
  color: #666;
}

.el-divider {
  margin: 35px 0;
}

/* 表单样式调整 */
.el-form-item {
  margin-bottom: 20px;
}
</style>
