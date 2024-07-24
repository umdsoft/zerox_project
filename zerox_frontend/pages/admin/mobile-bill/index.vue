<template>
  <div>
    <div class="setting__title text-center py-4 mb-8 text-white rounded w-1/2 text-2xl mx-auto bg-blue-500">
            Mobil hisob raqami bo'yicha hisobot
        </div>

         <div class="mx-auto flex-col items w-1/3">
   <nuxt-link to="/admin/mobile-bill/iden-report" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white py-4 block text-center w-full rounded">Identifikatsiya jarayoni bo'yicha</nuxt-link>
     <nuxt-link to="/admin/setting/payment" class="bg-blue-500  mt-4 hover:bg-blue-700 text-white block text-center py-4 w-full rounded">Qarz shartnomalari bo'yicha</nuxt-link>
        </div>
  </div>
</template>

<script>
export default {
      // middleware: "checkRole",
    layout:'admin'
}
</script>

<style>

</style>