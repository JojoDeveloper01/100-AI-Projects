<script setup>
import { ref, computed } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const sortBy = ref('newest')
const viewMode = ref('grid') // 'grid' or 'list'

const sortedProjects = computed(() => {
  const sorted = [...props.projects]
  
  switch (sortBy.value) {
    case 'newest':
      return sorted.sort((a, b) => {
        if (!a.completedDate && !b.completedDate) return 0
        if (!a.completedDate) return 1
        if (!b.completedDate) return -1
        return new Date(b.completedDate) - new Date(a.completedDate)
      })
    case 'oldest':
      return sorted.sort((a, b) => {
        if (!a.completedDate && !b.completedDate) return 0
        if (!a.completedDate) return 1
        if (!b.completedDate) return -1
        return new Date(a.completedDate) - new Date(b.completedDate)
      })
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'difficulty':
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 }
      return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
    case 'status':
      const statusOrder = { 'Completed': 1, 'In Progress': 2, 'Planning': 3, 'On Hold': 4 }
      return sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
    default:
      return sorted
  }
})
</script>

<template>
  <div>
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <!-- Results Count -->
      <div class="text-white">
        <span class="text-2xl font-bold">{{ projects.length }}</span>
        <span class="text-gray-300 ml-2">{{ projects.length === 1 ? 'project' : 'projects' }} found</span>
      </div>

      <!-- Sort and View Controls -->
      <div class="flex items-center space-x-4">
        <!-- Sort Dropdown -->
        <div class="relative">
          <select 
            v-model="sortBy"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-8"
          >
            <option value="newest" class="bg-gray-800">Newest First</option>
            <option value="oldest" class="bg-gray-800">Oldest First</option>
            <option value="title" class="bg-gray-800">Title A-Z</option>
            <option value="difficulty" class="bg-gray-800">Difficulty</option>
            <option value="status" class="bg-gray-800">Status</option>
          </select>
          <svg class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <!-- View Mode Toggle -->
        <div class="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded-md transition-all',
              viewMode === 'grid'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded-md transition-all',
              viewMode === 'list'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="projects.length === 0" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">No projects found</h3>
      <p class="text-gray-400">Try adjusting your search or filter criteria</p>
    </div>

    <!-- Projects Grid -->
    <div 
      v-else
      :class="[
        'transition-all duration-300',
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      ]"
    >
      <div
        v-for="project in sortedProjects"
        :key="project.id"
        :class="[
          'transition-all duration-300',
          viewMode === 'list' ? 'transform hover:scale-[1.02]' : ''
        ]"
      >
        <ProjectCard 
          :project="project" 
          :class="viewMode === 'list' ? 'flex-row' : ''"
        />
      </div>
    </div>

    <!-- Load More Button (for future pagination) -->
    <div v-if="projects.length > 0" class="text-center mt-12">
      <div class="text-gray-400 text-sm mb-4">
        Showing {{ projects.length }} of {{ projects.length }} projects
      </div>
      
      <!-- Scroll to Top Button -->
      <button
        class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          <a href="#projects" class="text-white hover:text-gray-200 transition-colors">Back to Top</a>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}
</style>
