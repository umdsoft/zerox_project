<template>
  <div class="auth bg-white rounded pt-4 px-4">
    <div @click="step == 1 ? $router.go(-1) : step--" class="my-2 mx-6 hidden lg:inline-flex items-center"
      style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500" @click="stepBack">{{ $t("back") }}</p>
    </div>
    <div v-if="step == 1">
      <div class="flex justify-center items-center" style="margin-top: 5rem">
        <div style="width: 26.6rem">
          <h2 class="font-bold text-2xl">{{ $t("debt_list.a38") }}</h2>
          <p class="text-gray-500 my-5">{{ $t("debt_list.a50") }}</p>
          <hr class="hr_line my-5" />
          <vue-tel-input style="
              padding: 0.5rem 0;
              border: 1px solid #1565d8;
              border-radius: 5px;
            " @input="removeSpace" v-mask="'+998 ## ### ## ##'" v-model="phone"></vue-tel-input>
          <h3 class="text-t_error" v-if="!$v.phone.required && check2">
            {{ $t("debt_list.a51") }}
          </h3>
          <button @click="sendPhone" class="bg-t_primary hover:bg-blue-700 text-white mt-6 py-4 px-4 rounded w-full">
            {{ $t("debt_list.a20") }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="step == 2">
      <div>
        <div class="flex justify-center items-center" style="margin-top: 5rem">
          <div style="width: 26.6rem">
            <h2 class="font-bold text-2xl">{{ $t("debt_list.a53") }}</h2>
            <p class="text-gray-500 my-5">
              {{ $t("debt_list.a54") }}
            </p>
            <hr class="hr_line my-5" />

            <input v-model="code" type="text" router class="input" style="
                border: 1px solid #1565d8;
                padding: 1rem;
                border-radius: 5px;
              " :placeholder="$t('placeholder.a60')" />
            <h3 class="text-t_error" v-if="!$v.code.required && check2">
              {{ $t("debt_list.a55") }}
            </h3>

            <button @click="sendCode" class="bg-t_primary hover:bg-blue-700 text-white mt-6 py-4 px-4 rounded w-full">
              {{ $t("debt_list.a20") }}
            </button>
            <div class="mt-20 flex">
              <button class="bg-t_primary w-24 text-xs p-2 rounded mr-3 text-white" v-if="isBtn == true" @click="timer">
                {{ $t('a1.a34') }}
              </button>
              <button class="rounded w-24 p-4 border-solid border-2 border-black">
                {{ waitingTime }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="step == 3">
      <div class="flex justify-center items-center" style="margin-top: 5rem">
        <div style="width: 26.6rem">
          <h2 class="font-bold text-2xl">{{ $t("debt_list.a56") }}</h2>
          <hr class="hr_line my-5" />

          <p class="text-t_secondary my-2">
            {{ $t("debt_list.a58") }}
          </p>
          <div class="input__wrapper">
            <input ref="password" v-model.trim="$v.password.password.$model" v-model="message" type="password"
              :placeholder="$t('placeholder.a61')" @input="password_check" class="input" />
            <!--  -->
            <svg style="margin-right: 15px; cursor: pointer" @click="tooglePassword" class="h-6 w-6 text-blue-500"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>

          <h3 class="text-t_error" v-if="!$v.password.password.required && submitPassword">
            {{ $t("login.password") }}
          </h3>

          <div id="app">
            <p class="frmValidation" :class="{ 'frmValidation--passed': has_uppercase }">
              <i class="frmIcon fas" :class="has_uppercase ? 'fa-check' : 'fa-times'"></i>
              {{ $t("debt_list.a26") }}
            </p>
            <p class="frmValidation" :class="{ 'frmValidation--passed': message.length > 8 }">
              <i class="frmIcon fas" :class="message.length > 7 ? 'fa-check' : 'fa-times'"></i>
              {{ $t("debt_list.a27") }}
            </p>
            <p class="frmValidation" :class="{ 'frmValidation--passed': has_lowercase }">
              <i class="frmIcon fas" :class="has_lowercase ? 'fa-check' : 'fa-times'"></i>
              {{ $t("debt_list.a28") }}
            </p>
            <p class="frmValidation" :class="{ 'frmValidation--passed': has_number }">
              <i class="frmIcon fas" :class="has_number ? 'fa-check' : 'fa-times'"></i>
              {{ $t("debt_list.a29") }}
            </p>
            <p class="frmValidation" :class="{ 'frmValidation--passed': has_special }">
              <i class="frmIcon fas" :class="has_special ? 'fa-check' : 'fa-times'"></i>
              {{ $t("debt_list.a25") }}
            </p>

            <p v-if="message?.length" class="frmValidation" :class="{ 'frmValidation--passed': has_probel }">
              <i class="frmIcon fas" :class="has_probel ? 'fa-check' : 'fa-times'"></i>
              {{ $t('a1.a24') }}
            </p>
          </div>


          <div class="input__wrapper mt-2">
            <input ref="confirmPassword" v-model.trim="$v.password.confirmPassword.$model" :placeholder="$t('a1.a67')"
              type="password" class="input" />
            <svg style="margin-right: 15px; cursor: pointer" @click="confirmTooglePassword"
              class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>

          <h3 class="text-t_error" v-if="!$v.password.confirmPassword.sameAs && submitPassword">
            {{ $t("debt_list.a61") }}
          </h3>

          <button @click="sendAllData" class="bg-t_primary hover:bg-blue-700 text-white mt-6 py-4 px-4 rounded w-full">
            {{ $t("debt_list.a32") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
import { required, minLength, helpers, sameAs } from "vuelidate/lib/validators";
const alpha = helpers.regex(
  "alpha",
  /^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]))).{6,32}$/
);

export default {
  data: () => ({
    message: "",
    has_number: false,
    has_lowercase: false,
    has_uppercase: false,
    has_special: false,
    has_probel: false,
    step: 1,
    phone: "",
    code: "",
    check2: false,
    isBtn: false,
    password: {
      password: "",
      confirmPassword: "",
    },
    submitPassword: false,
    intervalSecond: null,
    time: 120,
  }),
  validations: {
    phone: {
      required,
    },
    code: {
      required,
    },
    password: {
      password: { required, alpha },
      confirmPassword: {
        required,
        sameAs: sameAs(function () {
          return this.password.password;
        }),
      },
    },
  },
  created() {
    let links = [{ title: "Ro‘yhatdan o‘tish", name: "auth-register" }];
    this.$store.commit("changeBreadCrumb", links);
  },
  mounted() {
    if (this.step == 2) {
      this.startTimer();
    }
  },
  computed: {
    waitingTime() {
      let minute = parseInt(this.time / 60);
      let second = this.time % 60;
      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      return `${minute}:${second}`;
    },
  },
  methods: {
    removeSpace(e) {
      this.phone = e.trim();
    },
    password_check: function () {
      this.has_number = /\d/.test(this.message);
      this.has_lowercase = /[a-z]/.test(this.message);
      this.has_uppercase = /[A-Z]/.test(this.message);
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(this.message);
      this.has_probel = !/\s/.test(this.message);
    },

    tooglePassword() {
      if (this.$refs.password.type == "password") {
        this.$refs.password.type = "text";
      } else {
        this.$refs.password.type = "password";
      }
    },

    confirmTooglePassword() {
      if (this.$refs.confirmPassword.type == "password") {
        this.$refs.confirmPassword.type = "text";
      } else {
        this.$refs.confirmPassword.type = "password";
      }
    },

    stepBack() {
      this.check2 = false;
      if (this.step == 1) {
        return this.$router.push({ name: 'auth-login___' + $i18n.locale });
      }
      this.step = this.step - 1;
    },
    async timer() {
      const phone = this.phone
        .split("")
        .filter((el) => el !== " ")
        .join("");
      const data = {
        phone,
      };
      const response = await this.$axios.post("/user/phoneChange", data);
      if (response.status == 200) {
        this.startTimer();
      }
    },
    async sendPhone() {
      const phone = this.phone
        .split("")
        .filter((el) => el !== " ")
        .join("");
      console.log("sa", phone.length)
      try {
        if (phone.length != 13) {
          return this.$toast.error(
            "Telefon raqamingizni to‘g‘ri kiriting."
          );
        }
        const data = {
          phone,
          step: this.step,
          type: 2,
        };
        const response = await this.$axios.post("/user/register", data);
        if (response.status == 200 && response.data.success == false && response.data.message == "user-already-exist") {
          return this.$toast.error($nuxt.$t("a1.a61"))
        }
        if (response.status == 200) {
          this.stepGo();
        }
      } catch (e) {
        this.$toast.error(
          $nuxt.$t("a1.a61")
        );
      }
    },
    startTimer() {
      this.intervalSecond = setInterval(() => {
        if (this.time > 0) {
          this.isBtn = false;
          this.time = this.time - 1;
        } else {
          clearInterval(this.intervalSecond);
          this.status = 5;
          this.time = 120;
          this.isBtn = true;
        }
      }, 1000);
    },
    async sendAllData() {
      this.submitPassword = true;
      const phone = this.phone
        .split("")
        .filter((el) => el !== " ")
        .join("");

      this.$v.password.$touch();

      if (
        !this.$v.password.$invalid &&
        this.has_number &&
        this.has_lowercase &&
        this.has_uppercase &&
        this.has_special &&
        this.has_probel
      ) {
        this.check2 = false;
        try {
          if (/\s/.test(this.password.password)) {
            return this.$toast.error(`${$nuxt.$t('a1.a42')}`);
          }
          const response = await this.$axios.post("/user/register", {
            phone,
            code: this.code,
            password: this.password.password,
            step: this.step,
          });
          if (response.status == 200) {
            this.$toast.success($nuxt.$t("a1.a62"));
            this.$router.push(this.localePath({ name: 'auth-login' }));
          }
        } catch (e) {
          this.$toast.error(`${$nuxt.$t('a1.a42')}`);
        }
      }
    },

    async sendCode() {
      const phone = this.phone
        .split("")
        .filter((el) => el !== " ")
        .join("");

      try {
        const response = await this.$axios.post("/user/register", {
          phone,
          code: this.code,
          step: this.step,
        });

        if (response.status == 200) {
          this.step = 3;
          // console.log("sdsd", this.step);
        }
      } catch (e) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);

      }
    },
    stepGo() {
      this.check2 = true;
      this.$v.phone.$touch();
      this.$v.code.$touch();

      if (this.step == 1) {
        if (!this.$v.phone.$invalid) {
          this.check2 = false;
          this.step = this.step + 1;
        }
        if (this.step == 2) {
          this.startTimer();
        }
      }

      if (!this.$v.code.$invalid) {
        this.check2 = false;
        this.step = this.step + 1;
      }
    },
  },
};
</script>

<style lang="css" scoped>
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

.input__wrapper {
  border: 1px solid #1565d8;
  width: 100%;
  display: flex;
  padding: 13px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  height: 50px;
  transition: all 0.2s ease;
}

.input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  text-indent: 10px;
}

.input__wrapper:focus {
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
}

.frmField {
  background-color: white;
  color: #495057;
  line-height: 1.25;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: 0;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 90%;
}

.frmLabel {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.frmValidation {
  font-size: 13px;
}

.frmValidation--passed {
  color: #717b85;
}

.frmIcon {
  color: #eb0029;
}

.frmValidation--passed .frmIcon {
  color: #0fa140;
}

.howToBuild {
  text-align: center;
  color: purple;
}

.howToBuild a {
  color: grey;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
