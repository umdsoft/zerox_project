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
                  ( <span>{{ contract.number }}</span> -sonli qarz shartnomasi
                  bo‘yicha qarzdan voz kechish to‘g‘risida)
                </p>
              </div>
              <div class="content-body">
                <p>
                  Men,
                  <span>{{ contract.debitor_name }} </span>
                  (pasport:
                  <span
                    >{{ contract.debitor_passport }}.
                    {{ dateFormat(contract.debitor_issued_date) }}</span
                  >
                  yilda <b>{{ contract.debitor_issued }} </b> tomonidan
                  berilgan) (qarz beruvchi) tomonimdan ushbu dalolatnoma
                  quyidagilar haqida tuzildi:
                </p>
                <p>
                  Men va fuqaro
                  <span>
                    {{ contract.creditor_name }}
                  </span>
                  (pasport: <b>{{ contract.creditor_passport }}</b>
                  
                  <span
                    ><b>
                      {{ dateFormat(contract.creditor_issued_date) }}</b
                    ></span
                  >
                  yilda <b>{{ contract.creditor_issued }}</b>
                  tomonidan berilgan) (qarz oluvchi) o‘rtamizda tuzilgan
                  <span>{{ contract.number }}</span
                  >-sonli qarz shartnomasi bo‘yicha barcha huquq va
                  majburiyatlar o‘z tashabbusimga ko‘ra bir tomonlama bekor
                  qilindi.
                </p>
                <p>
                  Shunga ko‘ra fuqaro
                  <span>{{ contract.creditor_name }} </span>
                  <span>{{ contract.number }}</span
                  >-sonli qarz shartnomasi bo‘yicha o‘z majburiyatlarini
                  bajarishdan ozod qilindi.
                </p>
                <p>
                  Voz kechilgan qarz mablag‘ining umumiy miqdori
                  <b>
                    {{
                      contract.residual_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b
                  >.
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
              <div class="content-body">
                <div class="flex">
                  <div class="rekvizit mx-auto">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">{{$t('debt_list.debtber')}} (debitor):</h2>
                      <h2 class="font-bold">
                        {{ contract.debitor_name }}
                      </h2>
                    </div>
               
                    <div class="rek-body">
                      <h2 class="font-bold">
                        {{ $t('comp.time') }}: <span>{{ dateFormat(new Date()) }}</span> yil
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
                  ( <span>{{ contract.number }}</span> -сонли қарз шартномаси
                  бўйича қарздан воз кечиш тўғрисида)
                </p>
              </div>
              <div class="content-body">
                <p>
                  Мен,
                  <span>{{ contract.debitor_name }} </span>
                  (паспорт:
                  <span
                    >{{ contract.debitor_passport }}.
                    {{ dateFormat(contract.debitor_issued_date) }}</span
                  >
                  йилда <b>{{ contract.debitor_issued }} </b> томонидан
                  берилган) (қарз берувчи) томонимдан ушбу далолатнома
                  қуйидагилар ҳақида тузилди:
                  <br />
                  Мен ва фукаро
                  <span>
                    {{ contract.creditor_name }}
                  </span>
                  (паспорт: <b>{{ contract.creditor_passport }}</b>
                  <span
                    ><b> {{ dateFormat(contract.creditor_issued_date) }}</b>
                  </span>
                  йилда
                  <b> {{ contract.creditor_issued }}</b>
                  томонидан берилган) (қарз олувчи) ўртамизда тузилган
                  <span>{{ contract.number }}</span
                  >-сонли қарз шартномаси бўйича барча ҳуқуқ ва мажбуриятлар ўз
                  ташаббусимга кўра бир томонлама бекор қилинди.
                </p>
                <p>
                  Шунга кўра фуқаро
                  <span>{{ contract.creditor_name }} </span>
                  ва

                  <b>{{ contract.number }}</b
                  >-сонли қарз шартномаси бўйича ўз мажбуриятларини бажаришдан
                  озод қилинди.
                </p>
                <p>
                  Воз кечиктирилган қарз маблағининг умумий миқдори
                  <b>
                    {{
                      contract.residual_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    }}
                    {{ contract.currency }}</b
                  >.
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

            <div class="box qarz">
              <div class="content-body">
                <div class="flex">
                  <div class="rekvizit mx-auto">
                    <div class="rek-title">
                      <h2 class="font-bold mb-4">Қарз берувчи (дебитор):</h2>
                      <h2 class="font-bold">
                        {{ contract.debitor_name }}
                      </h2>
                    </div>
                    <div class="rek-body flex">
                      <h2 class="font-bold">Махсус электрон рақамли имзо:</h2>
                      <div
                        class="ml-2"
                        style="
                          border-bottom: 1px solid black;
                          width: 100px;
                          height: 10px;
                        "
                      ></div>
                      <h2 class="mt-4"></h2>
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
</style>>
