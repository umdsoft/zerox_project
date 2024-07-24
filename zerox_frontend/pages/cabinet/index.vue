<template>
  <div class="rounded-xl bg-white py-4 block">
    <div v-if="isModalVisible" class="modal__bg">

      <div class="modal__window">
        <p class="text-center font-bold">{{ $t('a1.a06') }}</p>
        <br>
        <div class=" grid grid-cols-2 items-center gap-2">
          <button @click="toogleModal" class="text-white bg-t_primary text-center font-bold w-full py-3 px-8 rounded">
            {{ $t('a1.a013') }}
          </button>
          <button @click="$auth.logout()"
            class="text-white bg-t_primary text-center font-bold w-full py-3 px-8 rounded">
            {{ $t('a1.a07') }}
          </button>
        </div>
      </div>
    </div>
    <div class="container rounded-xl justify-center">
      <div class="flex items-center justify-between">
        <button @click="$router.go(-1)" class="button p-2 text-blue-500 rounded items-center flex justify-end"
          style="gap: 14px">
          <svg width="10" height="16" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.8625 2.225L8.37916 0.75L0.137497 9L8.3875 17.25L9.8625 15.775L3.0875 9L9.8625 2.225Z"
              fill="#3182CE" />
          </svg>
          <span> {{ $t('back') }} </span>
        </button>
        <button @click="toogleModal" class="button text-white p-2 bg-red-500 rounded items-center flex justify-end"
          style="gap: 14px">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.001" viewBox="0 0 18 18.001">
            <path id="logout-Icon-SVG-098767893"
              d="M5.808,13.782v1.406A2.816,2.816,0,0,0,8.621,18h7.067A2.816,2.816,0,0,0,18.5,15.188V2.813A2.816,2.816,0,0,0,15.687,0H8.621A2.816,2.816,0,0,0,5.808,2.813V4.219a.7.7,0,0,0,1.406,0V2.813A1.408,1.408,0,0,1,8.621,1.406h7.067a1.408,1.408,0,0,1,1.406,1.406V15.188a1.408,1.408,0,0,1-1.406,1.406H8.621a1.408,1.408,0,0,1-1.406-1.406V13.782a.7.7,0,0,0-1.406,0ZM1.014,7.793,2.589,6.218a.7.7,0,0,1,.994.994l-1.12,1.12h8.443a.7.7,0,1,1,0,1.406H2.463l1.12,1.12a.7.7,0,1,1-.994.994L1.014,10.279A1.76,1.76,0,0,1,1.014,7.793Zm0,0"
              transform="translate(-0.5)" fill="white" />
          </svg>
          <span> {{ $t('a1.a05') }} </span>
        </button>
      </div>
      <div class="flex rounded-xl px-4 py-6" style="width: 100%" v-if="user != null">
        <div class="bg-white rounded py-4" style="width: 500px">
          <div class="flex flex-col items-center border-b pb-4 border-blue-300">
            <svg v-if="user.type == 1" width="150" height="150" viewBox="0 0 106 122" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM75.667 68.768L64.3571 114.375L56.7857 81.9688L64.3571 68.625H41.6429L49.2143 81.9688L41.6429 114.375L30.333 68.768C13.4629 69.5781 0 83.4699 0 100.65V110.562C0 116.877 5.08705 122 11.3571 122H94.6429C100.913 122 106 116.877 106 110.562V100.65C106 83.4699 92.537 69.5781 75.667 68.768Z"
                fill="#3182CE" />
            </svg>
            <!--  -->
            <svg v-if="user.type == 2 && user.gender == 1" width="150" height="150" viewBox="0 0 106 122" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z"
                fill="#3182CE" />
            </svg>
            <svg v-if="user.gender === null" width="150" height="150" viewBox="0 0 106 122" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z"
                fill="#3182CE" />
            </svg>
            <svg v-if="user.type == 2 && user.gender == 2" width="150" height="150" viewBox="0 0 106 122"
              style="fill: gray" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M102.245 78.4389L76.6753 65.9629L65.863 60.6868C66.1341 60.5115 66.3921 60.3127 66.6582 60.1273H80.8552C81.911 60.1273 82.9235 59.6983 83.67 58.9347C84.4165 58.1711 84.8359 57.1354 84.8359 56.0555V45.3414H84.8C84.3657 30.4102 79.2959 17.2744 71.6823 9.03722C67.6673 4.40588 62.4636 1.2593 56.6427 0.319C56.3831 0.275576 56.1235 0.235492 55.8623 0.200419C55.5618 0.162005 55.263 0.123592 54.9593 0.0985393C54.3069 0.0363055 53.652 0.00342735 52.9967 0H52.9935C52.3436 0 51.7019 0.0384139 51.0619 0.0951992C50.7549 0.121922 50.4512 0.160334 50.1475 0.198748C49.8928 0.232151 49.6397 0.268894 49.3883 0.312318C43.6148 1.23592 38.447 4.33406 34.4435 8.8986C26.7563 17.1275 21.6311 30.325 21.1935 45.3431H21.1592V56.0572C21.1592 57.1371 21.5786 58.1728 22.3251 58.9364C23.0716 59.7 24.0841 60.129 25.1399 60.129H39.3761C39.7647 60.3996 40.1517 60.6751 40.5533 60.9223L30.1982 65.8543L3.79948 78.4306C1.50542 79.5296 0 82.1751 0 85.1296V114.8C0 118.777 2.70878 122 6.05434 122H99.9457C103.291 122 106 118.777 106 114.8V85.1263C105.998 82.1818 104.516 79.5613 102.245 78.4389Z"
                fill="#3182CE" />
            </svg>

            <span class="text-center font-bold mt-4 px-2" v-if="user.type == 2">{{ user.last_name }} {{ user.first_name
              }}
              {{ user.middle_name }}</span>
            <span class="text-center font-bold mt-4 px-2" v-if="user.type == 1">{{ user.company }}</span>
          </div>

          <div class="mt-4 pr-4 pl-4 items-center flex justify-between">
            <p class="text-sm text-center">{{ $t('transfer.id') }}</p>
            <p class="text-blue-400 text-sm">{{ user.uid }}</p>
          </div>

          <div class="px-4">

            <nuxt-link v-if="user.type == 2" :to="localePath({ name: 'repassword' })"
              class="bg-blue-400 w-full hover:bg-blue-500 mt-3 block text-center py-2 text-white text-sm rounded bt b">
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
              <span>
                {{ $t('a1.a08') }}
              </span>
            </nuxt-link>
            <span v-if="$auth.user.is_active == 1">
              <button @click="clickOferta(user.uid)" v-if="$auth.user.is_contract != 0"
                class="bt bg-blue-400 w-full hover:bg-blue-500 mt-3 block text-center py-2 text-white text-sm rounded">
                <svg class="mr-5" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z" />
                </svg>
                {{ $t('a1.a09') }}
              </button>
            </span>
          </div>
        </div>

        <div class="w-full ml-4">
          <table class="table-auto w-full rounded bg-white border-collapse border border-blue-300"
            v-if="user.type == 2">
            <tbody>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  {{ $t('a1.a10') }}
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.brithday }}
                </td>
              </tr>

              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">{{ $t('a1.a30') }}</td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.passport }}
                </td>
              </tr>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">{{ $t('a1.a31') }}</td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.pinfl }}
                </td>
              </tr>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  {{ $t('a1.a11') }}
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  <span v-if="user.is_active == 1"> {{ user.region }},
                    {{ user.district }}
                    ,
                    {{ user.address }}</span>
                </td>
              </tr>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2"> {{ $t('user.tel') }} </td>
                <td class="border border-blue-300 px-4 py-2">
                  <div class="flex align-center justify-between">
                    <span class="mr-4"> {{ user.phone }}</span>
                    <nuxt-link :to="localePath({ name: 'rephone' })" class="flex align-center text-t_primary">
                      <span class="pan w-4 h-4 mr-2">
                        <svg class="fill-blue-300" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                          <path
                            d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                        </svg>
                      </span>

                    </nuxt-link>
                  </div>
                </td>
              </tr>

              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  {{ $t('a1.a12') }}
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ dateFormat(user.created_at) }} {{ $t('user.year') }}
                </td>
              </tr>

            </tbody>

          </table>
          <table class="table-auto w-full rounded bg-white border-collapse border border-blue-300"
            v-if="user.type == 1">
            <tbody>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  Rahbar
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.director }}
                </td>
              </tr>

              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">STIR</td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.stir }}
                </td>
              </tr>

              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  Yuridik manzil
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ user.address }}
                </td>
              </tr>
              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2"> {{ $t('user.tel') }} </td>
                <td class="border border-blue-300 px-4 py-2">
                  <div class="flex align-center justify-between">
                    <span class="mr-4"> {{ user.phone }}</span>
                    <nuxt-link :to="localePath({ name: 'rephone' })" class="flex align-center text-t_primary">
                      <span class="pan w-4 h-4 mr-2">
                        <svg class="fill-blue-300" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                          <path
                            d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                        </svg>
                      </span>

                    </nuxt-link>
                  </div>
                </td>
              </tr>

              <tr class="border border-blue-300">
                <td class="border border-blue-300 px-4 py-2">
                  {{ $t('a1.a12') }}
                </td>
                <td class="border border-blue-300 px-4 py-2">
                  {{ dateFormat(user.created_at) }} {{ $t('user.year') }}
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      </div>
    </div>

  </div>
</template>
<!--  -->
<script>
import dateformat from "dateformat";
export default {
  middleware: "auth",
  data: () => ({
    isModalVisible: false,
    user: null,
    phoneChange: {
      step: 1,
      modal: true,
      phone: "+998 ",
      code: "",
      errorCode: false,
    },
  }),
  async mounted() {
    if (this.$auth.user.is_active == 1 && this.$auth.user.is_contract == 0) {
      this.$router.push(this.localePath({ name: 'universal_contract' }));
    }
    const mee = await this.$axios.$get(`/user/candidate/${this.$auth.user.uid}`);
    this.user = mee.data
  },
  methods: {
    phoneCheck() {
      // this.$axios.$post("phone/change", {
      //   phone: phoneChange.phone,
      // });
      this.phoneChange.step = 2;
    },
    phoneKeyup(e) {
      if (e.target.value.length < 5) {
        e.target.value = "+998 ";
      }
    },
    clickOferta(id) {
      const url = `https://pdf.zerox.uz/oferta.php?id=${id}&lang=uz&download=0`
      window.location.href = url;
    },
    toogleModal() {
      this.isModalVisible = !this.isModalVisible;
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

<style scoped>
.modal__bg {
  position: fixed;
  width: 100vw;
  z-index: 999999999999999999;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.665);
}

.modal__window {
  width: 400px;
  padding: 1rem;
  background: white;
  border-radius: 10px;
}

.jad td tr {
  padding: 0.8rem;
  border: 1px solid #8692a6;
  border-radius: 5px;
}

.bt svg {
  fill: rgb(250, 255, 255);
  width: 15px;
  margin-right: 8px;





}

.d tr {
  width: 300px;
}

.d {
  width: 100%;

}

.pan svg {
  fill: #60a5fa;
}

.b span {
  padding-right: 20px;

}

.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bt {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
