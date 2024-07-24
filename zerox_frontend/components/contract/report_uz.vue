<template>
  <div class="introduction mx-auto">
    <div>
      <div class="text-center mt-8 text-xl">
        <b>{{ contract.number }}</b>-sonli qarz shartnomasi bo’yicha
        <div class="text-2xl font-bold mt-6" style="font-family: serif">
          HISOB-KITOBI
        </div>
      </div>

      <div>
        <table class="border border-gray-400 mt-8">
          <tbody>
            <tr>
              <td class="border border-gray-400 p-1 center">№</td>
              <td class="border border-gray-400 p-1 text-center">
                Hujjat turi
              </td>
              <td class="border border-gray-400 p-1 text-center">
                Rasmiylashtirilgan sana
              </td>
              <td class="border border-gray-400 p-1 text-center">
                {{ $t('action.a11') }}
              </td>
              <td class="border border-gray-400 p-1 text-center">
                Qaytarilgan miqdor
              </td>
              <td class="border border-gray-400 p-1 text-center">
                Voz kechilgan miqdor
              </td>
              <td class="border border-gray-400 p-1 text-center">
                {{ $t('action.a11') }}
              </td>
              <td class="border border-gray-400 p-1 text-center">
                {{$t('debt_list.dateee') }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 p-1 text-center">1</td>
              <td class="border border-gray-400 p-1">Qarz shartnomasi</td>
              <td class="border border-gray-400 p-1 text-center">
                {{ dateFormat(contract.updatedAt) }}
              </td>
              <td class="border border-gray-400 p-1 text-center">
                {{ contract.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ contract.currency }}
              </td>
              <td class="border border-gray-400 p-1 text-center">
                0 {{ contract.currency }}
              </td>
              <td class="border border-gray-400 p-1 text-center">-</td>
              <td class="border border-gray-400 p-1 text-center">-</td>
              <td class="border border-gray-400 p-1">
                {{ dateFormat(contract.end_date) }}
              </td>
            </tr>
            <tr v-for="(item, index) in acts" :key="item._id">
              <td class="border border-gray-400 p-1 text-center">
                {{ con + index }}
              </td>
              <td class="border border-gray-400 p-1">
                <p v-if="item.type == '0'">
                  Qarz olish to‘g‘risida dalolatnoma
                </p>
                <p v-if="item.type == '1'">
                  Qarzni qisman qaytarish dalolatnomasi
                </p>
                <p v-if="item.type == '4'">Qarzdan voz kechish dalolatnomasi</p>
                <p v-if="item.type == '7'">Qarzni qaytarishni talab qilish to‘g‘risida dalolatnomasi</p>
                <p v-if="item.type == '6'">
                  Qarz muddatini uzaytirish dalolatnomasi
                </p>
                <p v-if="item.type == '2'">
                  Qarzni to‘liq qaytarish dalolatnomasi
                </p>
              </td>
              <td class="border border-gray-400 text-center">
                {{ dateFormat(item.updatedAt) }}
              </td>
              <td class="border border-gray-400 text-center">
                <p v-if="item.type == '0'">
                  {{ contract.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ contract.currency }}
                </p>

                <p v-else>
                  <span v-if="index == 1">{{ contract.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</span>
                  <span v-else>{{ acts[count - 1].residual_amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</span>
                  {{ contract.currency }}
                </p>
              </td>
              <td class="border border-gray-400 text-center">
                {{ item.refundable_amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ contract.currency }}
              </td>
              <td class="border border-gray-400 text-center">
                <p v-if="item.type == '4'">
                  {{ item.vos_summa }} {{ contract.currency }}
                </p>
                <p v-else>-</p>
              </td>
              <td class="border border-gray-400 text-center">
                <p>{{ item.residual_amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ contract.currency }}</p>
              </td>
              <td class="border border-gray-400 p-1 text-center">
                {{ dateFormat(item.end_date) }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 text-center" colspan="6">
                Qaytarilishi lozim bo'lgan qarz miqdori:
              </td>
              <td class="border border-gray-400 text-center" colspan="2">
                <span v-if="acts[count].type == '4'">0</span>
                <span v-else>{{ acts[count].residual_amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</span>
                {{ contract.currency }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import vueqr from "vue-qr";
import dateformat from "dateformat";
export default {
  props: ["contract", "acts", "count"],
  components: {
    vueqr,
  },
  data() { 
    return{

      length: null,
      con: null,
    }
  },
  mounted() {
    this.con = 2;
  },
  methods: {
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
  },
};
</script>

<style lang="scss" scoped>
.introduction {
  max-width: 650px;
}
.qr-code {
  width: 180px;
  position: relative;
}

.qr-code-image {
  position: absolute;
  background-color: rgb(252, 249, 249);
  border-radius: 0.25rem;
  z-index: 50000;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pdf {
  width: 250px;
  height: 250px;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border-radius: 67px;
  background: #ffffff;
}

.container {
  width: 8.5in;
  min-height: 11in;
  padding: 2rem 3rem;
  margin: 0 auto;
  margin-top: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-title {
  text-align: center;
}
.qarz {
  margin: 20px 0;
}
.qarz .content-title {
  margin-bottom: 20px;
}
.qarz span {
  color: black;
  font-weight: 600;
}
.content-body p {
  font-size: 14px;
  text-align: justify;
  word-break: break-word;
  text-indent: 50px;
}
.qarz ul li p {
  font-size: 14px;
}
.rekvizit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rek-title {
  margin-bottom: 10px;
  text-align: center;
}
.rek-body {
  margin-bottom: 10px;
}
.rek-title h2:last-child {
  color: black;
  font-weight: 600;
}
</style>>
