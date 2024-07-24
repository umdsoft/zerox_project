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
                  ( <span>{{ contract.number }}</span> - sonli qarz
                  shartnomasining muddati uzaytirilganligi to‘g‘risida )
                </p>
              </div>
              <div class="content-body text-center">
                <p>
                  Men,
                  <span>{{ contract.debitor_name }} </span>
                  (pasport:
                  <span
                    >{{ contract.debitor_passport }}.
                    {{
                      contract.debitor_issued_date &&
                      dateFormat(contract.debitor_issued_date)
                    }}</span
                  >
                  yilda <b>{{ contract.debitor_issued }} </b> tomonidan
                  berilgan) (qarz beruvchi) tomonidan ushbu dalolatnoma
                  quyidagilar haqida tuzildi:
                </p>

                <p>
                  Men va fuqaro <span> {{ contract.creditor_name }} </span>
                  (pasport:
                  <span
                    ><b>
                      {{ contract.creditor_passport }}
                      {{
                        contract.creditor_issued_date &&
                        dateFormat(contract.creditor_issued_date)
                      }}</b
                    ></span
                  >

                  <b>{{ contract.creditor_issued }} </b> tomonidan berilgan)
                  (qarz oluvchi) o‘rtamizda tuzilgan
                  <nuxt-link
                    :to="{ name: 'pdf-generate___'+ $i18n.locale, query: { id: contract.id } }"
                    ><b>{{ contract.number }}</b></nuxt-link
                  >-sonli qarz shartnomasining muddati o‘z tashabbusimga ko‘ra
                  <b>{{ time && dateFormat(time) }}</b> gacha uzaytirildi.
                </p>

                <p>
                  <span
                    ><nuxt-link
                      :to="{
                        name: 'pdf-generate___'+ $i18n.locale,
                        query: { id: contract.id },
                      }"
                      ><b>{{ contract.number }}</b></nuxt-link
                    > </span
                  >-sonli qarz shartnomasining yangi muddati sifatida
                  <b>{{ time && dateFormat(time) }}</b>
                  yil belgilandi.
                </p>

                <p>
                  Mazkur dalolatnoma QR-kod orqali tasdiqlangan holda elektron
                  tarzda tuzildi.
                </p>
                <p>
                  Dalolatnoma qarz beruvchi va qarz oluvchining “ZeroX”
                  dasturidagi shaxsiy kabinetida saqlanadi.
                </p>
                <p>
                  QR-kod orqali tasdiqlangan Dalolatnomaning saqlanishini
                  Jamiyat o‘z zimmasiga oladi.
                </p>
              </div>
            </div>

            <div class="box qarz">
              <div class="content-body mt-8 w-full">
                <div class="flex">
                  <div class="rekvizit mx-auto">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">
                        {{ $t("debt_list.debtber") }} (debitor):
                      </h2>
                      <h2><span>FISH :</span> {{ contract.debitor_name }}</h2>
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

      <div v-if="$i18n.locale == 'kr'">
        <div class="acts">
          <div class="container pagebreak">
            <div
              @click="$store.commit('HIDE_ACT_MODAL')"
              class="my-6"
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
            <div style="display: flex; justify-content: end">
              <div class="date">
                <span>{{ dateFormat(new Date()) }}</span>
              </div>
            </div>

            <div class="box qarz">
              <div class="content-title">
                <h2 class="font-bold">Д А Л О Л А Т Н О М А</h2>

                <p>
                  ( <span>{{ contract.number }}</span> -сонли қарз
                  шартномасининг муддатини узайтирилганлиги тўғрисида )
                </p>
              </div>
              <div class="content-body text-center">
                <p>
                  Мен,
                  <span>{{ contract.debitor_name }} </span>
                  (паспорт:
                  <b
                    >{{ contract.debitor_passport }}
                    {{
                      contract.debitor_issued_date &&
                      dateFormat(contract.debitor_issued_date)
                    }}</b
                  >
                  йилда <b>{{ contract.debitor_issued }} </b> томонидан
                  берилган) (карз беручи) томонимдан ушбу далолатнома
                  қуйидагилар ҳақида тузилди:
                </p>
                <p>
                  Мен ва фукаро <span> {{ contract.creditor_name }} </span>
                  (паспорт:
                  <b>
                    {{ contract.creditor_passport }}
                    {{
                      contract.creditor_issued_date &&
                      dateFormat(contract.creditor_issued_date)
                    }}</b
                  >
                  <b>{{ contract.creditor_issued }} </b> томонидан берилган)
                  (карз олувчи) ўртамизда тузилган
                  <nuxt-link
                    :to="{ name: 'pdf-generate___'+ $i18n.locale, query: { id: contract.id } }"
                    ><b>{{ contract.number }}</b></nuxt-link
                  >-сонли қарз шартномасининг муддати ўз ташаббусимга кўра
                  <b>{{ time && dateFormat(time) }}</b> йилгача узайтирилди.
                </p>

                <p>
                  <span
                    ><nuxt-link
                      :to="{
                        name: 'pdf-generate___'+ $i18n.locale,
                        query: { id: contract.id },
                      }"
                      ><b>{{ contract.number }}</b></nuxt-link
                    > </span
                  >-сонли қарз шартномасининг янги муддати сифатида
                  <b>{{ time && dateFormat(time) }}</b> йил белгиланди.
                </p>

                <p>
                  Мазкур далолатнома QR-kod орқали тасдиқланган ҳолда электрон
                  тарзда тузилди.
                </p>
                <p>
                  Далолатнома икки томоннинг “ZeroX” дастуридаги шахсий
                  кабинетида сақланади.
                </p>
                <p>
                  QR-kod орқали тасдиқланган Далолатноманинг сақланишини Жамият
                  ўз зиммасига олади.
                </p>
              </div>
            </div>

            <div class="box qarz flex">
              <div class="content-body flex mt-8 mx-auto">
                <div class="flex">
                  <div class="rekvizit">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">Қарз берувчи (дебитор):</h2>
                      <h2><span>ФИШ :</span> {{ contract.debitor_name }}</h2>
                    </div>

                    <div class="rek-body">
                      <h2 class="font-bold">
                        Сана: <span>{{ dateFormat(new Date()) }}</span> йил
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
  props: ["contract", "act", "time"],
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
