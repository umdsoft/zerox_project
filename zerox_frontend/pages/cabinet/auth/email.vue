<template>
  <div class="auth bg-white pt-4 px-4">
    <div @click="step == 1 ? $router.go(-1) : step--" class="my-2 mx-6 hidden lg:inline-flex  items-center"
      style="cursor:pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500"> {{ $t('back') }} </p>

    </div>

    <div class="flex justify-center items-center" style="margin-top:5rem">
      <div style="width:26.6rem;">
        <h2 class="font-bold text-2xl">Avtorizatsiya</h2>
        <p class="text-gray-500  my-5">E-pochta manzilingizni kiriting</p>
        <hr class="hr_line my-5">
        <p class="text-t_secondary mb-2">E-pochta manzili*</p>
        <input type="text" :placeholder="$t('a1.a47')" class="input ">
        <button @click="stepGo" class="bg-t_primary hover:bg-blue-700 text-white mt-6 py-4   px-4 rounded w-full">Davom
          etish</button>

      </div>

    </div>




  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    step: 1,
    email: null
  }),
  validations: {
    email: {

    }
  },
  methods: {

    stepGo() {
      console.log('step')
      this.step = this.step + 1
    }
  }
};
</script>

<style lang="css" scoped>
.auth {
  padding-bottom: 8rem;
}

.hr_line {
  border: none;
  height: 0.2px;
  /* Set the hr color */
  color: #f5f5f5;
  /* old IE */
  background-color: #f5f5f5;
  /* Modern Browsers */
}

.input {
  border: 1px solid #1565d8;
  width: 100%;
  height: 50px;
  text-indent: 10px;
  border-radius: 5px;
}

input:focus {
  outline: none;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border: 1px solid #1565d8;
}
</style>