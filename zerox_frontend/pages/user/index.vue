<template>
  <div class="rounded-xl bg-white py-4 block">
    <div
      @click="step == 0 ? $router.go(-1) : step--"
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
            <span v-if="user.type == 2 && user.gender == 1">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_616_506)">
                  <path
                    d="M75 75C98.6719 75 117.857 58.2129 117.857 37.5C117.857 16.7871 98.6719 0 75 0C51.3281 0 32.1429 16.7871 32.1429 37.5C32.1429 58.2129 51.3281 75 75 75ZM59.6987 89.0625C26.7188 89.0625 0 112.441 0 141.299C0 146.104 4.45313 150 9.9442 150H140.056C145.547 150 150 146.104 150 141.299C150 112.441 123.281 89.0625 90.3013 89.0625H59.6987V89.0625Z"
                    fill="#3182CE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_616_506">
                    <rect width="150" height="150" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span v-if="user.type == 2 && user.gender == 2">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M144.686 96.4413L108.503 81.1019L93.2024 74.615C93.586 74.3994 93.951 74.155 94.3276 73.9271H114.418C115.912 73.9271 117.345 73.3996 118.401 72.4607C119.457 71.5218 120.051 70.2485 120.051 68.9207V55.7477H120C119.385 37.3896 112.211 21.2391 101.437 11.1113C95.7556 5.41706 88.3919 1.54832 80.1548 0.392213C79.7874 0.338823 79.4201 0.289539 79.0504 0.246416C78.6252 0.199187 78.2024 0.151957 77.7726 0.121155C76.8493 0.0446379 75.9227 0.00421396 74.9954 0H74.9908C74.0712 0 73.1631 0.0472302 72.2574 0.117048C71.823 0.149904 71.3933 0.197132 70.9635 0.244362C70.6031 0.285432 70.2449 0.330608 69.8891 0.383998C61.719 1.51957 54.4062 5.32876 48.7408 10.9409C37.8628 21.0584 30.61 37.2849 29.9908 55.7497H29.9422V68.9227C29.9422 70.2505 30.5357 71.5239 31.5921 72.4628C32.6485 73.4017 34.0813 73.9291 35.5753 73.9291H55.7209C56.2708 74.2618 56.8184 74.6006 57.3868 74.9045L42.7334 80.9684L5.37662 96.4311C2.13031 97.7822 0 101.035 0 104.668V141.147C0 146.037 3.83318 150 8.56747 150H141.433C146.167 150 150 146.037 150 141.147V104.663C149.998 101.043 147.9 97.8213 144.686 96.4413Z"
                  fill="#3182CE"
                />
              </svg>
            </span>
            <span v-if="user.type == 1">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M75 75C98.6719 75 117.857 58.2129 117.857 37.5C117.857 16.7871 98.6719 0 75 0C51.3281 0 32.1429 16.7871 32.1429 37.5C32.1429 58.2129 51.3281 75 75 75ZM107.076 84.5508L91.0714 140.625L80.3571 100.781L91.0714 84.375H58.9286L69.6429 100.781L58.9286 140.625L42.9241 84.5508C19.0513 85.5469 0 102.627 0 123.75V135.937C0 143.701 7.19866 150 16.0714 150H133.929C142.801 150 150 143.701 150 135.937V123.75C150 102.627 130.949 85.5469 107.076 84.5508V84.5508Z"
                  fill="#3182CE"
                />
              </svg>
            </span>
            <span class="text-center font-bold mt-4 px-2"
              >{{ user.last_name }} {{ user.first_name }}
              {{ user.middle_name }}</span
            >
          </div>
          <hr class="mt-4" />
          <div class="mt-4 pr-4 pl-4 items-center flex justify-between">
            <p class="text-sm text-center">{{ $t("user.id") }}</p>
            <p class="text-blue-400 text-sm">{{ user.uid }}</p>
          </div>
        </div>

        <div class="w-full ml-4">
          <table
            class="table-auto w-full rounded bg-white border-collapse border border-gray-300"
          >
            <tbody>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  {{ $t("user.sana") }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.brithday }} {{ $t("user.year") }}
                </td>
              </tr>

              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  {{ $t("user.tel") }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.phone }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  {{ $t("user.address") }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.region }} {{ user.district }}
                </td>
              </tr>
              <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  {{ $t("user.vaqt") }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ dateFormat(user.created_at) }} {{ $t("user.year") }}
                </td>
              </tr>
              <!-- <tr class="border border-gray-300">
                <td class="border border-gray-300 px-4 py-2">
                  {{ $t("user.status") }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ user.rating }}
                </td>
              </tr> -->
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
  //  middleware:'auth',
  data: () => ({
    user: null,
    step: 0,
  }),
  methods: {
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
  },
  async mounted() {
    console.log("sd", this.$route.query.id);
    const candidate = await this.$axios.$get(
      `/user/candidate/${this.$route.query.id}`
    );
    this.user = candidate.data;
  },
};
</script>

<style>
.jad td tr {
  padding: 0.8rem;
  border: 1px solid #8692a6;
  border-radius: 5px;
}
</style>

