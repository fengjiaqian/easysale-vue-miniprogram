<template>
  <div class="staff-list-wrap">
    <!--头部-->
    <section class="sl-header">
      <m-header :isSearch="true" placeholder="请输入姓名或手机号" @emitEvt="handleChange"></m-header>
      <!-- <div class="search-bar">
        <input v-model="searchKey" placeholder="请输入姓名或手机号" @change="handleChange($event)">
      </div>
      <div class="search-bar">
       	<div class="icon-back" @click.stop="goBack">
		      <span></span>
		    </div>
        <input v-model="searchKey"
          placeholder="请输入姓名或手机号"
        >
      </div>
      <button class = "search_button" @click = "handleChange">搜索</button>-->
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
    handleChange(key) {
    	if(this.filterParam.keyword == key) return
      this.filterParam.keyword = key;
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

