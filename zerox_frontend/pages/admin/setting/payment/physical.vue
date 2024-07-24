<template>
  <div>
    <div
      class="
        setting__title
        text-center
        py-4
        mb-8
        text-white
        rounded
        w-1/2
        text-2xl
        mx-auto
        bg-blue-500
      "
    >
      Sozlamalar
    </div>

    <div class=" flex justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
        Identifikatsiya jarayonida talab qilinadigan mablag' (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>
    <div class=" flex  mt-6 justify-center">
      <div class="border border-blue-400 text-center px-4 text-sm py-2 w-80">
        Yangi Foydalanuvchilar uchun bepul foydalanishni yaratish (kunlar soni)
      </div>
      <div class="border ml-4 border-blue-400 px-4 ">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Kunni kiriting"
          name=""
          id=""
        />
      </div>
    </div>
    <div
      class="
        py-2
        mt-8
        w-1/2
        mx-auto
        text-sm
        px-4
        text-center
        bg-blue-500
        rounded
        text-white
      "
    >
      Qarz shartnomalari bo'yicha ko'rsatilgan xizmat uchun to'lovlar miqdori
    </div>
   <div class=" flex mt-4 justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
       100.000 so'mgacha tuzilgan shartnomalar uchun (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>

       <div class=" flex mt-4 justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
       1.000.000 so'mgacha tuzilgan shartnomalar uchun (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>
       <div class=" flex mt-4 justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
       10.000.000 so'mgacha tuzilgan shartnomalar uchun (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>

      <div class=" flex mt-4 justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
       100.000.000 so'mgacha tuzilgan shartnomalar uchun (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input bg-transparent w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>

      <div class=" flex mt-4 justify-center">
      <div class="border border-blue-400 text-center text-sm px-4 py-2 w-80">
       100.000.000 so'mgacha tuzilgan shartnomalar uchun (so'mda)
      </div>
      <div class="border ml-4 border-blue-400 px-4">
        <input
          type="text"
          class="input w-full"
          placeholder="Summani kiriting"
          name=""
          id=""
        />
      </div>
    </div>

     <button class="bg-blue-500 mx-auto block text-white text-center px-8 rounded mt-6  py-4">
       Saqlash
      </button>

  </div>
</template>

<script>
export default {
      //  middleware: "checkRole",
  layout: "admin",
};
</script>

<style lang="scss" scoped>
.input {
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
}
</style>>

