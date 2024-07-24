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

      </div>
      <div class="flex rounded-xl px-4 py-6" style="width: 100%" v-if="user != null">
        <div class="w-full ml-4">
          <table class="table-auto w-full rounded bg-white border-collapse border border-blue-300">
            <thead>
              <tr class="border border-blue-300 text-center font-bold">
                <td class="border border-blue-300 px-4 py-2">Shartnoma raqami</td>
                <td class="border border-blue-300 px-4 py-2 text-bold">Oldingi reyting</td>
                <td class="border border-blue-300 px-4 py-2 text-bold">Joriy reyting</td>
                <td class="border border-blue-300 px-4 py-2 text-bold">Reyting holati</td>
                <td class="border border-blue-300 px-4 py-2 text-bold">Vaqti</td>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-blue-300 text-center" v-for="(item, index) in user" :key="index">
                <td class="border border-blue-300 px-4 py-2">{{ item.contract_number }}</td>
                <td class="border border-blue-300 px-4 py-2">{{ item.old_rating }}</td>
                <td class="border border-blue-300 px-4 py-2">{{ item.rating_count }}</td>
                <td class="border border-blue-300 px-4 py-2">
                  <span v-if="item.rating_type == 1">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style="margin: 6px 0px 0px 6px">
                      <path d="M0 5L0 9.5L7 4.5L14 9.5V5L7 0L0 5Z" fill="#049D26" />
                    </svg>
                  </span>
                  <span v-if="item.rating_type == 2">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style="margin: 6px 0px 0px 6px"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 4.5V0L7 5L0 0V4.5L7 9.5L14 4.5Z" fill="#FF0000" />
                    </svg>
                  </span>

                </td>
                <td class="border border-blue-300 px-4 py-2">{{ dateFormat(item.date) }} {{
                  item.time.slice(0, 5) }}</td>
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
      this.$router.push(this.localePath({ name: `universal_contract` }));
    }
    const mee = await this.$axios.$get(`/user/get-all-rating`);
    this.user = mee.data
    console.log('t', this.user)
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
