<template>
  <div class="act_bg" v-if="isModalShow" @click="$store.commit('HIDE_CONTRACT_MODAL')">
    <div v-if="$i18n.locale == 'uz'">
      <div class="acts">
        <div class="container pagebreak">
          <div @click="$store.commit('HIDE_CONTRACT_MODAL')" class="mt-12"
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
              <h2 class="font-bold">Д А Л О Л А Т Н О М А</h2>


            </div>
            <div class="content-body">


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

                    </h2>
                  </div>

                  <div class="rek-body">
                    <h2>

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
</template>

<script>

import contract_uz from "./actModals/contract_uz.vue";

export default {

  components: {
    contract_uz
  },

  computed: {
    isModalShow() {
      return this.$store.state.isContractModalOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.act_bg {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.856);
  z-index: 6000000000000000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
>
