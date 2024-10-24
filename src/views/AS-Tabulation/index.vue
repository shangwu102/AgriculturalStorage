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
      <div v-if="dataList.length === 0" class="no-data-message">
        暂无仓库信息，请添加仓库信息
      </div>
      <div v-else>
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
        <el-form-item label="仓库位置" prop="location">
          <el-input v-model="formData.location" />
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

        <!-- 仓库位置 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>位置:</strong></el-col>
          <el-col :span="16">{{ selectedItem.location }}</el-col>
        </el-row>
        <el-divider />

        <!-- 仓库描述 -->
        <el-row class="drawer-row">
          <el-col :span="8"><strong>描述:</strong></el-col>
          <el-col :span="16">{{ selectedItem.description }}</el-col>
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
import axios from 'axios' // 导入 axios
import { getDepotInfoByName } from '@/api/Store'

export default {
  data() {
    return {
      searchQuery: '',
      drawerVisible: false, // 控制Drawer显示
      selectedItem: null, // 存储选中的仓库信息
      dialogVisible: false, // 添加仓库
      dataList: [], // 初始化为空数组
      formData: {
        depotId: '',
        name: '',
        location: '',
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
        location: [
          { required: true, message: '请输入仓库位置', trigger: 'blur' }
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
  created() {
    // 在组件加载时，从后端 API 加载仓库数据
    this.loadWarehouseData()
  },
  methods: {
    async loadWarehouseData() {
      try {
        const response = await getDepotInfoByName()
        console.log(response)
        if (response.data.code === 1) {
          const apiData = response.data.data
          console.log(apiData)

          if (apiData && apiData.length > 0) {
            this.dataList = apiData
          } else {
            // API 没有返回数据
            this.dataList = []
          }
        } else {
          console.error('获取仓库数据失败:', response.statusText)
          this.dataList = []
        }
      } catch (error) {
        console.error('获取仓库数据失败:', error)
        this.dataList = []
      }
    },
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
    async submitForm() {
      this.$refs.warehouseForm.validate(async(valid) => {
        if (valid) {
          // 添加新仓库的数据
          const newWarehouse = {
            depotId: this.formData.depotId,
            name: this.formData.name,
            location: this.formData.location,
            description: this.formData.description,
            creationTime: this.formatDateTime(this.formData.creationTime),
            img: this.formData.img || 'https://hiwcq.oss-cn-beijing.aliyuncs.com/10%E4%BB%93%E5%BA%93%E3%80%81%E4%BB%93%E5%82%A8.png' // 默认图片
          }
          // 调用API存储仓库信息
          try {
            const response = await axios.post('/api/warehouses', newWarehouse) // 根据实际 API 端点修改
            if (response.status === 201 || response.status === 200) { // 根据后端实际返回的状态码调整
              const result = response.data
              // 假设后端返回新增的仓库信息，包括生成的 id
              this.dataList.push(result)
              // 关闭对话框并清空表单
              this.dialogVisible = false
              this.resetForm()
              // 提示用户
              this.$message({
                message: '仓库添加成功！',
                type: 'success'
              })
            } else {
              console.error('仓库添加失败:', response.statusText)
              this.$message.error('仓库添加失败，请稍后重试')
            }
          } catch (error) {
            console.error('API error:', error)
            this.$message.error('仓库添加失败，请稍后重试')
          }
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
        location: '',
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

/* 无数据时的提示样式 */
.no-data-message {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 50px 0;
}
</style>
