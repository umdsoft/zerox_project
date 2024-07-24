<template>
  <div>
    <div v-if="$i18n.locale == 'uz'">
      <div v-if="item.debitor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>Qarz shartnomasining qabul qilinmaganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>ga {{
            dateFormat(item.created) }} yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasini rasmiylashtirish uchun so‘rovnoma
          yuborgansiz. Ushbu qarz shartnomasi {{ dateFormat(item.created) }} yil
          soat 23:59 ga qadar <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{
            item.ccopmany }}</b> tomonidan qabul
          qilinmaganligi sababli tizim tomonidan rad etildi.
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

      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>Qarz shartnomasining qabul qilinmaganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
          tomonidan
          {{ dateFormat(item.created) }} yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasini rasmiylashtirish uchun Sizga
          so‘rovnoma
          yuborilgan. Ushbu qarz shartnomasi {{ dateFormat(item.created) }} yil
          soat 23:59 ga qadar Siz tomoningizdan qabul qilinmaganligi sababli tizim
          tomonidan rad etildi.
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
      <div v-if="item.debitor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>Қарз шартномасининг қабул қилинмаганлиги тўғрисида</b>
        </p>
        <p class="mt-2">
          <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>га
          {{ dateFormat(item.created) }} йилда <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a>-сонли қарз шартномасини расмийлаштириш учун
          сўровнома юборгансиз. Ушбу қарз шартномаси {{ dateFormat(item.created) }} йил соат 23:59 га қадар <b
            v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{
              item.ccopmany }}</b>
          томонидан қабул қилинмаганлиги сабабли тизим томонидан рад қилинди.
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

      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>Қарз шартномасининг қабул қилинмаганлиги тўғрисида</b>
        </p>
        <p class="mt-2">
          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
          томонидан {{ dateFormat(item.created) }} йилда <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a>-сонли қарз шартномасини расмийлаштириш учун
          Сизга сўровнома юборилган. Ушбу қарз шартномаси {{ dateFormat(item.created) }} йил соат 23:59 га қадар Сиз
          томонингиздан қабул
          қилинмаганлиги сабабли тизим томонидан рад қилинди.
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
      <div v-if="item.debitor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>О непринятии договора займа</b>
        </p>
        <p class="mt-2">
          Вы направили <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{
            item.ccopmany }}</b> {{ dateFormat(item.created) }}г. запрос на оформление договора займа № <a
            class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>.
          Этот договор займа был отклонен системой в связи с тем, что до 23:59 {{ dateFormat(item.created) }} г. он не
          было принят <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{
            item.ccopmany }}</b>.
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

      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700 mb-2">
          <b>О непринятии договора займа</b>
        </p>
        <p class="mt-2">

          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
          {{ dateFormat(item.created) }} г. направил вам анкету на оформление договора займа № <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a>.
          Этот договор займа был отклонен системой в связи с тем, что до 23:59 {{ dateFormat(item.created) }} г. он не
          было принят Вами.
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
