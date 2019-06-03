<template>
  <div class="list-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <section class="list-head-wrap">
      <div class="list-top-bar">
        <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
        <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
        <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
        <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
      </div>
      <div class="adsorb-bar">
        <div class="ab-l">商品名称</div>
        <div class="ab-m" @click="sortList('num')">
          下单件数
          <span
            :class="{'drop':filterParam.numOrderType=='desc','litre':filterParam.numOrderType=='asc'}"
          ></span>
        </div>
        <div class="ab-r" @click="sortList('amount')">
          下单金额
          <span
            :class="{'drop':filterParam.amountOrderType=='desc','litre':filterParam.amountOrderType=='asc'}"
          ></span>
        </div>
      </div>
    </section>

    <section class="list-content-wrap">
      <!--累计下单商品数据-->
      <scroll
        class="product-list-scroll"
        :data="recordList"
        :probeType="3"
        :pullup="true"
        @scrollToEnd="loadMoreProducts"
        ref="productScrollDom"
      >
        <ul class="list">
          <li v-for="item in recordList" :key="item.productId">
            <div>{{item.productName}}</div>
            <div class="letter-p1">{{item.totalQuantity}}件</div>
            <div>¥{{item.totalAmount}}</div>
          </li>
        </ul>
      </scroll>
    </section>

    <section class="empty-icon" v-if="empty">
      <i></i>
      <span>暂无数据~</span>
    </section>
  </div>
</template>

<script>
import { queryProductPerformance} from "api/fetch/mine";
import scroll from "components/scroll.vue";
import storage from "common/storage";

export default {
  data() {
    return {
      isIphoneX: this.isIphoneX,
      activeIdx: 0, //选中的区间
      filterParam: {
        dayNum: null,
        pageNum: 1,
        pageSize: 20,
        orderByNum: 0, //1=数量排序，0=不按数量排序
        numOrderType: null, //"desc"降序 " asc"升序
        orderByAmount: 0, //1=金额排序，0=不按金额排序
        amountOrderType: null //"desc"降序 " asc"升序
      },
      recordList: [],
      totalPage: 0, //总页数
      requestDone: true,
      domShow: false,
      empty: false,
      idx: 0,
    };
  },
  computed: {},
  components: {
    scroll
  },

  created() {
    let idx = this.$route.query.idx;
    this.idx = idx;
    this.shopId = this.$route.query.shopId;
    this.switchBar(idx);
  },
  beforeCreate() {},
  beforeDestroy() {},
  mounted() {},
  methods: {
    //切换时间区间
    switchBar(idx) {
      this.activeIdx = idx;
      switch (idx) {
        case 0:
          this.filterParam.dayNum = 1;
          break;
        case 1:
          this.filterParam.dayNum = 7;
          break;
        case 2:
          this.filterParam.dayNum = 30;
          break;
        case 3:
          this.filterParam.dayNum = "";
          break;
        default:
          break;
      }
      this.filterParam.pageNum = 1;
      this.recordList = [];
    },
    //获取记录列表
    queryRecordList() {
      queryProductPerformance(this.filterParam)
        .then(res => {
          if (res.result === "success") {
            this.domShow = true;
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage == 1) {
              this.totalPage = totalPage;
            }
            dataList.forEach(item => {
              item.totalAmount = Number(item.totalAmount).toFixed(2);
            });
            this.recordList = this.recordList.concat(dataList);
            this.requestDone = true;
            this.empty = !this.recordList.length;
          }
        })
        .catch(err => {
          this.requestDone = true;
        });
    },
    //列表排序
    sortList(type) {
      let { numOrderType, amountOrderType } = this.filterParam;
      if (type == "num") {
        this.filterParam.orderByNum = 1;
        if (!numOrderType) {
          numOrderType = "desc";
        } else if (numOrderType == "desc") {
          numOrderType = "asc";
        } else if (numOrderType == "asc") {
          numOrderType = null;
          this.filterParam.orderByNum = 0;
        }
        this.filterParam.numOrderType = numOrderType;
      } else if (type == "amount") {
        this.filterParam.orderByAmount = 1;
        if (!amountOrderType) {
          amountOrderType = "desc";
        } else if (amountOrderType == "desc") {
          amountOrderType = "asc";
        } else if (amountOrderType == "asc") {
          amountOrderType = null;
          this.filterParam.orderByAmount = 0;
        }
        this.filterParam.amountOrderType = amountOrderType;
      }
      this.filterParam.pageNum = 1;
      this.recordList = [];
    },


    //加载更多
    loadMoreProducts() {
      if (this.loading || this.filterParam.pageNum >= this.totalPage)
        return false;
      this.filterParam.pageNum += 1;
    }
  },
  watch: {
    filterParam: {
      handler(newVal, oldVal) {
        this.queryRecordList();
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/statistical.styl';

.send_btn {
  position: fixed;
  width: 180px;
  height: 70px;
  lh(80);
  text-c();
  ft(28);
  color: white;
  border-radius: 20px;
  left: 50px;
  bottom: 300px;
  background-color: blue;
}
</style>

