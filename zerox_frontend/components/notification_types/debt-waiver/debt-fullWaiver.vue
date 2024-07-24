<template>
  <div>
    <div v-if="$i18n.locale == 'uz'">
      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700">
          <b>Qarzdan voz kechilganligi to‘g‘risida</b>
        </p>

        <p class="mt-2">
          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b> {{
      dateFormat(item.created_at) }}
          yildagi
          <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
            target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasi bo‘yicha Sizga bergan qarzidan voz
          kechdi.
        </p>
        <p>
          Voz kechilgan qarz miqdori -
          <b>{{
      item.vos_summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            {{ item.currency }}</b>
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
      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700">
          <b>Қарздан воз кечилганлиги тўғрисида</b>
        </p>

        <p class="mt-2">

          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b> {{
      dateFormat(item.created_at) }} йилдаги <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a>-сонли қарз шартномаси бўйича Сизга берган қарзидан
          воз кечди. <br>
          Воз кечилган қарз миқдори - <b>{{
      item.vos_summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            {{ item.currency }}</b>.
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
      <div v-if="item.creditor === item.reciver">
        <p class="text-gray-700">
          <b>Об отказе от долга</b>
        </p>

        <p class="mt-2">
          <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
          отказался от предоставленного вам займа по кредитному договору № <a class="text-blue-400"
            :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{ item.number
              }}</b></a> от
          {{
      dateFormat(item.created_at) }} г.<br>
          Сумма отказанной задолженности - <b>{{
      item.vos_summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }}
            {{ item.currency }}</b>.
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
        this.getSockNot()
      } catch (err) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
  },
};
</script>

<style></style>
