<template>
  <div style="max-height: 100vh; overflow-y: auto; padding: 10px;">
    <!-- 时间选择器，默认选中时间范围 -->
    <el-row style="position: relative; left: 5%; margin-top: 30px;">
      <el-col>
        <el-time-picker is-range v-model="timeRange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
          placeholder="选择时间范围" style="position: relative;" />
        <!-- 搜索按钮，点击后触发数据请求 -->
        <el-button type="primary" plain @click="fetchData" style="margin-left: 10px;">搜索</el-button>
      </el-col>
    </el-row>

    <!-- 图表的布局，每行两个 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <ChartComponent chartId="blockHeightChart1" :lineData="blockHeightData" :yAxisMin="0" :yAxisMax="1000"
          :yAxisInterval="100" />
      </el-col>
      <el-col :span="12">
        <ChartComponent chartId="blockHeightChart2" :lineData="blockHeightData" :yAxisMin="0" :yAxisMax="1000"
          :yAxisInterval="100" />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <ChartComponent chartId="blockHeightChart3" :lineData="blockHeightData" :yAxisMin="0" :yAxisMax="1000"
          :yAxisInterval="100" />
      </el-col>
      <el-col :span="12">
        <ChartComponent chartId="blockHeightChart4" :lineData="blockHeightData" :yAxisMin="0" :yAxisMax="1000"
          :yAxisInterval="100" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartComponent from '@/components/chart';
import axios from 'axios';

export default {
  components: {
    ChartComponent
  },
  data () {
    return {
      timeRange: [], // 保存时间范围，用户选择或默认
      blockHeightData: {
        timestampList: [], // 时间戳列表
        valueList: [] // 对应的区块高度值列表
      }
    };
  },
  created () {
    this.setDefaultTimeRange(); // 初始化时设置默认时间范围
    this.fetchData(); // 获取默认时间范围的数据
  },
  methods: {
    // 设置默认时间范围为当前时间的前一小时到现在
    setDefaultTimeRange () {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      this.timeRange = [oneHourAgo, now]; // 默认时间范围设置
    },
    // 格式化日期为 YYYY-MM-DDTHH:MM:SS 格式
    formatDateTime (date) {
      const pad = (n) => (n < 10 ? '0' + n : n);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    // 获取数据并更新图表
    async fetchData () {
      if (this.timeRange.length !== 2) {
        return; // 如果没有选择完整的时间范围，退出
      }

      // 获取时间范围
      const [beginDate, endDate] = this.timeRange;

      // 格式化选择的时间
      const formattedBeginDate = this.formatDateTime(new Date(beginDate));
      const formattedEndDate = this.formatDateTime(new Date(endDate));

      // 构建请求URL
      const url = `WeBASE-Front/chain?beginDate=${formattedBeginDate}&endDate=${formattedEndDate}`;

      try {
        // 发起请求
        const response = await axios.get(url);
        console.log(response);

        // 假设数据结构与之前相同
        this.blockHeightData.timestampList = response.data[0].data.lineDataList.timestampList;
        this.blockHeightData.valueList = response.data[0].data.lineDataList.valueList;

        console.log(this.blockHeightData.timestampList[0]);
        console.log(this.blockHeightData.valueList[0]);

        // 强制更新图表
        this.$forceUpdate();
      } catch (error) {
        console.error('数据请求失败', error);
      }
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
