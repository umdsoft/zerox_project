<template>
  <div>
    <div v-if="$i18n.locale == 'uz'">
      <div>
        <p class="text-gray-700 mb-2">
          <b>Ma’lumotni ko‘rishga ruxsat berilganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany
            }}</b> qarz ma’lumotlarini ko‘rishga ruxsat berdi.
        </p>
        <div class="flex justify-between mt-4">
          <div>
            <span><b>{{ $t("comp.time") }}:</b>
              {{ dateFormat(item.created) }} {{ item?.time.slice(0, 5) }}</span>
          </div>
          <div>
            <!-- {{ item }} -->
            <button @click="sendUrl(item, item.id)" class="bg-blue-500 py-1 px-4 mx-2 rounded text-white">
              Ma’lumotlarni ko‘rish
            </button>
            <button @click="ok(item.id)" class="bg-blue-500 py-1 px-4 mx-2 rounded text-white">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  name: "debt-demand",
  props: ["item", "getNotifications"],
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "home", // Use socket "home"
      channel: "/", // connect to '/index',
      secure: true,
    });
  },
  methods: {
    async getSockNot() {
      this.socket.emit(
        "notification",
        { userId: this.$auth.user.id },
        (data) => { }
      );

    },
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
    async sendUrl(item, id) {
      try {

        this.$auth.user2 = { created_at: this.$auth.user.id == item.debitor ? item.ccreated : item.dcreated, id: this.$auth.user.id == item.debitor ? item.creditor : item.debitor, name: this.$auth.user.id == item.debitor ? item.creditor_name : item.debitor_name, uid: this.$auth.user.id == item.debitor ? item.cuid : item.duid, }
        await this.$axios.$put(`/notification/ok/${id}`);
        this.getSockNot();
        await this.$router.push({ name: 'search-debitor-result___' + this.$i18n.locale });
        this.$toast.success(`${$nuxt.$t('a1.a43')}`);
        // this.getSockNot();
      } catch (err) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
    async ok(id) {
      try {
        await this.$axios.$put(`/notification/ok/${id}`);
        this.$toast.success(`${$nuxt.$t('a1.a43')}`);
        this.getSockNot();
      } catch (err) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
  },
};
</script>

<style></style>
