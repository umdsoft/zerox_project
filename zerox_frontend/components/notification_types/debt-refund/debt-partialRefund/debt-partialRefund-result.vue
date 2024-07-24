<template>
  <div>
    <div v-if="item.type == 11">
      <debt-partial-refund-accept
        :item="item"
        :getNotifications="getNotifications"
      />
    </div>
    <div v-if="item.type == 15">
      <debt-partial-refund-reject
        :item="item"
        :getNotifications="getNotifications"
      />
    </div>
  </div>
</template>

<script>
import DebtPartialRefundAccept from "./debt-partialRefund-accept.vue";
import DebtPartialRefundRejectVue from "./debt-partialRefund-reject.vue";
export default {
  components: {
    DebtPartialRefundAccept,
    DebtPartialRefundRejectVue
  },

  props: ["item", "getNotifications"],
};
</script>

<style>
</style>
