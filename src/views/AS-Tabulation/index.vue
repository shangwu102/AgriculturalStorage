<template>
  <div class="app-container">
    <!-- 上方搜索框 -->
    <div class="row justify-content-between">
      <input v-model="searchQuery" type="text" class="form-control col-3 m-2" placeholder="请输入仓库名称或编号">
      <button class="btn btn-info m-2" style="position: relative; right: 70%;" @click="handleSearch">搜索</button>
    </div>

    <!-- 下方列表框 -->
    <div class="house_data mt-4 p-3">
      <!-- 为每个仓库创建一个单独的列表 -->
      <div v-for="(item) in filteredData" :key="item.id" class="warehouse-list">
        <div class="row align-items-center">
          <div class="col-3 pl-3 pb-3 cursor-pointer" @click="goToFixedPage(item.id)">
            <strong>仓库名称：{{ item.name }}</strong>
          </div>
          <div class="col-2 offset-6 pl-3 pb-3 d-flex justify-content-end cursor-pointer" @click="goToFixedPage(item.id)">
            <strong aria-label="更多信息">></strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="row p-2"><span class="col">编号</span><span class="col">{{ item.code }}</span></div>
            <div class="row p-2"><span class="col">公司编号</span><span class="col">{{ item.companyCode }}</span></div>
            <div class="row p-2"><span class="col">建立时间</span><span class="col">{{ item.creationTime }}</span></div>
            <div class="row p-2"><span class="col">录入时间</span><span class="col">{{ item.intoTime }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      dataList: [
        { id: 1, name: '高标小麦-1号仓库', code: '42', companyCode: '37', creationTime: '2022-02-25 17:36:41', intoTime: '2024-02-25 17:36:41' },
        { id: 2, name: '高标玉米-2号仓库', code: '43', companyCode: '38', creationTime: '2022-02-26 17:36:41', intoTime: '2024-02-26 17:36:41' },
        { id: 3, name: '高标花生-3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' }
        // 仓库数据
      ]
    }
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.dataList
      }
      // 根据仓库名称或编号进行过滤
      return this.dataList.filter(item =>
        item.name.includes(this.searchQuery) ||
        item.code.includes(this.searchQuery)
      )
    }
  },
  methods: {
    handleSearch() {
      console.log('Searching for:', this.searchQuery)
      // 添加其他逻辑API调用
    },
    goToFixedPage(id) {
      this.$router.push({ path: `/fixed-page/` })
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.house_data {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.warehouse-list {
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.row {
  border-bottom: 1px solid #eee;
}

.row:last-child {
  border-bottom: none;
}

.col {
  display: inline-block;
  margin-right: 10px;
}

.col-3 {
  width: 25%;
}

.cursor-pointer {
  cursor: pointer;
  transition: color 0.3s;
}

.cursor-pointer:hover {
  color: #007bff;
}
</style>
