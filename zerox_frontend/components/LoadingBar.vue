<template>
  <div class="loading-page-2" v-if="$store.state.isLoading">
    <div class="loading-logo-2">
      <div class="loading-2"></div>
      <img src="@/assets/img/logo.png" alt="ZeroX" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBar",
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.loading-page-2 {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
}
.loading-logo-2 {
  width: 5rem;
  height: 5rem;
  position: relative;
  display: flex;
  align-items: center;
}
.loading-logo-2 img {
  width: 3rem;
  height: 3rem;
  display: block;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  object-fit: contain;
}

.loading-2 {
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 12px solid #3182ce18;
  border-radius: 50%;
  border-top-color: #3182ce;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
