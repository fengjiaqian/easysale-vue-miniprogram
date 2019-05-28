<template>
  <div class="customer-list-wrap">
    <!--头部-->
    <section class="cl-header">
      <!-- <div class="search-bar">
        <input v-model="searchKey" placeholder="请输入姓名或手机号" @change="handleChange($event)">
      </div>-->
      <!--<div class="search-bar">
       	<div class="icon-back" @click.stop="goBack">
		      <span></span>
		    </div>
        <input v-model="searchKey"
          placeholder="请输入姓名或手机号"
        >
      </div>
      <button class = "search_button" @click = "handleChange">搜索</button>-->
      <m-header :isSearch="true" placeholder="请输入姓名或手机号" @emitEvt="handleChange"></m-header>
    </section>
    <!--内容-->
    <section class="sl-content">
      <book-list :bookMenu="bookMenuData" :bookMenuType="bookMenuType"></book-list>
      <book-menu-side :bookMenu="bookMenuData"></book-menu-side>
    </section>
    <section class="empty-wrap" v-if="customerList&&!customerList.length">
      <i></i>
      <span>暂无客户，快去添加吧！</span>
    </section>
    <!--底部-->
    <section class="cl-footer"  :class="{'isIphoneX':isIphoneX}" @click="skipTo">新增客户</section>
  </div>
</template>

<script>
import BookList from "components/bookMenu/bookList.vue";
import bookMenuSide from "components/bookMenu/bookMenuSide.vue";
import { queryCustomerList } from "api/fetch/mine";
import { creatBookMenuData } from "common/createBookMenu";
import empty from "components/empty.vue";
import storage from "common/storage";
export default {
  data() {
    return {
      isIphoneX:this.isIphoneX,
      bookMenuData: {},
      bookMenuType: 2,
      filterParam: {
        keyword: ""
      },
      customerList: null,
      searchKey: "" //搜索关键字
    };
  },
  components: {
    BookList,
    bookMenuSide,
    empty
  },
  computed: {},
  created() {
    this.queryCustomer();
  },
  methods: {
    queryCustomer() {
      //如果是从订单界面过来的  返回订单 带入信息
      const fromOrder = storage.get("fromOrder", false);
      queryCustomerList(this.filterParam)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.customerList = res.data;
            if (fromOrder) {
              //state1：代表启用   0：代表停用
              this.customerList = this.customerList.filter(
                item => item.state == 1
              );
            }
            this.bookMenuData = creatBookMenuData(res.data);
          }
        })
        .catch(res => {
          this.customerList = [];
        });
    },
    handleChange(key) {
    	if(this.filterParam.keyword == key) return
      this.filterParam.keyword = key;
    },
    skipTo() {
      this.$router.push({
        path: "/my/addCustomerInfo"
      });
    }
  },
  watch: {
    filterParam: {
      handler(newVal, oldVal) {
        this.queryCustomer();
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/customer.styl';
</style>

