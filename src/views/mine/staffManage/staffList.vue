<template>
  <div class="staff-list-wrap">
    <!--头部-->
    <section class="sl-header">
      <div class="search-bar">
        <input v-model="searchKey"
               placeholder="请输入姓名或手机号"
               @change="handleChange($event)">
      </div>
    </section>
    <!--内容-->
    <section class="sl-content">
      <book-list :bookMenu="bookMenuData" :bookMenuType="bookMenuType"></book-list>
      <book-menu-side :bookMenu="bookMenuData"></book-menu-side>
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
  export default {

    data() {
      return {
        bookMenuData: {},
        bookMenuType: 1,
        filterParam: {
          parentId: 19990530,
          keyword: ''
        },
        staffList: [],//员工列表
        searchKey: '',//搜索关键字
      };
    },
    components: {
      BookList,
      bookMenuSide
    },
    computed: {

    },
    created() {
      this.queryStaffs()
    },
    methods: {
      //查询员工列表
      queryStaffs(){
        queryStaffList(this.filterParam).then(res => {
          if (res.result === "success" && res.data) {
            this.bookMenuData = creatBookMenuData(res.data)
          }
        });
      },
      handleChange($event){
        this.filterParam.keyword = $event.target.value
      },
      skipTo(){
        this.$router.push({
          path: "/my/addStaffInfo"
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/staff.styl"
</style>

