<template>
  <div class="message" style="">
    <div class="card show">
      <div class="card_header flex">
        <svg @click="closeContractModal" style="margin: 2rem 30px 15px 0; cursor: pointer" class="h-6 w-6 text-black"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <div class="card_content px-10">
        <iframe src="https://pdf.zerox.uz/oferta.pdf" width="100%" height="600px" />
      </div>
      <div class="card__footer mt-6">
        <div class="market mt-4">
          <span><b>
              {{ $t('a1.a41') }}</b></span>
          <div class="market-box flex justify-between mb-8" style="align-items: center">
            <div class="appstore ml-2 cursor-pointer">
              <div class="flex items-center justify-center mt-6">
                <input @change="validate" class="w-4 h-4 mr-2" v-model="isAffirmed" type="checkbox" id="1" />
                <label for="1">
                  {{ $t('a1.a40') }}
                </label>
              </div>
            </div>
            <div>
              <button :disabled="isValidate" :class="isBtnDisabled ? 'bg-t_error' : 'bg-t_primary'"
                @click="editContract" class="text-white mt-6 text-center font-bold w-full py-3 px-8 rounded">
                {{ $t("process.accept") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "idenMessage",
  data: () => ({
    isAffirmed: false,
    isBtnDisabled: true,
  }),
  methods: {
    validate() {
      if (this.isAffirmed) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    },
    toIdentification() {
      this.removeIdenModal();
      this.$router.push({ name: 'identification___' + $i18n.locale });
    },
    async editContract() {
      try {
        if (this.isAffirmed) {
          await this.$axios.put("/user/edit_contract");
          this.$toast.success("Mufaqqiyatli bajarildi");
          this.$emit("removeContractModal");
        }
      } catch {
        return this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
    removeContractModal() {
      this.$emit("removeContractModal");
    },

    closeContractModal() {
      this.$emit("closeContractModal");
    }
  },
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.527);
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.card {
  width: 850px;
  border-radius: 6px;
  transition: all easy 0.5s;
  height: 850px;
  transition: all 0.3s ease;
  text-align: center;
  opacity: 0;
  margin-top: 4rem;
  background: white;
}

.card__footer {
  display: flex;

  align-items: flex-end;
  justify-content: center;
}

.card_header {
  display: flex;
  justify-content: flex-end;
}

.show {
  opacity: 1;
}
</style>
