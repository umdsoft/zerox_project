<template>
  <div class="waiver bg-white px-4 py-4 w-full my-4" style="border-radius: 6px">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>
    <div>
      <div class="flex justify-center items-center">
        <div style="width: 26.6rem">
          <h2 class="font-bold text-xl text-center">
            {{ $t("list.return") }}
          </h2>
          <nuxt-link :to="localePath({
            name: 'debt-refund-full',
            query: {
              contract: $route.query.contract
            }
          })"
            class="rounded-lg justify-center w-full py-4 px-6 flex items-center bg-t_primary text-white mt-6 text-sm">
            <img class="mr-2 w-5" src="@/assets/img/Group.png" alt="" />
            {{ $t("list.fullReturn") }}
          </nuxt-link>
          <nuxt-link :to="localePath({
            name: 'debt-refund-partially',
            query: {
              contract: $route.query.contract
            }
          })"
            class="rounded-lg justify-center w-full py-4 px-6 flex items-center bg-t_primary text-white mt-6 text-sm">
            <img class="mr-2 w-5" src="@/assets/img/Vector.png" alt="" />
            {{ $t('list.ozReturn') }}
          </nuxt-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    contract: null,
  }),

};
</script>

<style lang="css" scoped>
.debt_notification {
  width: 100%;

  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

.input {
  border: 1px solid #1565d8;
  width: 100%;
  height: 50px;
  text-indent: 10px;
  border-radius: 5px;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border: 1px solid #1565d8;
}
</style>
