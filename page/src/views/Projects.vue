<script setup>
import { ref, computed } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
import { projects, categories } from '@/data/projects.js'
import { t } from 'tradux'

const selectedCategory = ref('All')
const searchQuery = ref('')

const filteredProjects = computed(() => {
  let filtered = projects(t)

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(project => project.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query))
  }

  return filtered
})

const completedProjects = computed(() => projects(t).filter(p => p.status === t.status.completed).length)
const inProgressProjects = computed(() => projects(t).filter(p => p.status === t.status.inProgress).length)
</script>

<template>
  <BaseLayout>
    <!-- Hero Section -->
    <section class="relative">
      <div class="m-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold leading-tight">
          <span class="capitalize">
            {{ t.title }}
          </span>
        </h1>

        <div class="relative h-88">
          <spline-viewer class="m-auto"
            url="https://prod.spline.design/tuWb-1s-7gHqANF7/scene.splinecode"></spline-viewer>
          <div class="absolute inset-x-0 bottom-0 h-full from-black/40 to-transparent pointer-events-none">
          </div>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 pt-4 pb-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold ">{{ projects(t).length }}</div>
            <div class="text-gray-300 text-sm">{{ t.hero.totalProjects }}</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-green-400">{{ completedProjects }}</div>
            <div class="text-gray-300 text-sm">{{ t.status.completed }}</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-yellow-400">{{ inProgressProjects }}</div>
            <div class="text-gray-300 text-sm">{{ t.status.inProgress }}</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-blue-400">{{ categories(t).length - 1 }}</div>
            <div class="text-gray-300 text-sm">{{ t.hero.categories }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects">
      <!-- Search and Filter -->
      <div class="from-black/40 to-transparent m-auto">
        <div class="relative mb-8">
          <input v-model="searchQuery" type="text" :placeholder="t.hero.search"
            class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <svg class="absolute right-7 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- Category Filter -->
        <div class="relative flex flex-wrap justify-center gap-2">
          <button v-for="category in categories(t)" :key="category" @click="selectedCategory = category" :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            selectedCategory === category
              ? 'bg-blue-500'
              : 'bg-blue-500/10 hover:bg-blue-500/20!'
          ]">
            {{ category }}
          </button>
        </div>
      </div>

      <div class="mt-8 mx-auto mb-12">
        <ProjectGrid :projects="filteredProjects" />
      </div>
    </section>
  </BaseLayout>
</template>
