<template>
  <div>
    <div v-if="item.type === 8">
      <contract-accept
        @ok="(data) => ok(data)"
        :item="item"
        :getNotifications="getNotifications"
      />
    </div>
    <div v-if="item.type === 7">
      <contract-reject
        @ok="(data) => ok(data)"
        :item="item"
        :getNotifications="getNotifications"
      />
    </div>
    <div v-if="item.type === 18">
      <contract-my-reject
        @ok="(data) => ok(data)"
        :item="item"
        :getNotifications="getNotifications"
      />
    </div>
  </div>
</template>

<script>
import contractAccept from "./contract-accept.vue";
import contractReject from "./contract-reject.vue";
import contractMyReject from "./contract-my-reject.vue";
export default {
  components: { contractReject, contractAccept,contractMyReject },
  props: ["item", "getNotifications"],
  methods: {
    async ok(data) {
      try {
        await this.$axios.$put(`/notification/ok/${data.id}`);
        this.$toast.success(`${$nuxt.$t('a1.a43')}`);
        this.getNotifications();
      } catch (err) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
  },
};
</script>

<style>
</style>
