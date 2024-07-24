<template>
  <div>
    <div class="act_content bg-white">
      <div v-if="$i18n.locale == 'uz'">
        <div class="acts">
          <div class="container pagebreak">
            <div
              @click="$store.commit('HIDE_ACT_MODAL')"
              class="mt-6"
              style="cursor: pointer; display: flex; justify-content: end"
            >
              <svg
                class="h-8 w-8 text-black"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div class="box qarz">
              <div class="content-title">
                <h2 class="font-bold">D А L O L А T N O M А</h2>

                <p>
                  ( <span>{{ contract.number }}</span> - sonli qarz shartnomasi
                  bo‘yicha qarz mablag‘i qisman qaytarilganligi to‘g‘risida)
                </p>
              </div>
              <div class="content-body">
                <p>
                  Biz quyida imzo qo‘yuvchilar, fuqaro
                  <span>{{ contract.debitor_name }} </span>
                  (pasport:
                  <b>{{ contract.debitor_passport }}</b
                  >,
                  <b>{{ dateFormat(contract.debitor_issued_date) }}</b>
                  yilda <b>{{ contract.debitor_issued }} </b> tomonidan
                  berilgan) (qarz beruvchi) bir tomondan va fuqaro
                  <b>{{ contract.creditor_name }} </b>
                  (pasport:
                  <b>{{ contract.creditor_passport }}</b
                  >.<b> {{ dateFormat(contract.creditor_issued_date) }}</b>
                  yilda <b>{{ contract.creditor_issued }}</b>
                  tomonidan berilgan) (qarz oluvchi) ikkinchi tomondan, ushbu
                  dalolatnomani quyidagilar haqida tuzdilar:
                </p>
                <p>
                  Men
                  <b>{{ contract.creditor_name }} </b>
                  fuqaro <b>{{ contract.debitor_name }}</b
                  >dan

                  {{ dateFormat(contract.created_at) }} yildagi
                  <b>{{ contract.number }}</b
                  >-sonli qarz shartnomasiga asosan
                  <b>
                    {{
                      contract.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b
                  >
                  miqdorida olingan qarz mablag‘ining
                  <b v-if="contract.refundable_amount != ''"
                    >{{
                      contract.refundable_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}
                  </b>
                  <b v-if="contract.refundable_amount == ''">
                    0 {{ contract.currency }}</b
                  >
                  miqdoridagi qismini <b>{{ dateFormat(new Date()) }}</b> yilda
                  qaytardim.
                </p>

                <p>
                  Men
                  <b>{{ contract.debitor_name }} </b>
                  fuqaro <b>{{ contract.creditor_name }}</b
                  >ga

                  {{ dateFormat(contract.created_at) }} yildagi
                  <span>{{ contract.number }}</span
                  >-sonli qarz shartnomasiga asosan
                  <b>
                    {{
                      contract.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b
                  >
                  miqdorida berilgan qarz mablag‘ining
                  <b v-if="contract.refundable_amount != ''"
                    >{{
                      contract.refundable_amount &&
                      contract.refundable_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}
                  </b>

                  <b v-if="contract.refundable_amount == ''">
                    0 {{ contract.currency }}</b
                  >
                  miqdoridagi qismini {{ dateFormat(new Date()) }} yilda qabul
                  qilib oldim.
                </p>
                <p>
                  Qarzning qaytarilmagan qismi
                  <b v-if="contract.refundable_amount != null"
                    >{{
                      (contract.residual_amount - contract.refundable_amount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}
                  </b>
                  <b v-if="contract.refundable_amount == null">
                    - {{ contract.currency }}</b
                  >
                  ni tashkil qiladi.
                </p>

                <p>
                  Qarz mablag‘ining qolgan qismi, ya’ni
                  <b v-if="contract.refundable_amount != null"
                    >{{
                      (contract.residual_amount - contract.refundable_amount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b
                  >
                  <b v-if="contract.refundable_amount == null">
                    - {{ contract.currency }}</b
                  >
                  ni qaytarish muddati <b>{{ dateFormat(contract.end_date) }}</b> yil
                  qilib belgilandi.
                </p>

                <p>
                  Mazkur dalolatnoma QR-kod orqali tasdiqlangan holda elektron
                  tarzda tuzildi.
                </p>
                <p>
                  Dalolatnoma ikki tomonning “ZeroX” dasturidagi shaxsiy
                  kabinetida saqlanadi.
                </p>
                <p>
                  QR-kod orqali tasdiqlangan Dalolatnomaning saqlanishini
                  Jamiyat o‘z zimmasiga oladi.
                </p>
              </div>
            </div>

            <div class="box qarz">
              <div class="content-body flex justify-between px-4">
                <div class="flex">
                  <div class="rekvizit">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">
                        {{ $t("debt_list.Debt") }}:
                      </h2>
                      <h2 class="font-bold">
                        FISH : {{ contract.creditor_name }}
                      </h2>
                    </div>

                    <div class="rek-body">
                      <h2 class="font-bold">
                        {{ $t("comp.time") }}:
                        <span>{{ dateFormat(new Date()) }}</span> yil
                      </h2>
                    </div>
                  </div>
                </div>

                <div class="flex">
                  <div class="rekvizit">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">
                        {{ $t("debt_list.debtber") }}:
                      </h2>
                      <h2 class="font-bold">
                        FISH : {{ contract.debitor_name }}
                      </h2>
                    </div>

                    <div class="rek-body">
                      <h2 class="font-bold">
                        {{ $t("comp.time") }}:
                        <span>{{ dateFormat(new Date()) }}</span> yil
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import vueqr from "vue-qr";
import dateformat from "dateformat";
export default {
  props: ["contract","residual_amount"],
  data: () => ({
    con: 0
  }),
  components: {
    vueqr,
  },
  mounted(){
    console.log(this.contract)
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
@import url("../../assets/style/actModalStyles.css");
</style>
