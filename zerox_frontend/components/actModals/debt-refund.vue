<template>
  <div>
    <div class="act_content bg-white">

      <div v-if="$i18n.locale == 'uz'">
        <div class="acts">
          <div class="container pagebreak">
            <div @click="$store.commit('HIDE_ACT_MODAL')" class="mt-6"
              style="cursor: pointer; display: flex; justify-content: end">
              <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                  bo‘yicha qarz mablag‘i qaytarilganligi to‘g‘risida )
                </p>
              </div>
              <div class="content-body">
                <p>
                  Biz quyida imzo qo‘yuvchilar, fuqaro
                  <span>{{ contract.debitor_name }} </span>
                  (pasport:
                  <span>{{ contract.debitor_passport }}.
                    {{ dateFormat(contract.debitor_issued_date) }}</span>
                  yilda <b>{{ contract.debitor_issued }} </b> tomonidan
                  berilgan) bir tomondan va fuqaro
                  <span>
                    {{ contract.creditor_name }}
                  </span>
                  (pasport:
                  <span>{{ contract.creditor_passport }}.<b>
                      {{ dateFormat(contract.creditor_issued_date) }}</b>.</span>
                  <b>{{ contract.creditor_issued }}</b>
                  tomonidan berilgan) ikkinchi tomondan, ushbu dalolatnoma
                  quyidagilar haqida tuzildi:
                </p>
                <p>
                  Men
                  <span>{{ contract.creditor_name }} </span>
                  fuqaro <span>{{ contract.debitor_name }}</span>dan

                  <b>{{ dateFormat(contract.created_at) }}</b> yildagi
                  <span>{{ contract.number }}</span>-sonli qarz shartnomasiga asosan
                  <b>

                    {{
                      contract.amount &&
                      contract.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b>
                  miqdorida olingan qarz mablag'ining <b>{{
                    contract.residual_amount &&
                    contract.residual_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                    {{ contract.currency }}</b> miqdoridagi qismini
                  <b>{{ dateFormat(new Date()) }}</b> yilda qaytardim.
                </p>

                <p>
                  Men <span>{{ contract.debitor_name }}</span> fuqaro
                  <span>{{ contract.creditor_name }}</span> ga
                  <b>{{ dateFormat(contract.created_at) }} </b>yildagi
                  <span>{{ contract.number }}</span>-sonli qarz shartnomasiga asosan
                  <b>{{
                    contract.amount &&
                    contract.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                    {{ contract.currency }}</b>
                  miqdorida berilgan qarz mablag‘ining <b>{{
                    contract.residual_amount &&
                    contract.residual_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                    {{ contract.currency }}</b> miqdoridagi qismini
                 <b> {{ dateFormat(new Date()) }}</b> yilda  qabul qilib oldim.
                </p>

                <p>
                  Mazkur dalolatnoma QR-kod orqali tasdiqlangan holda elektron
                  tarzda tuzildi.
                </p>
                <p>
                  Dalolatoma ikki tomonning “ZeroX” dasturidagi shaxsiy
                  kabinetida saqlanadi.
                </p>
                <p>
                  QR-kod orqali tasdiqlangan Dalolatnomaning saqlanishini
                  Jamiyat o‘z zimmasiga oladi.
                </p>
              </div>
            </div>

            <div class="box qarz">
              <div class="content-title">
                <h2>Tomonlarning rekvizitlari</h2>
              </div>
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
  props: ["contract"],
  data: () => ({}),
  components: {
    vueqr,
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
>
