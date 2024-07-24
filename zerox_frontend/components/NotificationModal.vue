<template>
  <div v-if="showModal && item._id" class="notification text-sm bg-white">
    <div class="flex justify-between items-center mt-2">
      <p class="text-gray-600 mb-2">Bildirishnoma</p>
      <svg @click="closeModal" class="h-5 w-5 text-black" style="cursor: pointer" width="24" height="24"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>

    <h5 v-if="item.type == 0" class="text-gray-800 mt-2 font-semibold">
      Qarz olish (berish) to`g`risida bildirishnoma
    </h5>
    <div v-if="item.type == 0">
      <p class="mt-2">
        Fuqaro
        <b v-if="$auth.user._id == item.creditor._id">{{
          `${item.debitor.first_name} ${item.debitor.last_name} ${item.debitor.middle_name}`
          }}</b>

        <b v-else>{{
          `${item.creditor.first_name} ${item.creditor.last_name} ${item.creditor.middle_name}`
          }}</b>
        bqlaysizmi?
      </p>
      ilan sizning o`rtangizda
      <b>{{ item.contract.amount }} {{ item.contract.currency }}</b> qarz olish
      (berish) bo`yicha <b>{{ item.contract.date }}</b> sanada
      <b>{{ item.contract.number }}</b>-sonli qarz shartnomasi rasmiylashtirilmoqda. “Tasdiqlash”ni tanlasangiz,
      qarz shartnomasi rasmiylashtiriladi hamda mobil hisobingizdan 1000 so'm
      to’lov amalga oshiriladi. Qarz shartnomasini tasdi
    </div>

    <div v-if="item.type == 1">
      <p class="mt-2">
        Fuqaro
        <b v-if="$auth.user._id == item.creditor._id">{{
          `${item.debitor.first_name} ${item.debitor.last_name} ${item.debitor.middle_name}`
          }}</b>

        <b v-else>{{
          `${item.creditor.first_name} ${item.creditor.last_name} ${item.creditor.middle_name}`
          }}</b>
        bqlaysizmi?
      </p>
      ilan sizning o`rtangizda
      <b>{{ item.contract.amount }} {{ item.contract.currency }}</b> qarz olish
      (berish) bo`yicha <b>{{ item.contract.date }}</b> sanada
      <b>{{ item.contract.number }}</b> Fuqaro Eshmatov Toshmat Gishmatovich
      01.01.2021 yildagi 1sonli qarz shartnomasiga asosan sizdan qarz mablag`ini
      qisman qaytarishingizni talab qilmoqda.
    </div>

    <div v-if="item.type == 2">
      <p class="mt-2">
        Fuqaro
        <b v-if="$auth.user._id == item.creditor._id">{{
          `${item.debitor.first_name} ${item.debitor.last_name} ${item.debitor.middle_name}`
          }}</b>

        <b v-else>{{
          `${item.creditor.first_name} ${item.creditor.last_name} ${item.creditor.middle_name}`
          }}</b>
        bqlaysizmi?
      </p>
      ilan sizning o`rtangizda
      <b>{{ item.contract.amount }} {{ item.contract.currency }}</b> qarz olish
      (berish) bo`yicha <b>{{ item.contract.date }}</b> sanada
      <b>{{ item.contract.number }}</b> Fuqaro Eshmatov Toshmat Gishmatovich
      01.01.2021 yildagi 1sonli qarz shartnomasiga asosan sizdan qarz mablag`ini
      to'liq qaytarishingizni talab qilmoqda.
    </div>
    <div v-if="item.type == 0">
      <div class="flex justify-end mt-4">
        <button @click="affirm" class="bg-blue-500 py-2 px-4 mx-2 rounded font-semibold text-white">
          Tasdiqlash
        </button>
        <button @click="reject" class="bg-red-500 py-2 px-4 font-semibold rounded text-white">
          Rad etish
        </button>
      </div>
    </div>

    <div v-if="item.type == 1 || item.type == 2">
      <div class="flex justify-end mt-4">
        <button @click="affirm(item)" class="bg-blue-500 py-2 px-4 mx-2 rounded font-semibold text-white">
          {{ $t("list.return") }}
        </button>
        <button class="bg-blue-500 py-2 px-4 font-semibold rounded text-white">
          Tanishdm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notificationModal",
  props: ["item"],
  data: () => ({
    showModal: false,
    timeOut: null,
  }),

  mounted() {
    console.log(this.item);
    this.timeOut = () =>
      setTimeout(() => {
        this.showModal = true;
      }, 2000);

    this.timeOut();
  },

  methods: {
    closeModal() {
      this.showModal = false;
    },

    affirm(item) {
      this.closeModal();
      clearTimeout(this.timeOut);
      this.$router.push(this.localePath({
        name: "debt-refund",
        query: {
          item,
        },
      }));
    },
    reject() {
      this.$emit("reject", this.item._id);
      this.closeModal();
      clearTimeout(this.timeOut);
    },
  },
};
</script>

<style scoped>
.notification {
  position: absolute;
  border-radius: 10px;
  padding: 1rem 2rem;
  z-index: 500;
  max-width: 500px;
  width: 100%;

  top: 7rem;
  right: 2rem;
}
</style>
