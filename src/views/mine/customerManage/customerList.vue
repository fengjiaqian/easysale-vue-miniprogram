<template>
  <div class="customer-list-wrap">
    <!--头部-->
    <section class="cl-header">
      <!-- <div class="search-bar">
        <input v-model="searchKey" placeholder="请输入姓名或手机号" @change="handleChange($event)">
      </div>-->
      <div class="search-bar">
       	<div class="icon-back" @click.stop="goBack">
		      <span></span>
		    </div>
        <input v-model="searchKey"
          placeholder="请输入姓名或手机号"
        >
      </div>
      <button class = "search_button" @click = "handleChange">搜索</button>
      <!--<m-header :isSearch="true" placeholder="请输入姓名或手机号" @emitEvt="handleChange"></m-header>-->
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
    <section class="cl-footer" @click="skipTo">新增客户</section>
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
  	goBack() {
      const { name } = this.$route;
      /*
       * TODO:
       *  1.地图定位后，点击返回上一页，手动返回到改页面的上一页面
       *  2.商品管理列表，客户管理列表，员工管理列表，返回我的页面
       * */
      let jumpPath = "";
      switch (name) {
        case "addCustomerInfo":
        case "editCustomerInfo":
          jumpPath = "/my/customerList";
          break;
        case "addStaffInfo":
        case "editStaffInfo":
          jumpPath = "/my/staffList";
          break;
        case "productList":
        case "myConsignee":
        case "staffList":
          jumpPath = "/navi/mine";
          break;
        case "updateConsignee":
          jumpPath = "/myConsignee";
          break;
        case "userInfoEdit":
          jumpPath = "/my/userInfo";
          break;
        case "customerList":
          //如果是从订单界面过来的  返回订单 带入信息
          if (storage.get("fromOrder", false)) {
            this.$router.go(-1);
          } else {
            jumpPath = "/navi/mine";
          }
          break;
        case "userInfo":
          jumpPath = "/navi/mine";
          break;
        case "writeApplicationInformation":
          if (storage.get("ApplyToLocation", false)) {
            jumpPath = "/navi/mine";
            storage.set("ApplyToLocation", false);
          } else {
            this.$router.go(-1);
          }
          break;
        case "dealerList":
          const currentDealerId = storage.get("currentDealerId", "");
          if (!currentDealerId) {
            this.$toast("请选择店铺");
          } else {
            this.$router.go(-1);
          }
          break;
        case "attestationForm":
          jumpPath = "/identity";
          break;
        case "identity":
          jumpPath = "/navi/home";
          break;
        default:
          this.$router.go(-1);
          break;
      }
      jumpPath && this.$router.push({ path: jumpPath });
    },
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
    handleChange() {
    	if(this.filterParam.keyword == this.searchKey) return
      this.filterParam.keyword = this.searchKey;
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

