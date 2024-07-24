<template>
  <div class="auth bg-white pt-4 px-4">
    <div v-if="step == 1">
      <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
        <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p class="text-blue-500">{{ $t("back") }}</p>
      </div>
    </div>

    <div class="flex justify-center items-center" style="margin-top: 5rem">
      <div style="width: 26.6rem">
        <h2 class="font-bold text-2xl">{{ $t("debt_list.a23") }}</h2>

        <hr class="hr_line my-5" />
        {{ $t("a1.a25") }}

        <hr class="hr_line my-5" />
        <input v-model="password.oldPassword" :type="inputTypeIcon" class="input mb-5"
          :placeholder="$t('a1.a44')" />
        <div class="boxs">
          <input v-model="password.password" :type="inputTypeIcon" class="input mb-5"
            :placeholder="$t('a1.a45')" @input="password_check" />
          <button class="b mr-">
            <button class="input-group-text" @click.prevent="ToggleButtonIcon">
              <i v-if="inputTypeIcon == 'password'" class="fas fa-eye"></i>
              <i v-else class="fas fa-eye-slash"></i>
            </button>
          </button>
        </div>
        <h3 class="text-t_error" v-if="!$v.password.password.required && check2">
          {{ $t("debt_list.a22") }}
        </h3>
        <div id="app">
          <p class="frmValidation" :class="{ 'frmValidation--passed': has_uppercase }">
            <i class="frmIcon fas" :class="has_uppercase ? 'fa-check' : 'fa-times'"></i>
            {{ $t("debt_list.a26") }}
          </p>
          <p class="frmValidation" :class="{ 'frmValidation--passed': password.password.length > 8 }">
            <i class="frmIcon fas" :class="password.password.length > 7 ? 'fa-check' : 'fa-times'"></i>
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
          <p v-if="password.password.length" class="frmValidation" :class="{ 'frmValidation--passed': has_probel }">
            <i class="frmIcon fas" :class="has_probel ? 'fa-check' : 'fa-times'"></i>
            {{ $t('a1.a24') }}
          </p>
        </div>

        <input v-model="password.confirmPassword" type="password" class="input mt-5"
          :placeholder="$t('a1.a46')" />
        <h3 class="text-t_error" v-if="!$v.password.confirmPassword.required && check2">
          {{ $t("debt_list.a30") }}
        </h3>
        <h3 class="text-t_error" v-if="$v.password.confirmPassword.required &&
          !$v.password.confirmPassword.sameAs &&
          check2
        ">
          {{ $t("debt_list.a31") }}
        </h3>
        <button @click="stepGo" class="bg-t_primary hover:bg-blue-700 text-white mt-6 py-4 px-4 rounded w-full">
          {{ $t("debt_list.a32") }}
        </button>
      </div>
    </div>
  </div>
</template>
<!--  -->
<script>
import { required, minLength, helpers, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      has_probel: false,
      step: 1,
      check2: false,
      secretWord: "",
      inputType: "password",
      inputTypeIcon: "password",
      ShowPassword: "Show Password",
      HidePassword: "Hide Password",
      password: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  validations: {
    secretWord: { required },
    password: {
      password: {
        required,
      },
      confirmPassword: {
        required,
        sameAs: sameAs(function () {
          return this.password.password;
        }),
      },
    },
  },

  created() {
    let links = [{ title: "Parolni tiklash", name: "auth-forgot" }];
    this.$store.commit("changeBreadCrumb", links);
  },
  methods: {
    stepBack() {
      this.check2 = false;
      if (this.step == 1) {
        return (this.step = 1);
      }

      this.step = this.step - 1;
    },
    password_check: function () {
      this.has_number = /\d/.test(this.password.password);
      this.has_lowercase = /[a-z]/.test(this.password.password);
      this.has_uppercase = /[A-Z]/.test(this.password.password);
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password.password);
      this.has_probel = !/\s/.test(this.password.password);
    },
    ToggleButton() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },
    ToggleButtonIcon() {
      this.inputTypeIcon =
        this.inputTypeIcon === "password" ? "text" : "password";
    },

    async stepGo() {
      if (this.password.password == '') {
        return this.$toast.error("Parolni kiriting");
      }
      if (/\s/.test(this.password.password) && !/\d/.test(this.password.password) && !/[a-z]/.test(this.password.password) && !/[A-Z]/.test(this.password.password) && !/[!@#\$%\^\&*\)\(+=._-]/.test(this.password.password)) {
        return this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
      if (this.password.password == null) {
        return (this.check2 = true);
      }
      if (this.password.password != this.password.confirmPassword) {
        return this.$toast.error("Parol mos emas!");
      }
      const response = await this.$axios.post("/user/edit-password", {
        old: this.password.oldPassword,
        password: this.password.password,
      });
      if (response.data.msg == "err") {
        return this.$toast.error(`Joriy parol mos kelmadi!`);
      }
      if (response.data.msg == "err-secret") {
        return this.$toast.error(`${$nuxt.$t("debt_list.a01")}`);
      }

      if (response.data.msg == "suc-password") {
        this.$toast.success(`${$nuxt.$t('a1.a43')}`);
        return this.$router.push(this.localePath({ name: `index` }));
      }
      return this.$toast.error(`${$nuxt.$t('a1.a42')}`);
    }
    //
  },
};
</script>

<style lang="scss" scoped>
.boxs {
  position: relative;

  svg {
    cursor: pointer;
    opacity: 0.5;
    width: 20px;
  }

  .b {
    position: absolute;
    right: 10px;
    top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

body {
  background-color: #efefef;
}

.container {
  width: 400px;
  margin: 50px auto;
  background: white;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif, sans-serif;
  border-radius: 3px;
}

h1 {
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
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
