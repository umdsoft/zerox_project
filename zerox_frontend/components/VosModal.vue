<template>
  <div class="message" style="">
    <div class="card show">
      <div class="card_header">
        <svg @click="removeIdenModal" style="margin: 2rem 20px 15px 0; cursor: pointer" class="h-6 w-6 text-black"
          width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <div class="card_content px-2">
        {{ $t('a1.a35') }}
      </div>
      <div class="card__footer mt-2">
        <div class="market mt-4">
          <div class="market-box flex justify-between mb-8">
            <div class="playm cursor-pointer">
              <img src="@/assets/img/googlePlayBtn.svg" alt="" />
            </div>
            <div class="appstore ml-2 cursor-pointer">
              <img src="@/assets/img/appstoreBtn.svg" alt="" />
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

  methods: {
    toIdentification() {
      this.removeIdenModal();
      this.$router.push(this.localePath({ name: 'identification' }));
    },

    removeIdenModal() {
      this.$emit("removeIdenModal");
    },
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
  width: 550px;
  border-radius: 6px;
  transition: all easy 0.5s;
  height: 350px;
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
