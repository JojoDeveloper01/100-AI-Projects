<script setup>
import { ref, computed } from 'vue'
import ProjectGrid from './components/ProjectGrid.vue'
import { projects, categories } from './data/projects.js'

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
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Header -->
    <header class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
      
      <!-- Navigation -->
      <nav class="relative z-10 px-6 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">AI</span>
            </div>
            <span class="text-white font-semibold text-xl">100 AI Projects</span>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#projects" class="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#about" class="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" class="text-gray-300 hover:text-white transition-colors">Contact</a>
            <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative z-10 px-6 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              100 AI Projects
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A comprehensive collection of artificial intelligence projects showcasing the power of modern AI technologies
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

          <!-- Search and Filter -->
          <div class="max-w-2xl mx-auto space-y-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search projects..."
                class="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <!-- Category Filter -->
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Projects Section -->
    <main id="projects" class="px-6 py-12">
      <div class="max-w-7xl mx-auto">
        <ProjectGrid :projects="filteredProjects" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-black/50 backdrop-blur-sm border-t border-white/10 px-6 py-12">
      <div class="max-w-7xl mx-auto text-center">
        <div class="flex items-center justify-center space-x-2 mb-4">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">AI</span>
          </div>
          <span class="text-white font-semibold text-xl">100 AI Projects</span>
        </div>
        <p class="text-gray-400 mb-6">Exploring the frontiers of artificial intelligence, one project at a time.</p>
        
        <div class="flex justify-center space-x-6 mb-8">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        
        <div class="border-t border-white/10 pt-8">
          <p class="text-gray-500 text-sm">
            2024 100 AI Projects. Built with Vue.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
