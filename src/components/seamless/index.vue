<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-title">粮食新闻政策</div>
      <div class="sn-body">
        <div class="wrap-container">
          <div class="table">
            <table border="0" cellpadding="0" cellspacing="0" class="table-header">
              <tbody>
                <tr>
                  <td width="60%">
                    <span>新 闻</span>
                  </td>
                  <td width="40%">
                    <span>发布日期</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="optionSetting">
              <table border="0" cellpadding="0" cellspacing="0" class="item">
                <tbody>
                  <tr v-for="(item, index) in listData" :key="index">
                    <td width="100%" class="title">
                      <a :href="item.link" target="_blank">{{ item.title }}</a>
                    </td>
                    <td width="40%">
                      <span>{{ item.date }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'Seamless',
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      listData: [
        {
          title: '守住管好“天下粮仓”夯实粮食安全根基',
          date: '2024-05-28',
          link: 'http://www.npc.gov.cn/c2/c30834/202405/t20240528_437221.html'
        },
        {
          title: '“多部门：切实做好2024年秋粮收购工作',
          date: '2024-09-25',
          link: 'http://news.china.com.cn/txt/2024-09/25/content_117449581.shtml'
        },
        {
          title: '人民政府网-夯实粮食安全根基',
          date: '2024-01-19',
          link: 'https://www.gov.cn/yaowen/liebiao/202401/content_6927032.htm'
        },
        {
          title: '到2030年，实现新增粮食产能千亿斤以上',
          date: '2024-04-10',
          link: 'https://www.gov.cn/zhengce/202404/content_6944294.htm'
        },
        {
          title: '山东潍坊：打造“区块链+农业”全国示范样板',
          date: '2024-01-15',
          link: 'https://k.sina.com.cn/article_7517400647_1c0126e4705904r4yg.html'
        },
        {
          title: '筑牢新型城镇化的粮食安全根基',
          date: '2024-09-05',
          link: 'https://news.cctv.com/2024/09/05/ARTIG7IA0TlMggz6tg3CpZ6s240905.shtml'
        },
        {
          title: '上海启动首批国资国企区块链创新应用场景建设',
          date: '2024-05-18',
          link: 'https://news.cctv.com/2024/05/18/ARTIVI76c3lrrZBybWpr847h240518.shtml'
        },
        {
          title: '农业发展阔步前行 现代农业谱写新篇',
          date: '2024-09-11',
          link: 'https://xczx.cctv.com/2024/09/11/ARTIADndpaM8ZfOFsFSjOklc240911.shtml'
        },
        {
          title: '国务院办公厅关于践行大食物观构建多元化食物供给体系的意见',
          date: '2024-09-12',
          link: 'https://www.gov.cn/gongbao/2024/issue_11606/202409/content_6976938.html'
        },
        {
          title: '农业农村部区块链农业应用重点实验室2024年度开放课题申请指南',
          date: '2024-07-05',
          link: 'https://aii.caas.cn/tzgg/d7862d5e179e45e1b27da78f87ca3717.htm'
        },
        {
          title: '中央网信办等四部门印发《2024年数字乡村发展工作要点》',
          date: '2024-05-16',
          link: 'http://www.scs.moa.gov.cn/gzdt/202405/t20240516_6455539.htm'
        },
        {
          title: '新一轮粮食产能提升第一年 科技加持“黑土粮仓”又迎丰收年',
          date: '2024-10-08',
          link: 'https://news.hexun.com/2024-10-08/214850822.html'
        },
        {
          title: '细分市场：2024年全球粮仓市场规模达到225.4亿元，预计2030年达到317.2亿元',
          date: '2024-07-17',
          link: 'https://www.sohu.com/a/793977114_121794459'
        },
        {
          title: '2024年中央一号文件公布 提出有力有效推进乡村全面振兴“路线图”',
          date: '2024-02-03',
          link: 'https://www.gov.cn/yaowen/liebiao/202402/content_6929930.htm'
        }
      ]
    }
  },
  computed: {
    optionSetting() {
      return {
        step: 0.5,
        limitMoveNum: 2,
        hoverStop: true,
        direction: 1,
        openWatch: true,
        singleHeight: 0,
        singleWidth: 0,
        waitTime: 1000
      }
    }
  },
  mounted() { },
  beforeDestroy() { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sn-container {
  left: 1370px;
  top: 110px;

  %table-style {
    width: 100%;
    height: 35px;
    table-layout: fixed;

    tr {
      td {
        padding: 10px 5px;
        text-align: center;
        background-color: transparent;
        white-space: nowrap;
        overflow: hidden;
        color: #E2E5FF;
        font-size: 14px;
      }
    }
  }

  .table {
    .table-header {
      @extend %table-style;
    }

    .seamless-warp {
      height: 400px;
      overflow: hidden;
      visibility: visible;

      .colorRed {
        color: #FF4669;
      }

      .colorOrange {
        color: #FFC956;
      }

      .item {
        height: auto;
        @extend %table-style;

        tr {
          td {
            &.title {
              text-overflow: ellipsis;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
