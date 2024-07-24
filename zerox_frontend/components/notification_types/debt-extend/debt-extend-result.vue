<template>
  <div>
    <div v-if="item.type == 12 || item.type == 16">
      <div v-if="$i18n.locale == 'uz'">
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Qarz muddati uzaytirilganligi to‘g‘risida</b>
          </p>
          <p class="mt-2">
            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            tomonidan
            <b>{{ dateFormat(item.created_at) }}</b> yildagi
            <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
              target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddati
            <b>{{ dateFormat(item.end_date) }}</b> yilga qadar uzaytirildi.
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
        <div v-if="item.debitor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Qarz muddati uzaytirilganligi to‘g‘risida</b>
          </p>
          <p class="mt-2">
            <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>
            tomonidan
            <b>{{ dateFormat(item.created_at) }}</b> yildagi
            <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
              target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddati
            <b>{{ dateFormat(item.end_date) }}</b> yilga qadar uzaytirildi.
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
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Қарз муддати узайтирилганлиги тўғрисида</b>
          </p>
          <p class="mt-2">
            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            томонидан <b>{{ dateFormat(item.created_at) }}</b> йилдаги <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a>-сонли қарз шартномасининг муддати <b>{{ dateFormat(item.end_date) }}</b> йилга
            қадар
            узайтирилди.
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
        <div v-if="item.debitor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Қарз муддати узайтирилганлиги тўғрисида</b>
          </p>
          <p class="mt-2">
            <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>
            томонидан <b>{{ dateFormat(item.created_at) }}</b> йилдаги <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a>-сонли қарз шартномасининг муддати
            <b>{{ dateFormat(item.end_date) }}</b> йилга қадар узайтирилди.
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
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>О продлении срока займа</b>
          </p>
          <p class="mt-2">

            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            срок договора займа № <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a> от <b>{{ dateFormat(item.created_at) }}</b> г. продлен до <b>{{
      dateFormat(item.end_date) }}</b> г.
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
        <div v-if="item.debitor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>О продлении срока займа</b>
          </p>
          <p class="mt-2">

            <b v-if="item.ctypes == 2">{{ item.creditor_name }}</b><b v-if="item.ctypes == 1">{{ item.ccopmany }}</b>
            срок договора займа № <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a> от <b>{{ dateFormat(item.created_at) }}</b> г. продлен до <b>{{
      dateFormat(item.end_date) }}</b> г.
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

    <div v-if="item.type === 13">
      <div v-if="$i18n.locale == 'uz'">
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Qarz muddatini uzaytirish rad etilganligi to‘g‘risida</b>
          </p>
          <p class="mt-2">
            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            tomonidan Sizning
            <b>{{ dateFormat(item.created_at) }}</b> yildagi
            <a class="text-blue-400" :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`"
              target="_blank"><b>{{ item.number }}</b></a>-sonli qarz shartnomasining muddatini uzaytirish bo‘yicha
            so‘rovnomangiz rad etildi.
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
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Қарз муддатини узайтириш рад этилганлиги тўғрисида</b>
          </p>
          <p class="mt-2">

            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            томонидан Сизнинг <b>{{ dateFormat(item.created_at) }}</b> йилдаги <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a>-сонли қарз шартномасининг
            муддатини узайтириш бўйича сўровномангиз рад этилди.
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
        <div v-if="item.creditor == item.reciver">
          <p class="text-gray-700 mb-2">
            <b>Об отказе в продлении срока займа</b>
          </p>
          <p class="mt-2">
            <b v-if="item.dtypes == 2">{{ item.debitor_name }}</b><b v-if="item.dtypes == 1">{{ item.dcompany }}</b>
            отклонил ваш запрос на продление договора займа № <a class="text-blue-400"
              :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=0`" target="_blank"><b>{{
      item.number }}</b></a> от <b>{{ dateFormat(item.created_at) }}</b>.
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
    async ok(id) {
      try {
        await this.$axios.$put(`/notification/ok/${id}`);
        this.$toast.success(`${$nuxt.$t('a1.a43')}`);
        this.getSockNot();
      } catch (err) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },

    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
  },
};
</script>

<style></style>
