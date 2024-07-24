<template>
  <div class="rounded-xl">
    <Sure :isAdmin="isAdmin" @yes="yes" @cancel="cancel" />
    <div class="container rounded-xl justify-center">
      <div
        class="flex rounded-xl px-4 py-6"
        style="width: 100%"
        v-if="user != null"
      >
        <div class="bg-white rounded py-4" style="width: 500px">
          <div class="flex flex-col items-center">
            <!-- <img
              v-if="user.image"
              src="https://avatars.mds.yandex.net/i?id=e157550c2736f574c60fc9fe36e0581a-5483853-images-thumbs&n=13"
              alt=""
              class="flex w-40 h-40 rounded-full mr-10 ml-2 p-18"
            /> -->
            <img
              src="@/assets/img/no-avatar.png"
              style="width: 150px; height: 150px"
              alt="avatar"
            />
            <span class="text-center font-bold mt-4 px-2"
              >{{ user.last_name }} {{ user.first_name }}
              {{ user.middle_name }}</span
            >
          </div>
          <hr class="mt-4" />
          <div class="mt-4 pr-4 pl-4 items-center flex justify-between">
            <p class="text-sm text-center">{{ $t("transfer.id") }}</p>
            <p class="text-blue-400 text-sm">{{ user.uid }}</p>
          </div>
          <hr class="mt-4" />
          <div class="mt-4 pr-4 pl-4 items-center flex justify-between">
            <p class="text-sm text-center">Mobil hisobidagi mablag’i</p>

            <span class="font-bold text-sm text-center ml-2"
              >{{
                user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
              UZS</span
            >
          </div>

          <div class="px-4">
            <nuxt-link
              :to="{
                name: 'admin-users-give-debt-history-id___uz',
                params: { id: user.uid },
              }"
              class="bg-blue-400 w-full hover:bg-blue-500 mt-6 block text-center py-2 text-white text-sm rounded"
              >Qarz shartnomalari</nuxt-link
            >
            <nuxt-link
              :to="{
                name: 'admin-users-archive-id___uz',
                params: { id: user.id },
              }"
              class="bg-blue-400 w-full hover:bg-blue-500 mt-6 block text-center py-2 text-white text-sm rounded"
              >Kirishlar arxivi</nuxt-link
            >
            <a
              :href="link"
             
            >
            <button  class="bg-blue-400 mt-3 px-2 hover:bg-blue-500 py-2 text-white rounded text-sm w-full">   Tasdiqlangan ommaviy ofertani yuklab olish</button>
           
            </a>
          </div>
        </div>

        <div class="w-full ml-4">
          <table
            class="table-auto w-full rounded bg-white border-collapse border border-gray-300"
          >
            <!-- {{ user }} -->
            <tbody v-if="user.type == 2">
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Familiya</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.last_name }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Ismi</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.first_name }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Sharifi</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.middle_name }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Tug'ilgan sanasi
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.brithday }} yil
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Jinsi</td>
                <td class="border border-gray-300 px-4 py-2">
                  <p v-if="user.gender == 1">Erkak</p>
                  <p v-if="user.gender == 2">Ayol</p>
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Tel raqami</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.phone }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Elektron pochta manzili
                </td>
                <td class="border border-gray-300 px-4 py-2">-</td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Viloyat</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.region }}, {{ user.district }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Yashash manzili
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.address }}
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Oferta tasdiqlangan sana
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  <span v-if="user.contract_date != null"
                    >{{ dateFormat(user.contract_date) }}
                    <span v-if="user.con_time != null">{{
                      user.con_time.slice(0, 5)
                    }}</span></span
                  >
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Pasport ma'lumoti
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  <b>Pasport seriasi:</b> {{ user.passport }}
                  <p><b>Kim tomonidan berilgan:</b> {{ user.issued_by }}</p>
                  <p>
                    <b>Berilgan vaqti:</b>
                    {{ dateFormat(user.issued_date) }} yil
                  </p>
                  <p>
                    <b>Amal qilish muddati:</b>
                    {{ dateFormat(user.expiry_date) }} yil
                  </p>
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Status</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.rating }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="user.type == 1">
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Korxona nomi</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.company }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Rahbar</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.director }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">STIR</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.stir }}
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Tel raqami</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.phone }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Elektron pochta manzili
                </td>
                <td class="border border-gray-300 px-4 py-2">-</td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  Yuridik manzili
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.address }}
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">Status</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.rating }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: ["auth", "checkRole"],
  layout: "admin",
  data() {
    return {
      user: null,
      link: null,
      isAdmin: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    cancel() {
      this.isAdmin = false;
    },
    yes() {},
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },

    async getData() {
      let user = await this.$axios.$get(
        `/user/admin/user/${this.$route.params.id}`
      );
      this.link = `https://pdf.zerox.uz/oferta.php?id=${user.data.uid}&download=1`;
      this.user = user.data;
    },
  },
};
</script>

<style>
.jad tr {
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #8692a6;
  border-radius: 5px;
  padding-left: 15px;
  width: 320px;
  height: 64px;
  margin: 0;
}
</style>
