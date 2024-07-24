<template>
  <div class="auth rounded">
    <div class="box rounded">
      <div class="left ml-4 mt-4">
        <div class="flex">
          <div>

            <svg width="74" height="128" viewBox="0 0 74 128" fill="none" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M0 0H74V128H0V0Z" fill="url(#pattern0)" />
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_254_4464" transform="scale(0.0135135 0.0078125)" />
                </pattern>
                <image id="image0_254_4464" width="74" height="128"
                  xlink:href="data:image/png;base64,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" />
              </defs>
            </svg>

          </div>
          <div class="telefon ml-4">
            <span>{{ $t('debt_list.a80') }}
            </span>
            <p>
              {{ $t('debt_list.a69') }}: ( 0 371 ) 202-32-32
            </p>

          </div>
        </div>
        <div class="flex1">
          <p>
            {{ $t('debt_list.a85') }}:
          </p>
          <span>
          </span>
          <div class="span">
            Sayt: zerox.uz
          </div>
        </div>
        <div class="flex2">
          <p>{{ $t('debt_list.a81') }}:</p>
          <p> - {{ $t('debt_list.a82') }} </p>
          <p> - {{ $t('debt_list.a84') }}</p>
        </div>
      </div>


      <div class="lg:inline-flex items-center right rounded align-middle">
        <div class="mt-14">
          <center>
            <h1>ERI orqali kirish</h1>
          </center>

          <div v-if="step === 0" class="mb-3 mx-auto py-6 ">
            <select v-model="selectedKey" class="
          form-select
          appearance-none
          uppercase
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600
          focus:outline-none
        " aria-label="Default select example">
              <option class="uppercase" :selected="item.serialNumber" :value="item.serialNumber" :key="i"
                v-for="(item, i) in keys" v-if="item.inn[0] == 3 || item.inn[0] == 2 || item.inn[0] == 4">
                <span class="uppercase">

                  {{ item.inn }} - {{ item.parsedAlias.cn }}
                </span>
              </option>
            </select>
            <div @click="sign" style="cursor: pointer" class="
          flex
          justify-center
          mt-4
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
        ">
              <button @click="step === 0 ? $router.push({ name: 'index___' + $i18n.locale }) : step--"
                style="cursor: pointer">{{ $t('login.logIn') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div v-if="step === 1">
      <div class="flex justify-center items-center" style="margin-top: 5rem">
        <div style="width: 26.6rem">
          <p class="text-t_secondary mb-2"> {{ $t('user.tel') }}</p>

          <vue-tel-input style="
              padding: 0.5rem 0;
              border: 1px solid #1565d8;
              border-radius: 5px;
            " @input="removeSpace" v-mask="'+998 ## ### ## ##'" v-model="phone"></vue-tel-input>
          <!-- <h3 class="text-t_error" v-if="!$v.phone.required && check2">
            Telefon raqamni kiriting
          </h3> -->
          <button @click="sendPhone" class="
              bg-t_primary
              hover:bg-blue-700
              text-white
              mt-6
              py-4
              px-4
              mb-6
              rounded
              w-full
            ">
            {{ $t('debt_list.a20') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="step === 2">
      <div class="flex justify-center items-center" style="margin-top: 5rem">
        <div style="width: 26.6rem">
          <h2 class="font-bold text-2xl"> {{ $t('debt_list.a38') }} </h2>
          <p class="text-gray-500 my-5">
            {{ $t('a1.a04') }}
          </p>
          <hr class="hr_line my-5" />
          <p class="text-t_secondary mb-2">{{ $t('debt_list.a52') }}</p>

          <input v-model="code" type="text" class="input"
            style="border: 1px solid #1565d8; padding: 1rem; border-radius: 5px" :placeholder="$t('a1.a02')"
            v-mask="" />

          <button @click="sendAllData" class="
              bg-t_primary
              hover:bg-blue-700
              text-white
              mt-6
              py-4
              px-4
              rounded
              w-full
            ">
            {{ $t('debt_list.a20') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
import { required } from "vuelidate/lib/validators";

import {
  startApi,
  getAllCertificates,
  preLoadKey,
  postLoadKey,
} from "@/services/eimzo/index";

export default {
  components: {
    VueTelInput,
  },
  validations: {
    phone: {
      required,
    },
  },
  mounted() {
    this.getEspData();
  },
  data: () => ({
    selectedKey: "",
    selectedUser: {},
    keys: null,
    code: "",
    phone: "",
    step: 0,
    result: null,
  }),
  methods: {
    removeSpace(e) {
      this.login.phone = e.trim();
    },

    findUserBySerialNumber(keys, serialNumber) {
      return keys.find((key) => key.serialNumber == serialNumber);
    },

    async getEspData() {
      try {
        startApi();
        getAllCertificates().then((res) => {
          this.keys = res;
          this.selectedKey = res[0].serialNumber;
          console.log(this.keys[0].parsedAlias)
        });
      } catch (e) {
        this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },

    sendAllData() {
      this.legalRegister({
        status: 2,
        phone: this.phone
          .split("")
          .filter((el) => el !== " ")
          .join(""),
        code: this.code,
        ...this.collectedData(),
      });
    },

    sendPhone() {
      this.legalRegister({
        status: 1,
        phone: this.phone
          .split("")
          .filter((el) => el !== " ")
          .join(""),
        ...this.collectedData(),
      });
    },

    collectedData() {
      const user = this.findUserBySerialNumber(this.keys, this.selectedKey);

      return {
        company: user.parsedAlias.o.toUpperCase(),
        director: user.parsedAlias.cn.toUpperCase(),
        address:
          user.parsedAlias.st.toUpperCase() +
          " " +
          user.parsedAlias.l.toUpperCase(),
        stir: user.inn.toUpperCase(),
      };
    },

    async legalRegister(data) {
      try {
        const response = await this.$axios.post("/user/legal", data);
        console.log(response);
        if (response.data.token) {
          this.$auth.strategy.token.set(response.data.token);
          const res = await this.$axios.get("user/me");
          this.$auth.setUser(res.data.data);
          this.$router.push({ name: "index___" + this.$i18n.locale });
        }

        if (response.data.message === "not-active") {
          if (this.step === 2) return false;
          this.step++;
        }
        if (response.data.message === "code-send") {
          if (this.step === 2) return false;
          this.step++;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async sign() {
      this.result = "";
      try {
        const keyId = await preLoadKey(
          this.keys.find((item) => item?.serialNumber === this.selectedKey)
        );
        const key = await postLoadKey(keyId);
        this.result = this.keys;

        this.legalRegister(this.collectedData());
      } catch (e) {
        this.$toast.error(" Elektron raqamli imzo paroli noto‘g‘ri");
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.esp {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99999;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  background: rgba(0, 0, 0, 0.408);
}

.esp_card {
  width: 600px;
  height: 380px;
  background: white;
  margin-top: 5rem;
  border-radius: 6px;
}

.esp_body {
  display: flex;
  align-items: center;
  height: 80%;
}

.esp_container {
  width: 150px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
}

.error-login {
  font-size: 16px;
  color: red;
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
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

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

.box {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  background: #ffffff;
  height: 400px;


}

.right {
  background: #eaf3ff;
  width: 60%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

}

.left {
  padding: 10px;
  width: 50%;

}

.flex {
  display: flex;
  align-items: center;

}

.telefon span {
  font-size: 14px;
  font-family: Philosopher, sans-serif;
  text-transform: uppercase;
  color: #74d468;
  margin-top: 10px;
}

.telefon p {
  display: block;
  font-size: 12px;
  color: #b7b7b7;
}

.telefon h1 {
  font-size: 14px;
  font-family: OpenSans-Bold, sans-serif;
  padding-top: 0;
}

.flex img {
  display: block;
  width: 100px;
  margin-right: 20px;
  font-size: 80px;
  height: 125px;
  padding: 18px;

}

.flex1 p {
  margin-top: 40px;
}

.flex1 span {
  font-size: 19px;
  font-weight: 700;

}

.flex1 .span {
  font-size: 13px;
  color: #777;
  margin-bottom: 30px;
}

.flex2 p {
  font-weight: 500;
  font-size: 14px;



}
</style>
