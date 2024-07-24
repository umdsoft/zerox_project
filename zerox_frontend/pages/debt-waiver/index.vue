<template>
  <div class="waiver bg-white px-4 py-4 w-full" style="border-radius: 6px" v-if="contract != null">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>
    <div>
      <div class="flex justify-center items-center">
        <div style="width: 40.6rem">
          <h2 class="font-bold text-xl text-center">{{ $t("action.a5") }}</h2>
          <div class="debt_notification pt-6 pb-12 px-6 mt-4">
            <span v-if="$i18n.locale == 'uz'">
              Siz <b>{{ dateFormat(contract.created_at) }}</b> yildagi
              <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.id } })">{{
                contract.number }}</nuxt-link>
              -sonli qarz shartnomasi bo‘yicha
              <b>{{
                contract.residual_amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
                {{ contract.currency }}</b>
              qarzdan voz kechmoqdasiz.
            </span>

            <span v-if="$i18n.locale == 'kr'">
              Сиз <b>{{ dateFormat(contract.created_at) }}</b> йилдаги
              <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.id } })">{{
                contract.number }}</nuxt-link>
              -сонли қарз шартномаси бўйича
              <b>{{
                contract.residual_amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
                {{ contract.currency }}</b>
              қарздан воз кечмоқдасиз.
            </span>

            <span v-if="$i18n.locale == 'ru'">
              Вы отказываетесь от задолженности в <b>{{
                contract.residual_amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
                {{ contract.currency }}</b> по договору займа от <b>{{ dateFormat(contract.created_at) }}</b>г. №
              <nuxt-link class="text-blue-400" :to="localePath({ name: 'pdf-generate', query: { id: contract.id } })">{{
                contract.number }}</nuxt-link>.
            </span>
          </div>

          <h3 class="mt-4">
            <!-- Foydalanuvchi qarzi :  {{Number(contract.amount) - (contract.act.refundable_amount ? contract.act.refundable_amount : 0)}} {{contract.currency}} -->
          </h3>

          <div class="flex items-center justify-center mt-8 ml-2">
            <input @change="validate" v-model="isAffirmed" type="checkbox" />
            <p style="cursor: pointer" class="text-blue-400 text-center underline ml-4" @click="
              $store.commit('SHOW_ACT_MODAL', {
                contract,
                act,
                type: 'debt-waiver',
              })
              ">
              {{ $t("action.a3") }}
            </p>
          </div>

          <div class="flex justify-center mt-8">
            <button :disabled="isBtnDisabled" @click="sendWaiver" :class="isBtnDisabled ? 'bg-t_error' : 'bg-t_primary'"
              class="p-5 mb-5 w-72 py-4 font-bold text-white rounded">
              {{ $t("send") }}
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
  middleware: "auth",
  data: () => ({
    step: 1,
    amount: null,
    isAffirmed: false,
    inc: 0,
    isBtnDisabled: true,
    page: "",
    contract: null,
    act: null,
  }),
  async mounted() {
    const contract = await this.$axios.get(
      `/contract/by/${this.$route.query.id}`
    );
    this.socket = this.$nuxtSocket({
      name: "home", // Use socket "home"
      channel: "/", // connect to '/index',
      secure: true,
    });
    this.contract = contract.data.data;
  },
  methods: {
    async getSockNot() {
      this.socket.emit(
        "notification",
        { userId: this.$auth.user.id },
        (data) => { }
      );
      this.socket.emit(
        "me",
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
    handleClick(command) {
      console.log(command);
      this.page = command;
      console.log(this.page);
      this.step = this.step + 1;
    },

    validate() {
      if (!this.isAffirmed) {
        this.isBtnDisabled = true;
      }

      return (this.isBtnDisabled = false);
    },

    async sendWaiver() {
      const dds = await this.$axios.get(
        `/contract/by/${this.$route.query.id}`
      );
      this.dx = dds.data.data;
      const data = {
        contract: this.contract.id,
        refundable_amount: 0,
        residual_amount: this.dx.residual_amount,
        old_amount: this.contract.residual_amount,
        vos_summa: this.dx.residual_amount,
        inc: this.dx.inc,
        end_date: this.contract.end_date.slice(0, 10),
        debitor: this.contract.debitor,
        creditor: this.contract.creditor,
        sender: this.contract.debitor,
        res: this.contract.debitor,
        reciver: this.contract.creditor,
      };
      // return console.log(data)
      try {
        const response = await this.$axios.post(`/contract/vos-kechish`, data);
        if (response.status == 200 && response.data.msg == "ex") {
          this.$toast.error(
            "Ushbu qarz shartnomasi bo'yicha Sizga so'rov yuborilgan. Bildirishnomalar bo'limi orqali tanishing."
          );
        }
        if (response.status == 201) {
          this.socket.emit(
            "notification",
            { userId: this.$auth.user.id },
            (data) => { }
          );
          this.$toast.success("Qarzdan voz kechildi.");
          this.$router.go(-1);
        }
      } catch (e) { this.$toast.error(`${$nuxt.$t('a1.a42')}`); }
    },
  },
};
</script>

<style lang="css" scoped>
.debt_notification {
  width: 100%;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

.input {
  border: 1px solid #1565d8;
  width: 100%;
  height: 50px;
  text-indent: 10px;
  border-radius: 5px;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border: 1px solid #1565d8;
}
</style>
