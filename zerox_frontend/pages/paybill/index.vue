<template>
  <div class="pay-bill bg-white rounded px-4 py-4">
    <div
      @click="$router.go(-1)"
      class="my-2 mx-6 hidden lg:inline-flex items-center"
      style="cursor: pointer"
    >
      <svg
        class="h-5 w-5 text-blue-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>
    <div class="flex justify-center">
      <div class="pay-text rounded mt-8">
        {{$t('a1.a19')}}
      </div>
    </div>
    <div
      class="pay-cards flex justify-evenly mt-16 mb-14 ml-40 mr-40"
      v-if="pays == true"
    >
      <input
        ref="input"
        :value="amount"
        v-format="amount"
        @keyup="changeAmount($event)"
        type="text"
        :placeholder="$t('placeholder.summo')"
        class="input"
      />
      <button
        @click="paySend()"
        :disabled="disa"
        :class="disa ? 'bg-gray-300' : 'bg-green-400'"
        class="
          bta
          mx-2
          px-4
          rounded
          py-2
          text-center
          flex
          justify-center
          items-center
          text-white
        "
      >
        Xisobni to'ldirish
      </button>
    </div>

    <div class="pay-cards flex justify-evenly mt-16 mb-24">
      <div class="pay-card p-6 rounded" @click="pay(1)">
        <img src="@/assets/img/click.png" alt="" />
      </div>
      <div class="pay-card p-6 rounded" @click="pay(2)">
        <img src="@/assets/img/payme.png" alt="" />
      </div>
      <div class="pay-card p-6 rounded" @click="pay(3)">
        <img src="@/assets/img/paynet.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import base64 from "base-64";
export default {
  middleware: "auth",
  data: () => ({
    amount: "",
    pays: false,
    url: "",
    paytype: "",
    disa: true,
  }),
  mounted(){
  },
  methods: {
    setAmount(e) {
      const amount = [...e.target.value].filter((c) => c !== " ").join("");
      const reg = /^\d+$/;
     
      if (reg.test(amount)) {
        if (Number(amount) < Number(this.contract.residual_amount)) {
          this.amount = amount;
        } else {
          this.amount = this.contract.residual_amount;
          this.$refs.input.value = this.amount;
        }
      }
      else {
        if(amount.length > 0) {
          this.$refs.input.value = this.amount;
        }
         
      }
    },
    pay(type) {
      if (this.pays == false) {
        this.pays = true;
        this.paytype = type;
      } else {
        this.pays = false;
      }
    },
    async paySend() {
   
      if (this.paytype == 1) {
        window.location.replace(
          `https://my.click.uz/services/pay?service_id=24899&merchant_id=17375&amount=${Number(this.amount)}&transaction_param=${this.$auth.user.uid}`
        );
      }
      if (this.paytype == 2) {
        this.url =
          "https://checkout.paycom.uz/" +
          base64.encode(
            `m=62fa657ea12ad7a48f4b2dd9;ac.user_id=${this.$auth.user.uid};a=${
              Number(this.amount) * 100
            }`
          );
        window.location.replace(this.url);
      }
      if (this.paytype == 3) {
      }
      // console.log(this.paytype);
    },
    changeAmount(e) {
      if (e.target.value.length > 0) {
        this.disa = false;
      } else {
        this.disa = true;
      }
      let firstValue = e.target.value.split("")[0];
      if (firstValue == 0) {
        e.target.value = e.target.value.slice(1, e.target.value.length);
      }
    },
  },
};
</script>

<style scoped>
.pay-card {
  background: #5395d3;
  margin: 0 10px;
  cursor: pointer;
}
.pay-text {
  width: 26rem;
  padding: 1rem;
  background: white;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
}
.input {
  border: 1px solid #1565d8;
  width: 100%;
  height: 50px;
  text-indent: 10px;
  border-radius: 5px;
  transition: all 0.2s ease;
}
.btn {
  border: 1px solid #8692a6;
  width: 306px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}
.bta {
  width: 306px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}
</style>
