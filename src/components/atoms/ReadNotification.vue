<template>
  <div v-if="dayRead" class="flex items-baseline h-16 w-16 md:h-20 md:w-20">
    <span class="sr-only">
      {{ $t("msgSentOn") + " " + dayRead }}
    </span>
    <span
      aria-hidden="true"
      class="
        font-heading font-light
        text-sm
        md:text-base
        w-full
        text-center
        pt-4
        uppercase
      "
    >
      {{ dayRead }}
    </span>
  </div>
  <div
    v-else
    class="flex place-items-center justify-center h-16 w-16 md:h-20 md:w-20"
  >
    <div class="bg-alert-main rounded-full w-4 h-4" />
  </div>
</template>

<script>
export default {
  props: {
    dayRead: String,
    indexNum: Number,
  },
};
</script>
