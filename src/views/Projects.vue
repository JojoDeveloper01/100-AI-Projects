<script setup>
import { ref, computed } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
import { projects, categories } from '@/data/projects.js'

const selectedCategory = ref('All')
const searchQuery = ref('')

const filteredProjects = computed(() => {
  let filtered = projects

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(project => project.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const completedProjects = computed(() => projects.filter(p => p.status === 'Completed').length)
const inProgressProjects = computed(() => projects.filter(p => p.status === 'In Progress').length)
</script>

<template>
  <BaseLayout>
    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-10">
      <div class="max-w-4xl m-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            100 AI Projects
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-bold mb-8 leading-relaxed">
          A comprehensive collection of artificial intelligence projects showcasing the power of modern AI
          technologies
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8 mb-12">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-white">{{ projects.length }}</div>
            <div class="text-gray-300 text-sm">Total Projects</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-green-400">{{ completedProjects }}</div>
            <div class="text-gray-300 text-sm">Completed</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-yellow-400">{{ inProgressProjects }}</div>
            <div class="text-gray-300 text-sm">In Progress</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div class="text-3xl font-bold text-purple-400">{{ categories.length - 1 }}</div>
            <div class="text-gray-300 text-sm">Categories</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="px-6">
      <!-- Search and Filter -->
      <div class="max-w-4xl m-auto">
        <div class="relative mb-8">
          <input v-model="searchQuery" type="text" placeholder="Search projects..."
            class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- Category Filter -->
        <div class="relative flex flex-wrap justify-center gap-2 z-10">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            selectedCategory === category
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
          ]">
            {{ category }}
          </button>
        </div>
      </div>
      <div class="max-w-7xl mt-8 mx-auto mb-12">
        <ProjectGrid :projects="filteredProjects" />
      </div>
    </section>
  </BaseLayout>
</template>
