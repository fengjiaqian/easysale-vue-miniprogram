<template>
  <div class="staff-list-wrap">
    <!--头部-->
    <section class="sl-header">
      <!--<m-header :isSearch="true" placeholder="请输入姓名或手机号" @emitEvt="handleChange"></m-header>-->
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
    </section>
    <!--内容-->
    <section class="sl-content">
      <book-list :bookMenu="bookMenuData" :bookMenuType="bookMenuType"></book-list>
      <book-menu-side :bookMenu="bookMenuData"></book-menu-side>
    </section>
    <section class="empty-wrap" v-if="staffList&&!staffList.length">
      <i></i>
      <span>暂无员工，快去添加吧！</span>
    </section>
    <!--底部-->
    <section class="sl-footer" @click="skipTo">新增员工</section>
  </div>
</template>

<script>
import BookList from "components/bookMenu/bookList.vue";
import bookMenuSide from "components/bookMenu/bookMenuSide.vue";
import { queryStaffList } from "api/fetch/mine";
import { creatBookMenuData } from "common/createBookMenu";
import empty from "components/empty.vue";
export default {
  data() {
    return {
      bookMenuData: {},
      bookMenuType: 1,
      filterParam: {
        parentId: "",
        keyword: ""
      },
      staffList: null, //员工列表
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
    this.queryStaffs();
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
    //查询员工列表
    queryStaffs() {
      queryStaffList(this.filterParam)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.staffList = res.data;
            this.bookMenuData = creatBookMenuData(res.data);
          }
        })
        .catch(res => {
          this.staffList = [];
        });
    },
    handleChange() {
    	if(this.filterParam.keyword == this.searchKey) return
      this.filterParam.keyword = this.searchKey;
    },
    skipTo() {
      this.$router.push({
        path: "/my/addStaffInfo"
      });
    }
  },
  watch: {
    filterParam: {
      handler(newVal, oldVal) {
        this.queryStaffs();
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/staff.styl';
</style>

