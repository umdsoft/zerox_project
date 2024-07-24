<template>
  <div>
    <!-- Edit password -->
    <div class="fix-vh" v-if="isAdmin" @click="$emit('cancel')"></div>
    <div v-if="isAdmin" class="modal" style="width: 400px">
      <div class="modal-header">
        <h2>{{ $t('a1.a37') }}</h2>
      </div>

      <div class="modal-body"></div>
      <div class="modal-bottom">
        <button @click="$emit('cancel')" class="btn-danger">
          {{ $t('a1.a36') }}
        </button>
        <button @click="$emit('yes')" class="btn-success">{{ $t('a1.a38') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss"></style>
