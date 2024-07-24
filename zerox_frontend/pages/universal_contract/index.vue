<template>
  <div class="flex items-center flex-col bg-white py-4 pb-8 rounded">
    <div class="card__footer mt-6">
      <div class="market mt-4">
        <span><b>{{ $t("a1.a22") }}</b></span>
        <iframe src="https://pdf.zerox.uz/oferta.pdf" width="100%" height="600px" />
        <div class="market-box flex justify-between mb-8" style="align-items: center">
          <div class="appstore ml-2 cursor-pointer">
            <div class="flex items-center justify-center mt-6">
              <input @change="validate" class="w-4 h-4 mr-2" v-model="isAffirmed" type="checkbox" id="1" />
              <label for="1">
                {{ $t("a1.a23") }}
              </label>
            </div>
          </div>
          <div>
            <button :disabled="isValidate" :class="isBtnDisabled ? 'bg-t_error' : 'bg-t_primary'" @click="editContract"
              class="text-white mt-6 text-center font-bold w-full py-3 px-8 rounded">
              {{ $t("process.accept") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isAffirmed: false,
    isBtnDisabled: true,
  }),
  async mounted() {
    if (this.$auth.user.is_active == 1 && this.$auth.user.is_contract == 1) {
      this.$router.push(this.localePath({ name: `index` }));
    }
  },
  methods: {
    validate() {
      if (this.isAffirmed) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    },
    async editContract() {
      try {
        if (this.isAffirmed) {
          await this.$axios.put("/user/edit_contract");
          this.$toast.success(`${$nuxt.$t('a1.a43')}`);
          window.location.reload();
        }
      } catch {
        return this.$toast.error(`${$nuxt.$t('a1.a42')}`);
      }
    },
  }
}
</script>

<style lang="scss" scoped></style>
