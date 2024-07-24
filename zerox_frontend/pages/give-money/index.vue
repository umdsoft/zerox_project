<template>
  <div class="flex items-center flex-col bg-white py-4 pb-8 rounded">
    <div class="flex w-full justify-start">
      <div @click="nazad" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
        <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p class="text-blue-500">{{ $t("back") }}</p>
      </div>
    </div>

    <div v-if="step == 0 && user != null">
      <h1 class="text-2xl text-center">{{ $t("home.give") }}</h1>

      <div class="user">
        <div class="flex items-center mt-6 oluvchi">
          <svg v-if="user.type == 1" width="60" height="60" viewBox="0 0 106 122" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM75.667 68.768L64.3571 114.375L56.7857 81.9688L64.3571 68.625H41.6429L49.2143 81.9688L41.6429 114.375L30.333 68.768C13.4629 69.5781 0 83.4699 0 100.65V110.562C0 116.877 5.08705 122 11.3571 122H94.6429C100.913 122 106 116.877 106 110.562V100.65C106 83.4699 92.537 69.5781 75.667 68.768Z"
              fill="#3182CE" />
          </svg>
          <svg v-if="user.type == 2 && user.gender == 1" width="60" height="60" viewBox="0 0 106 122" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z"
              fill="#3182CE" />
          </svg>
          <svg v-if="user.type == 2 && user.gender == 2" width="60" height="60" viewBox="0 0 106 122" style="fill: gray"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M102.245 78.4389L76.6753 65.9629L65.863 60.6868C66.1341 60.5115 66.3921 60.3127 66.6582 60.1273H80.8552C81.911 60.1273 82.9235 59.6983 83.67 58.9347C84.4165 58.1711 84.8359 57.1354 84.8359 56.0555V45.3414H84.8C84.3657 30.4102 79.2959 17.2744 71.6823 9.03722C67.6673 4.40588 62.4636 1.2593 56.6427 0.319C56.3831 0.275576 56.1235 0.235492 55.8623 0.200419C55.5618 0.162005 55.263 0.123592 54.9593 0.0985393C54.3069 0.0363055 53.652 0.00342735 52.9967 0H52.9935C52.3436 0 51.7019 0.0384139 51.0619 0.0951992C50.7549 0.121922 50.4512 0.160334 50.1475 0.198748C49.8928 0.232151 49.6397 0.268894 49.3883 0.312318C43.6148 1.23592 38.447 4.33406 34.4435 8.8986C26.7563 17.1275 21.6311 30.325 21.1935 45.3431H21.1592V56.0572C21.1592 57.1371 21.5786 58.1728 22.3251 58.9364C23.0716 59.7 24.0841 60.129 25.1399 60.129H39.3761C39.7647 60.3996 40.1517 60.6751 40.5533 60.9223L30.1982 65.8543L3.79948 78.4306C1.50542 79.5296 0 82.1751 0 85.1296V114.8C0 118.777 2.70878 122 6.05434 122H99.9457C103.291 122 106 118.777 106 114.8V85.1263C105.998 82.1818 104.516 79.5613 102.245 78.4389Z"
              fill="#3182CE" />
          </svg>

          <div class="user_text ml-6">
            <h5 class="text-center title">{{ $t("list.creditor") }} :</h5>
            <h5 class="text-sm" v-if="user.type == 2">
              {{ user.last_name }} {{ user.first_name }}
              {{ user.middle_name }}
            </h5>
            <h5 class="text-sm" v-if="user.type == 1">
              {{ user.company }}
            </h5>
          </div>
        </div>
        <div class="flex items-center mt-6 beruvchi">
          <svg v-if="$auth.user.type == 1" width="60" height="60" viewBox="0 0 106 122" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM75.667 68.768L64.3571 114.375L56.7857 81.9688L64.3571 68.625H41.6429L49.2143 81.9688L41.6429 114.375L30.333 68.768C13.4629 69.5781 0 83.4699 0 100.65V110.562C0 116.877 5.08705 122 11.3571 122H94.6429C100.913 122 106 116.877 106 110.562V100.65C106 83.4699 92.537 69.5781 75.667 68.768Z"
              fill="#3182CE" />
          </svg>
          <svg v-if="$auth.user.type == 2 && $auth.user.gender == 1" width="60" height="60" viewBox="0 0 106 122"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z"
              fill="#3182CE" />
          </svg>
          <svg v-if="$auth.user.type == 2 && $auth.user.gender == 2" width="60" height="60" viewBox="0 0 106 122"
            style="fill: gray" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M102.245 78.4389L76.6753 65.9629L65.863 60.6868C66.1341 60.5115 66.3921 60.3127 66.6582 60.1273H80.8552C81.911 60.1273 82.9235 59.6983 83.67 58.9347C84.4165 58.1711 84.8359 57.1354 84.8359 56.0555V45.3414H84.8C84.3657 30.4102 79.2959 17.2744 71.6823 9.03722C67.6673 4.40588 62.4636 1.2593 56.6427 0.319C56.3831 0.275576 56.1235 0.235492 55.8623 0.200419C55.5618 0.162005 55.263 0.123592 54.9593 0.0985393C54.3069 0.0363055 53.652 0.00342735 52.9967 0H52.9935C52.3436 0 51.7019 0.0384139 51.0619 0.0951992C50.7549 0.121922 50.4512 0.160334 50.1475 0.198748C49.8928 0.232151 49.6397 0.268894 49.3883 0.312318C43.6148 1.23592 38.447 4.33406 34.4435 8.8986C26.7563 17.1275 21.6311 30.325 21.1935 45.3431H21.1592V56.0572C21.1592 57.1371 21.5786 58.1728 22.3251 58.9364C23.0716 59.7 24.0841 60.129 25.1399 60.129H39.3761C39.7647 60.3996 40.1517 60.6751 40.5533 60.9223L30.1982 65.8543L3.79948 78.4306C1.50542 79.5296 0 82.1751 0 85.1296V114.8C0 118.777 2.70878 122 6.05434 122H99.9457C103.291 122 106 118.777 106 114.8V85.1263C105.998 82.1818 104.516 79.5613 102.245 78.4389Z"
              fill="#3182CE" />
          </svg>

          <div class="user__text ml-6">
            <h5 class="text-center title">{{ $t("list.debitor") }}:</h5>
            <h5 class="text-sm" v-if="user.type == 2">
              {{ $auth.user.last_name }} {{ $auth.user.first_name }}
              {{ $auth.user.middle_name }}
            </h5>
            <h5 class="text-sm" v-if="user.type == 1">
              {{ $auth.user.company }}
            </h5>
          </div>
        </div>

        <div class="mt-12">
          <div class="flex mb-4">
            <div class="w-6/12 flex items-center">
              <input type="radio" id="UZS" class="w-5 h-5 mr-2" v-model="currency" name="drone" value="UZS" checked />
              <label for="UZS" class="flex items-center"><img class="w-5 h-4" src="@/assets/img/uz.png" alt="" />
                {{ $t("process.uzs") }}</label>
            </div>
            <div class="w-6/12 flex items-center">
              <input type="radio" id="USD" class="w-5 h-5 mr-2" v-model="currency" name="drone" value="USD" />
              <label for="USD" class="flex items-center"><img class="w-5 h-4" src="@/assets/img/usa.png" alt="" />
                {{ $t("process.usd") }}</label>
            </div>
          </div>
          <!--  -->
          <input v-format="amount" :value="amount" ref="input" @input="setAmount" @keyup="changeAmount($event)"
            :placeholder="$t('placeholder.summo')" class="input" />
          <div class="form-date-picker mb-5">
            <date-picker v-model="end_date" value-type="YYYY-MM-DD" format="DD.MM.YYYY"
              :placeholder="$t('process.end_date')" :disabled-date="disabledDates"></date-picker>
          </div>

          <div class="flex items-center justify-center mt-6">
            <input @change="validate" class="w-4 h-4 mr-2" v-model="isAffirmed" type="checkbox" id="1" />
            <label style="cursor: pointer" @click="sendContract"
              class="ml-2 underline text-center text-blue-400 text-sm"> {{
                $t("process.err2") }}
            </label>
            <!-- <label for="1"><a href="https://pdf.zerox.uz/shartnoma.pdf" target="_blank" class="text-t_primary">
                {{ $t("process.err2") }}
              </a>
            </label> -->
          </div>

          <button @click="affirmContract" :disabled="isValidate" :class="isBtnDisabled ? 'bg-t_error' : 'bg-t_primary'"
            class="text-white mt-6 text-center font-bold w-full py-3 px-8 rounded">
            {{ $t("process.accept") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="step == 1" class="mt-4">
      <contract-give :contract="{ amount, currency, end_date, type: 'debitor' }" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    step: 0,
    amount: "",
    currency: "UZS",
    isAffirmed: false,
    isBtnDisabled: true,
    end_date: "",
    user: null,
  }),
  async created() {
    if (!this.$route.query.id) {
      return this.$router.go(-1);
    }
    const user = await this.$axios.$get(
      `/user/candidate/${this.$route.query.id}`
    );
    this.user = user.data;
    this.$auth.user2 = this.user.data;
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts:
      name: "home", // Use socket "home"
      channel: "/", // connect to '/index',
      secure: true,
    });
    if (this.$auth.user.is_active == 1 && this.$auth.user.is_contract == 0) {
      this.$router.push(this.localePath({ name: 'universal_contract' }));
    }
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
  // beforeCreate() {
  //   if (!this.$auth.user2 || this.$auth.user.id === this.$auth.user2.id) {
  //     return this.$router.go(-1);
  //   }
  //   let links = [{ title: "Pul berish", name: "-give" }];
  //   this.$store.commit("changeBreadCrumb", links);
  // },

  computed: {
    isValidate() {
      return this.amount && this.currency && this.isAffirmed ? false : true;
    },
  },
  //
  methods: {
    sendContract() {
      const url = `https://pdf.zerox.uz/free_contract.php?debitor=${this.$auth.user.uid}&creditor=${this.user.uid}&download=0&amount=${this.amount}&currency=${this.currency}&day=${this.end_date}`
      window.location.href = url;
    },
    nazad() {
      this.$router.push(this.localePath({
        name: `search-debitor`
      }));
    },
    async getSockNot() {
      this.socket.emit(
        "notification",
        { userId: this.$auth.user.id },
        (data) => { }
      );
    },

    disabledDates(date) {
      const today = new Date();
      today.setHours(1, 0, 0, 0);
      return date < today;
    },
    changeAmount(e) {
      let firstValue = e.target.value.split("")[0];
      console.log("va", firstValue);
      if (firstValue == 0) {
        e.target.value = e.target.value.slice(1, e.target.value.length);
      }
      // else{
      //   e.preventDefault()
      // }
    },
    validate() {
      if (this.amount == 0 || this.amount == null) {
        this.isBtnDisabled = true;
      }
      if (this.amount && this.currency && this.isAffirmed) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    },

    setEndDate(e) {
      const selectedDate = e.target.value;
      console.log(selectedDate);
      const configuredDate = new Date(selectedDate) - 1 + 86401;
      if (configuredDate > Date.now()) {
        this.end_date = selectedDate;
      } else {
        this.end_date = null;
      }

      this.validate();
    },

    setAmount(e) {
      const amount = [...e.target.value].filter((c) => c !== " ").join("");
      const reg = /^\d+$/;
      if (reg.test(amount)) {
        this.amount = amount;
        this.$refs.input.value = amount;
      } else {
        if (amount.length > 0) {
          this.$refs.input.value = this.amount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
      }

      this.validate();
    },

    async affirmContract() {
      if (this.currency == "UZS" && this.amount < 10000) {
        return this.$toast.error(`${$nuxt.$t('a1.50')}`);
      }
      if (!this.end_date) {
        return this.$toast.error(`${$nuxt.$t('a1.49')}`);
      }
      const contract = {
        debitor: this.$auth.user.id,
        creditor: this.user.id,
        amount: Number(this.amount),
        currency: this.currency,
        end_date: this.end_date,
        reciver: this.user.id,
        res: this.user.id,
        sender: this.$auth.user.id,
        type: this.$auth.user.type == 1 && this.user.type == 1 ? 1 : 0,
      };
      // return console.log(contract);
      if (this.end_date) {
        try {
          const response = await this.$axios.post("/contract/create", contract);
          if (response.data.msg == "date") {
            return this.$toast.error(`${$nuxt.$t('a1.49')}`);
          }
          this.getSockNot()
          this.$toast.success(`${$nuxt.$t('a1.48')}`);
          this.$router.push(this.localePath({ name: 'index' }));
        } catch (e) {
          this.$toast.error(`${$nuxt.$t('a1.a42')}`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.date {
  outline: none;
  margin: 5px 0;
  border: none;
}

.date:focus {
  outline: none;
  border: none;
}

.user__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.user {
  padding: 0 2rem;
  max-width: 500px;
}

.input {
  border: 1px solid #8692a6;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px auto;
  font-size: 15px;
  height: 50px;
  padding-left: 10px;
  border-radius: 5px;
  transition: all 0.2s ease;
}

.oluvchi {
  .title {
    color: #fe5e58;
  }
}

.beruvchi {
  .title {
    color: #48bb78;
  }
}

input:focus {
  outline: none;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border: 1px solid #1565d8;
}
</style>
