<template>
  <div class="setting">
               <div class="setting__title text-center py-4 mb-8 text-white rounded w-1/2 text-2xl mx-auto bg-blue-500">
            Sozlamalar 
        </div>

        <div class="mx-auto flex-col items w-1/3">
   <nuxt-link to="/admin/setting/banner" class="bg-blue-500 mt-2 hover:bg-blue-700 text-white py-4 block text-center w-full rounded">Reklama elonlar qismi bo'yicha</nuxt-link>
     <nuxt-link to="/admin/setting/payment" class="bg-blue-500  mt-4 hover:bg-blue-700 text-white block text-center py-4 w-full rounded">To'lovlar tizimi bo'yicha</nuxt-link>
        </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth","checkRole"],
layout:'admin'
}
</script>

<style>

</style>