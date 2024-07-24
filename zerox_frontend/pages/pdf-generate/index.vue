<template>
  <div class="qr rounded bg-white w-full pt-3 pb-16 px-2">
    <div
      @click="$router.go(-1)"
      class="my-2 mx-6 hidden lg:inline-flex items-center"
      style="cursor: pointer"
    >
      <svg
        class="h-5 w-5 text-blue-500"
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
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>

    <div class="container">
      <iframe :src="url" frameborder="0" width="100%" height="900"></iframe>
    </div>

  </div>
</template>

<script>

export default {
  middleware:'auth',
  data: () => ({
    url: null,
  }),
  created() {},
  async mounted() {
    try {
      this.url = `https://pdf.zerox.uz/index.php?id=${this.$route.query.id}&lang=uz&download=0`;
    } catch (e) {
  
    }

  },

};
</script>

<style lang="css" scoped>
.introduction {
  max-width: 650px;
}
#webviewer {
  height: 100vh;
}

.qr-code {
  width: 180px;
  position: relative;
}

.qr-code-image {
  position: absolute;
  background-color: rgb(252, 249, 249);
  border-radius: 0.25rem;
  z-index: 50000;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pdf {
  width: 250px;
  height: 250px;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border-radius: 67px;
  background: #ffffff;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-title {
  text-align: center;
}
.qarz {
  margin: 20px 0;
}
.qarz .content-title {
  margin-bottom: 20px;
}
.qarz span {
  color: black;
  font-weight: 600;
}
.content-body p {
  font-size: 14px;
  text-align: justify;
  word-break: break-word;
  text-indent: 50px;
}
.qarz ul li p {
  font-size: 14px;
}
.rekvizit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rek-title {
  margin-bottom: 10px;
  text-align: center;
}
.rek-body {
  margin-bottom: 10px;
}
.rek-title h2:last-child {
  color: black;
  font-weight: 600;
}
</style>