<template>
  <div>
    <div class="act_content bg-white">
      <div v-if="$i18n.locale == 'uz'">
        <div class="acts">
          <div class="container pagebreak">
            <div
              @click="$store.commit('HIDE_ACT_MODAL')"
              class="mt-12"
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
                <h2 class="font-bold">Д А Л О Л А Т Н О М А</h2>

                <p>
                  ( <span>{{ contract.number }}</span> - сонли қарз шартномаси
                  бўйича қарз маблағининг қайтарилишини талаб қилиш тўғрисида да
                  )
                </p>
              </div>
              <div class="content-body">
                <p>
                  Биз қуйида Имзо қўювчилар,

                  <span
                    >{{ contract.debitor_name }}
                  </span
                  >
                  (паспорт:
                  <span
                    >{{ contract.debitor_passport }}.
                    {{ dateFormat(contract.debitor_issued_date) }}</span
                  >
                  йилда <b>{{ contract.debitor_issued }} </b> томонидан
                  берилган) бир томондан ва
                  <span>
                    {{ contract.creditor_name }}
              
                  </span>
                  (паспорт:
                  <span
                    ><b> {{  dateFormat(contract.creditor_issued_date) }}</b
                    >.</span
                  >
                  томонидан берилган) иккинчи томондан, ушбу далолатномани
                  қуйидагилар ҳақида туздилар:
                </p>
                <p>
                  <span
                    >{{ contract.debitor_name }}
                  </span
                  >
                  томонидан
                  <span>
                    {{ contract.creditor_name }}
                 </span
                  >
                  га
                  <span>{{ contract.number }}</span> - сонли қарз шартномасининг
                  бойича карз маблаги сифатида берилган {{contract.amount.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} маблаг {{contract.end_date}} гача
                    кайтарилиши талаб килинда
                  <span>{{ contract.number }}</span
                  >-сонли қарз шартномасининг янги муддати сифатида
                  {{ dateFormat(contract.end_date) }} йил белгиланди.
                </p>

                <p>
                  Мазкур далолатнома Имзо орқали тасдиқланган ҳолда электрон
                  тарзда тузилди.
                </p>
                <p>
                  Далолатнома икки томоннинг “ZeroX” дастуридаги шахсий
                  кабинетида сақланади.
                </p>
                <p>
                  Махсус электрон имзо орқали тасдиқланган Далолатноманинг
                  сақланишини Жамият ўз зиммасига олади.
                </p>
              </div>
            </div>

            <div class="box qarz">
              <div class="content-title">
                <h2>Томонларнинг реквизитлари</h2>
              </div>
              <div class="content-body">
                <div class="flex">
                  <div class="rekvizit">
                    <div class="rek-title">
                      <h2>Қарз берувчи (дебитор):</h2>
                      <h2>
                        {{ contract.debitor_name }}
                  
                      </h2>
                    </div>
                   
                    <div class="rek-body">
                      <h2>
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
