<template>
  <div>
    <div v-if="$i18n.locale == 'uz'">
      <div v-if="$auth.user.id === item.creditor">
        <p class="text-gray-700 mb-2">
          <b>Qarz muddatini uzaytirish rad etilganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          <b>{{ dateFormat(item.created) }}</b> yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasi yuzasidan qarz muddatini uzaytirish
          bo‘yicha
          so‘rovingiz <b>{{ item.debitor_name }}</b> tomonidan
          {{ dateFormat(item.created) }} yil soat 23:59 ga qadar qabul qilinmaganligi
          sababli tizim tomonidan bekor qilindi. Qayta so‘rov yuborishingiz
          mumkin.
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
      <div v-if="$auth.user.id === item.debitor">
        <p class="text-gray-700 mb-2">
          <b>Qarz muddatini uzaytirish rad etilganligi to‘g‘risida</b>
        </p>
        <p class="mt-2">
          <b>{{ item.creditor_name }}</b> tomonidan {{ dateFormat(item.created) }} yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddatini uzaytirish bo‘yicha
          Sizga so‘rov yuborilgan. Ushbu so‘rov Siz tomoningizdan {{ dateFormat(item.created) }} yil
          soat 23:59 ga qadar qabul qilinmaganligi sababli tizim tomonidan bekor
          qilindi.

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
      <div v-if="$auth.user.id === item.creditor">
        <p class="text-gray-700 mb-2">
          <b>Қарз муддатини узайтириш рад этилганлиги тўғрисида</b>
        </p>
        <p class="mt-2">
          <b>{{ dateFormat(item.created) }}</b> йилда <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a>-сонли қарз шартномаси юзасидан қарз муддатини узайтириш бўйича сўровингиз
          <b>{{ item.debitor_name }}</b> томонидан {{ dateFormat(item.created) }} йил соат 23:59 га қадар қабул
          қилинмаганлиги сабабли тизим
          томонидан бекор қилинди. Қайта сўров юборишингиз мумкин.
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
      <div v-if="$auth.user.id === item.debitor">
        <p class="text-gray-700 mb-2">
          <b>Қарз муддатини узайтириш рад этилганлиги тўғрисида</b>
        </p>
        <p class="mt-2">
          <b>{{ item.creditor_name }}</b> tomonidan {{ dateFormat(item.created) }} yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddatini uzaytirish bo’yicha
          Sizga so’rov yuborilgan. Ushbu so’rov Siz tomoningizdan {{ dateFormat(item.created) }} yil
          soat 23:59 ga qadar qabul qilinmaganligi sababli tizim tomonidan bekor
          qilindi.

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
      <div v-if="$auth.user.id === item.creditor">
        <p class="text-gray-700 mb-2">
          <b>Об отказе в продлении срока займа</b>
        </p>
        <p class="mt-2">
          Ваша просьба от <b>{{ dateFormat(item.created) }}</b>г. о продлении срока кредита по договору займа № <a
            class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number
              }}</b></a> была отклонена системой
          в связи с тем, что она не была получена <b>{{ item.debitor_name }}</b> до 23:59 {{ dateFormat(item.created)
          }}г. Вы можете
          отправить повторный запрос.
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
      <div v-if="$auth.user.id === item.debitor">
        <p class="text-gray-700 mb-2">
          <b>Об отказе в продлении срока займа</b>
        </p>
        <p class="mt-2">
          <b>{{ item.creditor_name }}</b> tomonidan {{ dateFormat(item.created) }} yilda
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddatini uzaytirish bo’yicha
          Sizga so’rov yuborilgan. Ushbu so’rov Siz tomoningizdan {{ dateFormat(item.created) }} yil
          soat 23:59 ga qadar qabul qilinmaganligi sababli tizim tomonidan bekor
          qilindi.

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
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
    async getSockNot() {
      this.socket.emit(
        "notification",
        { userId: this.$auth.user.id },
        (data) => { }
      );

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
