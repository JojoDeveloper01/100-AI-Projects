<script setup>
import { useTradux } from "tradux/vue";

const { t } = useTradux();
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <div
        class="size-155 rounded-full border-4 border-white/10 border-t-white/30 animate-spin"
      ></div>

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="text-white/70 text-lg font-medium mb-2">
            {{ t.loading.globe }}
          </div>
          <div class="flex space-x-1 justify-center">
            <div
              class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style="animation-delay: 0ms"
            ></div>
            <div
              class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style="animation-delay: 150ms"
            ></div>
            <div
              class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style="animation-delay: 300ms"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -6px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -3px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
}
</style>
