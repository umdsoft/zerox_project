<template>
  <div class="notification py-4 px-2 lg:px-4 w-full">
    <div class="">
      <div v-if="item.type == 0 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <contract-create :item="item" :getNotifications="getNotifications" :getSockNot="getSockNot" />
      </div>

      <div v-if="item.type === 1 || (item.type === 2 && $auth.user.id === item.reciver)
        " class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-refund :item="item" :getNotifications="getNotifications" />
      </div>
      <div v-if="item.type == 3 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-extend :item="item" :getNotifications="getNotifications" />
      </div>
      <div v-if="item.type == 4 || (item.type === 5 && $auth.user.id === item.reciver)
        " class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-waiver-result :getNotifications="getNotifications" :item="item" />
      </div>

      <div v-if="item.type == 8 || (item.type === 7 && $auth.user.id === item.reciver)
        " class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <contract-create-result :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type === 18 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <contract-create-result :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 9 || (item.type == 10 && $auth.user.id === item.reciver)
        " class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-full-refund-result :getNotifications="getNotifications" :item="item" />
      </div>

      <div v-if="item.type == 11 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-partial-refund-result :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 15 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-partial-refund-reject :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 12 ||
        (item.type === 13 && $auth.user.id === item.reciver)
        " class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-extend-result :getNotifications="getNotifications" :item="item" />
      </div>

      <div v-if="item.type == 17 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-demand :getNotifications="getNotifications" :item="item" />
      </div>

      <div v-if="item.type == 19 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <requestUserVue :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 20" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <requestUserVue :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 21" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <contractVremyaVue :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 22" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <deleteActVue :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 23" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <transfer-money-vue-1 :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 24" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <transfer-money-vue-2 :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 25" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <infocom :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 26" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <infocom2 :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 27" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <exTime :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 31" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <savol :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 30" class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <savol2 :getNotifications="getNotifications" :item="item" />
      </div>
      <div v-if="item.type == 16 && $auth.user.id === item.reciver"
        class="py-4 px-4 bg-white shadow-lg rounded-lg w-full">
        <debt-extend-result :getNotifications="getNotifications" @affirm="affirm" @reject="reject" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
import notiDebtExtend from "./notification_types/debt-extend/debt-extend.vue";
import infocom2 from "./notification_types/infocom2.vue";
import DebtRefund from "./notification_types/debt-refund/debt-refund.vue";
import DebtExtendResult from "./notification_types/debt-extend/debt-extend-result.vue";
import DebtExtend from "./notification_types/debt-extend/debt-extend.vue";
import ContractCreate from "./notification_types/contract-create/contract-create.vue";
import DebtDemand from "./notification_types/debt-demand.vue";
import ContractCreateResult from "./notification_types/contract-create/contract-create-result.vue";
import DebtWaiverResult from "./notification_types/debt-waiver/debt-waiver-result.vue";
import DebtFullRefundResult from "./notification_types/debt-refund/debt-fullRefund-result/debt-fullRefund-result.vue";
import DebtPartialRefundReject from "./notification_types/debt-refund/debt-partialRefund/debt-partialRefund-reject.vue";
import DebtPartialRefundResult from "./notification_types/debt-refund/debt-partialRefund/debt-partialRefund-result.vue";
import contractVremyaVue from "./notification_types/contract-create/contract-vremya.vue";
import requestUserVue from "./notification_types/request-user.vue";
import deleteActVue from "./notification_types/contract-create/delete-act.vue";
import transferMoneyVue1 from "./notification_types/transfer-money1.vue";
import transferMoneyVue2 from "./notification_types/transfer-money2.vue";
import infocom from "./notification_types/infocom.vue";
import infocom2Vue from './notification_types/infocom2.vue';
import exTime from "./notification_types/ex-time.vue";
import savol from "./notification_types/savol.vue";
import savol2 from "./notification_types/savol2.vue";

export default {
  components: {
    DebtExtend,
    exTime,
    savol,
    savol2,
    infocom,
    infocom2,
    notiDebtExtend,
    transferMoneyVue1,
    transferMoneyVue2,
    DebtRefund,
    DebtExtendResult,
    ContractCreate,
    DebtDemand,
    ContractCreateResult,
    DebtWaiverResult,
    DebtFullRefundResult,
    DebtPartialRefundReject,
    DebtPartialRefundResult,
    requestUserVue,
    contractVremyaVue,
    deleteActVue,
  },
  name: "notification",
  props: ["item", "getNotifications", "getSockNot"],

  mounted() { },
  methods: {
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },

    ok(id) {
      ` `;
      this.$emit("ok", id);
    },

    async qismanQaytarish(id, status) {
      const data = {
        debitor: this.item.act.debitor,
        creditor: this.item.act.creditor,
        contract: this.item.act.contract,
        act: this.item.act._id,
        stype: status,
        reciver:
          this.item.act.reciver == this.item.act.debitor
            ? this.item.act.debitor
            : this.item.act.creditor,
      };

      try {
        const response = await this.$axios.post(
          `/notification/qisman-qaytarish/${id}`,
          data
        );
        console.log(response);
        if (response.status == 200) {
          this.$toast.success("Muvaffaqiyatli bajarildi");
          this.$router.go(-1);
        }
      } catch (e) { }
      console.log("ok", id);
    },

    async muddatUzaytirishQabul(id, status) {
      const data = {
        debitor: this.item.act.debitor,
        creditor: this.item.act.creditor,
        contract: this.item._id,
        stype: status,
        reciver:
          this.item.act.reciver == this.item.act.debitor
            ? this.item.act.debitor
            : this.item.act.creditor,
      };
      try {
        const response = await this.$axios.post(
          `/notification/time/${id}`,
          data
        );

        if (response.status == 200) {
          this.$toast.success("Muvaffaqiyatli bajarildi");
          this.$router.go(-1);
        }
      } catch (e) { }
    },

    async oneContract(id, status) {
      const data = {
        debitor: this.item.debitor._id,
        creditor: this.item.creditor._id,
        act: this.item._id,
        contract: this.item.contract._id,
        stype: status,
        reciver: this.item.debitor._id,
      };

      try {
        const response = await this.$axios.put(
          `/notification/success/${id}`,
          data
        );
        console.log(response);
        if (response.status == 200) {
          this.$toast.success("Muvaffaqiyatli bajarildi");
          this.$router.go(-1);
        }
      } catch (e) { }
    },

    async oneContract2(id, status) {
      const data = {
        debitor: this.item.debitor._id,
        creditor: this.item.creditor._id,
        act: this.item._id,
        contract: this.item.contract._id,
        stype: status,
        reciver: this.item.creditor._id,
      };

      try {
        const response = await this.$axios.put(
          `/notification/success/${id}`,
          data
        );
        console.log(response);
        if (response.status == 200) {
          this.$toast.success("Muvaffaqiyatli bajarildi");
          this.$router.go(-1);
        }
      } catch (e) { }
    },

    affirm(event, id, status, users) {
      this.$emit(event, { id, notiId: this.item._id, users }, status);
    },
    reject(event, id, status, users) {
      this.$emit(event, { id, notiId: this.item._id, users }, status);
    },
  },
};
</script>

<style scoped></style>
