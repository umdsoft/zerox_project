<template>
  <div class="bg-white rounded py-4">
    <h1 class="font-mono-serif text-3xl text-center mt-8">
      {{ $t("menu.about") }}
    </h1>

    <p style="text-align: justify" class="font-mono-serif py-10 px-8">
      {{ $t('a1.a01') }}
    </p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  created() {
    let links = [{ title: "Biz haqimizda", name: "about" }];
    this.$store.commit("changeBreadCrumb", links);
  },
};
</script>
