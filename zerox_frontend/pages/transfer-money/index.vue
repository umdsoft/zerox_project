<template>
  <div class="bg-white rounded px-4 py-4">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>

    <div class="flex justify-center items-center" style="margin-top: 5rem">
      <div style="width: 26.6rem">
        <div class="transfer-text mb-8 rounded">
          {{ $t("transfer.title") }}
        </div>

        <input type="text" v-mask="'######/AA'" class="input" @input="validate" v-model="id"
          style="padding: 1rem; border-radius: 5px" :placeholder="$t('transfer.err1')" />

        <input v-format="amount" :value="amount" ref="input" @input="setAmount" @keyup="changeAmount($event)"
          type="text" class="input mt-2" style="padding: 1rem; border-radius: 5px" :placeholder="$t('transfer.err2')" />

        <button @click="payBill" class="but mt-4 w-full text-white p-3 h-22 rounded bg-t_primary">
          {{ $t("trMoney.money") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    id: null,
    amount: "",
    isBtnDisabled: "false",
    time: null,
    user: null,
  }),
  methods: {
    validate() {
      if (this.amount && this.id) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    },
    changeAmount(e) {
      let firstValue = e.target.value.split("")[0];
      if (firstValue == 0) {
        e.target.value = e.target.value.slice(1, e.target.value.length);
      }
      // else{
      //   e.preventDefault()
      // }
    },
    setAmount(e) {
      const amount = [...e.target.value].filter((c) => c !== " ").join("");
      const reg = /^\d+$/;

      if (reg.test(amount)) {
        if (Number(amount) < Number(this.$auth.user.balance)) {
          this.amount = amount;
        } else {
          this.amount = this.$auth.user.balance;
          this.$refs.input.value = this.amount;
        }
      } else {
        if (amount.length > 0) {
          this.$refs.input.value = this.amount;
        }
      }
    },
    async payBill() {
      const id = this.id.split("/").join("");
      const data = {
        payee: id,
        amount: Number(this.amount),
      };
      // return console.log('dd',data)
      try {
        const response = await this.$axios.post("/user/transfer", data);
        if (response.status == 200 && response.data.success == false) {
          this.$toast.error($nuxt.$t('a1.a53'));
        }
        if (response.status == 200 && response.data.success == true) {
          this.$toast.success(`${$nuxt.$t('a1.a43')}`);
          this.$router.go(-1);
        }
      } catch (e) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },

    async searchUser() {
      if (this.amount > this.$auth.user.balance) {
        return this.$toast.error($nuxt.$t('a1.a54'));
      }
      try {
        const response = await this.$axios.post("user/search", {
          id: this.id,
          type: 1,
        });
        if (response.status == 200) {
          this.user = response.data.user;
        }
      } catch (e) {
        this.$toast.error($nuxt.$t('a1.a53'));
      }
    },
  },
};
</script>

<style scoped>
.error-login {
  font-size: 16px;
  color: red;
}

.auth {
  padding-bottom: 8rem;
}

.hr_line {
  border: none;
  height: 0.2px;
  /* Set the hr color */
  color: #f5f5f5;
  /* old IE */
  background-color: #f5f5f5;
  /* Modern Browsers */
}

.transfer-text {
  width: 100%;
  padding: 1rem;
  background: white;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
}

.input {
  width: 100%;
  height: 100%;
  outline: none;
  border: 1px solid #8692a6;
  text-indent: 10px;
}

.input:focus {
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
}
</style>
