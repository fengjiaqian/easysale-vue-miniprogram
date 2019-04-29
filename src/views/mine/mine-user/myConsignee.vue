
<template>
  <div class="my-consignee">
    <m-header :isSearch="true" placeholder="请输入姓名或者电话" @emitEvt="_queryCustomerConsigneeList"></m-header>
    <empty v-if="empty" txt="暂无收货人，快去添加吧" :iconUrl="avatarUrl"></empty>
    <div class="consignee-list">
      <div
        class="consignee-address-item"
        v-for="item in addressList"
        :key="item.id"
        @click="_bindTap(item)"
      >
        <div class="info">
          <strong>{{item.name}}</strong>
          <strong>{{item.phone}}</strong>
        </div>
        <div class="shop-name">{{item.customerShopName}}</div>
        <div class="receive-address">{{item.address}}</div>
        <div class="operate" v-if="showOperation">
          <a href="javascript:;" @click.stop="_modify(item)">编辑</a>
          <a href="javascript:;" @click.stop="_delet(item.id)">删除</a>
        </div>
      </div>
    </div>
    <div class="edit" @click="_addAddress()">新增收货人</div>
  </div>
</template>

<script>
import empty from "components/empty.vue";
import avatarUrl from "@/assets/images/empty_icon_1.png";
import {
  queryCustomerConsigneeList,
  deleteConsignee
} from "api/fetch/endCustomer";
import storage from "common/storage";
export default {
  name: "my-consignee",
  data() {
    return {
      addressList: [],
      showOperation: true,
      empty: false,
      avatarUrl,
      userPhone: '',//用户手机号
    };
  },
  components: {
    empty
  },
  mounted() {},
  computed: {},
  created() {
    this.showOperation = !storage.get("fromOrder", false);
    this._queryCustomerConsigneeList();
    this.userPhone = storage.get('mobileNo', '')
  },
  methods: {
    _queryCustomerConsigneeList(keyword = "") {
      queryCustomerConsigneeList(keyword).then(res => {
        if (res.result === "success" && res.data) {
          this.addressList = res.data;
          this.empty = !this.addressList.length;
        }
      });
    },
    _addAddress() {
      this.$router.push({
        name: "updateConsignee",
        params: {
          code: 1
        }
      });
    },
    _modify(item) {
      const addressInfo = encodeURIComponent(JSON.stringify(item));
      this.$router.push({
        name: "updateConsignee",
        params: {
          code: 2
        },
        query: {
          addressInfo
        }
      });
    },
    _delet(id) {
      deleteConsignee(id)
        .then(res => {
          if (res.result === "success") {
            this.$toast("删除成功");
            const Idx = this.addressList.findIndex(item => item.id == id);
            if (Idx != -1) {
              this.addressList.splice(Idx, 1);
            }
          }
        })
        .catch(err => {});
    },
    _bindTap(item) {
      if (storage.get("fromOrder", false)) {
        this.$router.push({
          path: "/orderSubmit",
          query: {
            customerInfo: this.encodeUrl(item)
          }
        });
      }
      return false;
    }
  }
};
</script>

<style lang="stylus">
.my-consignee {
  pt(90);
  pb(98);

  .m-header {
    pos(fixed);
    top: 0;
    left: 0;
    z-index: 10;
  }
}

.consignee-list {
  bg(#fff);
}

.consignee-address-item {
  pos(relative);
  padding: 24px;

  .info {
    ft(32);
    c(#333);

    strong {
      fb();

      &:nth-of-type(2) {
        ml(48);
      }
    }
  }

  .shop-name, .receive-address {
    mt(16);
    lh(38);
    ft(28);
    c(#666);
  }

  .operate {
    pos(absolute);
    top: 68px;
    right: 24px;

    a {
      inline();
      w(88);
      h(56);
      lh(60);
      ft(28);
      c(#666);
      text-c();
      border-radius: 8px;
      border: 1px solid rgba(221, 221, 221, 1);

      &:nth-of-type(2) {
        ml(24);
      }
    }
  }
}

.my-consignee .edit {
  width: 100%;
  height: 98px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 86, 56, 1);
  line-height: 98px;
  text-align: center;
  border-top: 1PX solid #ededed;
}
</style>