<template>
  <div>
    <div v-if="$i18n.locale == 'uz'">
      <div v-if="$auth.user.id === item.reciver">
        <p class="text-gray-700">
          <b>Pul mablag‘i o‘tkazilganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          Siz <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>
          ning mobil hisobiga ({{ item.cuid }})
          <b>{{
      item.token.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            UZS</b>
          o'tkazdingiz.
        </p>

        <div class="flex justify-between mt-4">
          <div>
            <span><b>{{ $t("comp.time") }}:</b> {{ dateFormat(item.created) }}
              {{ item?.time.slice(0, 5) }}</span>
          </div>
          <div>
            <button @click="ok(item.id)" class="bg-blue-500 py-1 px-4 mx-2 rounded text-white">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="$i18n.locale == 'kr'">
      <div v-if="$auth.user.id === item.reciver">
        <p class="text-gray-700">
          <b>Пул маблағи ўтказилганлиги тўғрисида</b>
        </p>
        <p class="mt-2">
          Сиз <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>
          нинг мобил ҳисобига ({{ item.cuid }}) <b>{{
      item.token.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            UZS</b> ўтказдингиз.
        </p>

        <div class="flex justify-between mt-4">
          <div>
            <span><b>{{ $t("comp.time") }}:</b> {{ dateFormat(item.created) }}
              {{ item?.time.slice(0, 5) }}</span>
          </div>
          <div>
            <button @click="ok(item.id)" class="bg-blue-500 py-1 px-4 mx-2 rounded text-white">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="$i18n.locale == 'ru'">
      <div v-if="$auth.user.id === item.reciver">
        <p class="text-gray-700">
          <b>О переводе денежных средств</b>
        </p>
        <p class="mt-2">
          Вы перевели <b>{{
      item.token.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            UZS</b> UZS на мобильный счет ({{ item.cuid }}) <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b
            v-if="item.ctypes == 1">{{ item.ccopmany }}</b>.
        </p>

        <div class="flex justify-between mt-4">
          <div>
            <span><b>{{ $t("comp.time") }}:</b> {{ dateFormat(item.created) }}
              {{ item?.time.slice(0, 5) }}</span>
          </div>
          <div>
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
