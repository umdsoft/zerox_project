<template>
  <div class="nav">
    <div class="media-navas px-6 py-3.5 rounded-xl bg-white" style="padding-bottom: 1.5rem">
      <div class="flex justify-center mb-3.5">
        <nuxt-link :to="localePath({ name: 'index' })"><img src="@/assets/img/logo.svg" alt="" width="250"
            height="250" />
        </nuxt-link>
      </div>

      <hr />
      <div class="ml-6 mr-7">
        <nuxt-link :to="localePath({ name: 'auth-login' })">
          <div @click="$store.commit('Media_Menu_Close', false)" style="background-color: white; cursor: pointer"
            class="flex mt-4 px-2 py-2 rounded items-center">
            <nuxt-link :to="localePath({ name: 'index' })">
              <div class="mr-3">
                <svg width="55" height="55" viewBox="0 0 15 15" fill="#3182CE" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.74534 1.89199C9.17522 1.27646 8.37893 0.9375 7.50003 0.9375C6.61643 0.9375 5.81751 1.27441 5.25003 1.88613C4.6764 2.50459 4.3969 3.34512 4.46253 4.25273C4.59261 6.04336 5.9552 7.5 7.50003 7.5C9.04485 7.5 10.4051 6.04365 10.5372 4.25332C10.6037 3.35391 10.3225 2.51514 9.74534 1.89199Z" />
                  <path
                    d="M12.6564 14.0625H2.34392C2.20894 14.0643 2.07526 14.0359 1.95262 13.9795C1.82997 13.9231 1.72145 13.84 1.63493 13.7364C1.4445 13.5088 1.36775 13.1979 1.42458 12.8836C1.67185 11.5119 2.44353 10.3597 3.65642 9.55078C4.73396 8.83271 6.0989 8.4375 7.50016 8.4375C8.90143 8.4375 10.2664 8.83301 11.3439 9.55078C12.5568 10.3594 13.3285 11.5116 13.5757 12.8833C13.6326 13.1977 13.5558 13.5085 13.3654 13.7361C13.2789 13.8398 13.1704 13.9229 13.0478 13.9794C12.9251 14.0358 12.7914 14.0642 12.6564 14.0625Z" />
                </svg>
              </div>
            </nuxt-link>
            <div class="">
              <div class="">
                <h2 style="font-size: 12px" class="font-s font-bold">
                  {{ $t('a1.a39') }}
                </h2>
              </div>
              <div class="login__btn mt-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.6667 0H1.33333C0.593333 0 0 0.593333 0 1.33333V4H1.33333V1.33333H10.6667V10.6667H1.33333V8H0V10.6667C0 11.0203 0.140476 11.3594 0.390524 11.6095C0.640573 11.8595 0.979711 12 1.33333 12H10.6667C11.0203 12 11.3594 11.8595 11.6095 11.6095C11.8595 11.3594 12 11.0203 12 10.6667V1.33333C12 0.979711 11.8595 0.640573 11.6095 0.390524C11.3594 0.140476 11.0203 0 10.6667 0ZM4.72 8.38667L5.66667 9.33333L9 6L5.66667 2.66667L4.72 3.60667L6.44667 5.33333H0V6.66667H6.44667L4.72 8.38667Z"
                    fill="white" />
                </svg>
                <h2 class="text-center ml-3 font-bold">{{ $t('debt_list.a89') }}</h2>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .nav {
    height: 100%;

    .rounded-xl {
      border-radius: 0 !important;
    }
  }

  .media-navas {
    border-radius: 0 !important;
    height: 100%;
  }
}

.login__btn {
  width: max-content;
  font-size: 12px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 5px 18px;
  background: #3182ce;
  color: white;
  border-radius: 5px;
}
</style>
