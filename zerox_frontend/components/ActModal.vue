<template>
  <div class="act_bg" v-if="isModalShow" @click="$store.commit('HIDE_ACT_MODAL')">
    <debt-waiver v-if="actType === 'debt-waiver'" :contract="contract" />
    <debt-refund v-if="actType === 'debt-refund'" :contract="contract" />
    <debt-refund-partial v-if="actType === 'debt-refund-partial'" :contract="contract" />
    <debt-extend v-if="actType === 'debt-extend'" :time="end_date" :contract="contract" />

    <debt-demand v-if="actType === 'debt-demand'" :contract="contract" />
    <contract_uz v-if="actType === 'contact'" :contract="contract"/>
  </div>
</template>

<script>
import debtWaiver from "../components/actModals/debt-waiver.vue";
import debtExtend from "../components/actModals/debt-extend.vue";
import debtRefund from "../components/actModals/debt-refund.vue";
import debtDemand from "../components/actModals/debt-demand.vue";
import DebtRefundPartial from "./actModals/debt-refund-partial.vue";
import contract_uz from "./actModals/contract_uz.vue";

export default {
  props: ["amount"],
  components: {
    debtWaiver,
    debtExtend,
    debtRefund,
    debtDemand,
    DebtRefundPartial,
    contract_uz
  },

  computed: {
    isModalShow() {
      return this.$store.state.isActModalOpen;
    },
    contract() {
      return this.$store.state.contractData;
    },
    end_date() {
      return this.$store.state.end_date;
    },
    actType() {
      return this.$store.state.actType;
    },
  },
};
</script>

<style lang="scss" scoped>
.act_bg {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.856);
  z-index: 6000000000000000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
>
