<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <!-- Header -->
    <header class="relative overflow-hidden">
        <!-- Navigation -->
        <nav class="relative z-10 px-6 py-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div
                        class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-sm">AI</span>
                    </div>
                    <router-link to="/"
                        class="text-white font-semibold text-xl hover:text-purple-300 transition-colors">
                        100 AI Projects
                    </router-link>
                </div>

                <div class="hidden md:flex items-center space-x-8">
                    <router-link to="/" :class="[
                        'transition-colors',
                        route.name === 'Projects'
                            ? 'text-purple-400 font-medium'
                            : 'text-gray-300 hover:text-white'
                    ]">
                        Projects
                    </router-link>
                    <router-link to="/contact" :class="[
                        'transition-colors',
                        route.name === 'Contact'
                            ? 'text-purple-400 font-medium'
                            : 'text-gray-300 hover:text-white'
                    ]">
                        Contact
                    </router-link>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button class="text-gray-300 hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>
