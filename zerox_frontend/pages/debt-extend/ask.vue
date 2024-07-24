<template>
  <div class="bg-white px-4 py-4" style="border-radius: 10px">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>
    <div class="m-0 mx-auto max-w-2xl mt-8">
      <h1 class="text-center font-extrabold text-xl mb-5">
        {{ $t("action.a2") }}
      </h1>
      <div class="shadow-lg px-5 py-10 pb-16 rounded-lg mb-5">
        <span v-if="$i18n.locale == 'uz'">
          <p>
            <b> {{ dateFormat(contract.created_at) }}</b> yildagi
            <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.uid } })">{{
              contract.number
              }}</nuxt-link>
            -sonli qarz shartnomasi muddatini uzaytirish bo‘yicha so‘rovnoma
            yubormoqdasiz.
          </p>
          <p>
            Qarzni qaytarishning hozirgi muddati -
            <b>{{ dateFormat(contract.end_date) }}</b> yil.
          </p>
        </span>

        <span v-if="$i18n.locale == 'kr'">
          <p>
            <b> {{ dateFormat(contract.created_at) }}</b> йилдаги
            <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.uid } })">{{
              contract.number
              }}</nuxt-link>
            -сонли қарз шартномаси муддатини узайтириш бўйича сўровнома юбормоқдасиз.
          </p>
          <p>
            Қарзни қайтаришнинг ҳозирги муддати -
            <b>{{ dateFormat(contract.end_date) }}</b> йил.
          </p>
        </span>

        <span v-if="$i18n.locale == 'ru'">
          <p>
            Вы отправляете запрос на продление договора займа от <b> {{ dateFormat(contract.created_at) }}</b> г. №
            <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.uid } })">{{
              contract.number
              }}</nuxt-link>.
          </p>
          <p>
            Текущий срок погашения задолженности - <b>{{ dateFormat(contract.end_date) }}</b>г.
          </p>
        </span>
      </div>
      <div class="form-date-picker">
        <date-picker v-model="time" value-type="YYYY-MM-DD" format="DD.MM.YYYY" placeholder="Yangi muddatni kiriting"
          :disabled-date="disabledDates"></date-picker>
      </div>
      <div class="flex justify-center">
        <button @click="sendAct" class="p-4 w-2/5 my-10 mx-auto rounded-md text-white bg-t_primary">
          {{ $t("send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: "auth",
  data: () => ({
    contract: {},
    time: null,
    isAffirmed: false,
    isBtnDisabled: true,
    act: null,
  }),
  async mounted() {
    // console.log(2)
    const contract = await this.$axios.get(
      `/contract/by/${this.$route.query.id}`
    );
    this.socket = this.$nuxtSocket({
      name: "home", // Use socket "home"
      channel: "/", // connect to '/index',
      secure: true,
    });
    this.contract = contract.data.data;

    setTimeout(() => {
      function keydownInput(e) { }
      let input = document.querySelector(".mx-input");
      input.addEventListener("keydown", (e) => {
        console.log("code", e);
        let key = parseInt(e.key);

        if (
          e.which == 8 &&
          e.target.value.charAt(e.target.value.length - 1) == "."
        ) {
          e.target.value = e.target.value.slice(0, e.target.value.length - 2);
          e.preventDefault();
        }
        if (
          !(
            (Number.isInteger(key) && e.target.value.length < 10) ||
            e.which == 8
          )
        ) {
          e.preventDefault();
        }
      });

      input.addEventListener("keyup", (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");

        let length = value.length;

        if (length >= 8) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(
            2,
            4
          )}.${value.slice(4, 8)}`;
          return true;
        }
        if (length >= 4) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(
            2,
            4
          )}.${value.slice(4, length)}`;
          return true;
        }
        if (length >= 2) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(2, length)}`;
          return true;
        }
      });
    }, 500);
  },
  computed: {
    isValidate() {
      return this.amount && this.currency && this.isAffirmed ? false : true;
    },
  },
  methods: {
    async getSockNot() {
      this.socket.emit(
        "notification",
        { userId: this.$auth.user.id },
        (data) => { }
      );
    },
    disabledDates(date) {
      const endDate = new Date(this.contract.end_date);
      const today = new Date();
      today.setHours(1, 0, 0, 0);
      endDate.setHours(1, 0, 0, 0);
      if (endDate < today) {
        if (date < today) {
          return true;
        } else {
          return false;
        }
      } else {
        if (date < endDate) {
          return true;
        } else {
          return false;
        }
      }
    },
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
    setExtendDate(e) {
      const selectedDate = e.target.value;
      const curDate = new Date(this.contract.end_date) - 1 + 86401;
      const configuredDate = new Date(selectedDate) - 1 + 86401;
      if (configuredDate > curDate) {
        this.time = selectedDate;
      } else {
        this.time = null;
      }

      this.validate();
    },

    validate() {
      if (this.time) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    },
    async sendAct() {
      if (!this.time) {
        return this.$toast.error("Qarz muddatini kiriting.");
      }
      const newAct = {
        end_date: this.time,
        contract: this.contract.id,
        debitor: this.contract.debitor,
        creditor: this.contract.creditor,
        reciver: this.contract.debitor,
        old_amount: this.contract.residual_amount,
        refundable_amount: 0,
        residual_amount: this.contract.residual_amount,
        inc: this.contract.inc,
        sender: this.contract.creditor,
        res: this.contract.debitor,
        type: 3,
        ntype: 3,
        status: 0,
      };

      // return console.log(newAct);
      try {
        const response = await this.$axios.post("/contract/act", newAct);
        if (response.data.msg == "ex") {
          return this.$toast.error(
            "Ushbu qarz shartnomasi bo'yicha so'rov yuborilgan. Iltimos, kuting!"
          );
        }
        if (response.status == 201) {
          this.getSockNot()
          this.$toast.success(
            "Qarz muddatini uzaytirish bo‘yicha so‘rov yuborildi"
          );
          this.$router.go(-1);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
