<template>
  <div class="customer-list-wrap">
    <!--头部-->
    <section class="cl-header">
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
  export default {
    data() {
      return {
        bookMenuData: {},
        bookMenuType: 2,
        filterParam: {
          userId: 19990530,
          keyword: ''
        },
        customerList: null,
        searchKey: '',//搜索关键字
      };
    },
    components: {
      BookList,
      bookMenuSide,
      empty
    },
    computed: {

    },
    created() {
      this.queryCustomer()
    },
    methods: {
      //查询员工列表
      queryCustomer(){
        queryCustomerList(this.filterParam).then(res => {
          if (res.result === "success" && res.data) {
            this.customerList = res.data
            this.bookMenuData = creatBookMenuData(res.data)
          }
        }).catch(res => {
          this.customerList = []
        });
      },
      handleChange($event){
        this.filterParam.keyword = $event.target.value
      },
      skipTo(){
        this.$router.push({
          path: "/my/addCustomerInfo"
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/customer.styl"
</style>

