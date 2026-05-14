<script setup>
import { useTradux } from "tradux/vue";

const { isReady } = useTradux();
</script>

<template>
  <router-view v-if="isReady" />
</template>
