<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import TranslationTool from '@/100-IA-Projetcs/1-TranslationTool/TranslationTool.vue'
</script>

<template>
  <BaseLayout>
    <div class="max-w-6xl mx-auto">

      <!-- Main Translation Tool -->
      <TranslationTool />

      <!-- Tech Stack -->
      <section class="translation-card p-6">
        <h3 class="text-xl font-bold text-white mb-4">Technology Stack</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-white/5 rounded-lg">
            <div class="text-green-400 text-2xl mb-2">⚡</div>
            <h4 class="text-white font-medium">Vue.js 3</h4>
            <p class="text-gray-400 text-xs">Frontend Framework</p>
          </div>
          <div class="text-center p-3 bg-white/5 rounded-lg">
            <div class="text-blue-400 text-2xl mb-2">🤖</div>
            <h4 class="text-white font-medium"></h4>
            <p class="text-gray-400 text-xs">AI Translation</p>
          </div>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>


<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
