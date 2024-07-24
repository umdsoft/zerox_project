<template>
  <div class="introduction mx-auto">
    <div class="flex justify-between mb-20">
      <div class="introduction__logo">
        <div class="text-5xl mb-4" style="font-family: serif; color: #2d62b6">
          Zero<span class="text-red-500">X</span>
        </div>

        <i class="text-blue-500 text-sm">ishonch kafolati</i>
      </div>
      <div class="text-sm ml-8" style="width: 250px">
        <Vqr
          text="asdasdaskjhadjkahdkjahskjdhasiuyhuqi9wendkasnsdkna"
          :logo="logo"
          qrcodeColor="#2D62B6"
          backgroundColor="#ffffffff"
          :size="180"
          :logoSize="40"
          :margin="10"
          :ratio="1"
          level="M"
        />
        QR-Code’ni skanerlash orqali qarz shartnomasi va unga ilova hujjatlarni
        yuklab olishingiz mumkin. <br />
        Qarz shartnomasi va unga ilova hujjatlar mundarija bilan to‘liq
        hisoblanadi
      </div>
    </div>
    <div>
      <div class="text-center mt-8 text-xl">
        <b>{{ contract.number }}</b>-sonli qarz shartnomasi bo‘yicha
        <div class="text-2xl font-bold mt-6" style="font-family: serif">
          Y I G’ M A &nbsp; J I L D
        </div>
      </div>

      <div>
        <table class="border border-gray-400 px-4 py-2 mx-auto mt-8">
          <tbody>
            <tr>
              <td class="border border-gray-400 px-4 py-2">{{$t('debt_list.debtber')}} :</td>
              <td class="border border-gray-400 px-4 py-2 italic">
                {{ contract.debitor.first_name }}
                {{ contract.debitor.last_name }}
                {{ contract.debitor.middle_name }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 px-4 py-2">{{$t('debt_list.Debt')}} :</td>
              <td class="border border-gray-400 px-4 py-2 italic">
                {{ contract.creditor.first_name }}
                {{ contract.creditor.last_name }}
                {{ contract.creditor.middle_name }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 px-4 py-2">
                {{$t('debt_list.debtol')}} :
              </td>
              <td class="border border-gray-400 px-4 py-2 italic">
                {{ dateFormat(contract.createdAt) }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 px-4 py-2">{{ $t('action.a11') }}:</td>
              <td class="border border-gray-400 px-4 py-2 italic">
                {{ contract.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ contract.currency }}
              </td>
            </tr>
            <tr>
              <td class="border border-gray-400 px-4 py-2">
                Qarz qaytarish sanasi :
              </td>
              <td class="border border-gray-400 px-4 italic py-2">
                {{ dateFormat(contract.end_date) }}
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
import Vqr from "v-qr";
import dateformat from "dateformat";
export default {
  props: ["contract"],
  components: {
    Vqr,
  },
  data: () => ({
    logo: null,
  }),
  mounted() {
    this.logo =
      "data:image/png;base64,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";
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
