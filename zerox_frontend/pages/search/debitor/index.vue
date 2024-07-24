<template>
  <div class="bg-white rounded-xl flex flex-col px-4 py-4">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>

    <div>
      <div class="flexs" style="margin-top: 50px; margin-bottom: 100px">
        <nuxt-link :to="localePath({ name: 'search-debitor-physical' })" class="shaxs__block shaxs__title text-center">
          <svg class="shaxs__svg" width="106" height="122" viewBox="0 0 106 122" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z" />
          </svg>

          <span class="shaxs__title">{{ $t("home.search_user") }}</span>
        </nuxt-link>
        <!-- <nuxt-link
          class="shaxs__block shaxs__title text-center"
          to="/search/debitor/legal"
        >
          <svg
            class="shaxs__svg"
            width="106"
            height="122"
            viewBox="0 0 106 122"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM75.667 68.768L64.3571 114.375L56.7857 81.9688L64.3571 68.625H41.6429L49.2143 81.9688L41.6429 114.375L30.333 68.768C13.4629 69.5781 0 83.4699 0 100.65V110.562C0 116.877 5.08705 122 11.3571 122H94.6429C100.913 122 106 116.877 106 110.562V100.65C106 83.4699 92.537 69.5781 75.667 68.768Z"
            />
          </svg>

          <span class="shaxs__title"> {{ $t("home.search_legal") }}</span>
        </nuxt-link> -->
        <nuxt-link class="shaxs__block text-center shaxs__title" :to="localePath({
          name: 'treaded-users',
          query: {
            searchtype: 'debitor',
          },
        })">
          <svg class="shaxs__svg" width="106" height="122" viewBox="0 0 106 122" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 0L0 22.1818V55.4546C0 86.2318 22.6133 115.013 53 122C83.3867 115.013 106 86.2318 106 55.4546V22.1818L53 0ZM41.2222 88.7273L17.6667 66.5455L25.97 58.7264L41.2222 73.0336L80.03 36.4891L88.3333 44.3636L41.2222 88.7273Z" />
          </svg>

          <span class="shaxs__title"> {{ $t("oldi") }} </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    birthday: "04-10-2000",
    id: null,
    type: null,
    user: null,
  }),
  mounted() {
    if (this.$auth.user.is_active != 1) {
      return this.$router.push(this.localePath({ name: `index` }));
    }
  },
  methods: {
  },
};
</script>

<style scoped>
.date {
  outline: none;
}

.flexs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.shaxs__block {
  transition-duration: 0.5s;
  margin: 0 18px 0 18px;
  background: #ffffff;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  max-width: 250px;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.shaxs__block:hover {
  background: #3182ce;
}

.shaxs__block:hover .shaxs__title {
  color: white;
}

.shaxs__block:hover .shaxs__svg {
  fill: white;
}

.shaxs__title {
  transition-duration: 0.5s;
  font-size: 20px;
  color: #3182ce;
  width: 100%;
  margin: 33px 0 0 0;
}

.shaxs__title:hover {
  color: #fff;
}

.shaxs__svg {
  transition-duration: 0.5s;
  fill: #3182ce;
}

.btn {
  border: 1px solid #8692a6;
  width: 306px;
  height: 64px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}

.bt {
  border: 1px solid #3182ce;
  width: 306px;
  height: 64px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}

.bta {
  width: 306px;
  height: 50px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}
</style>
