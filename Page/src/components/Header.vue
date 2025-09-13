<script setup>
import { useRoute } from 'vue-router'
import { t, setLanguage, currentLanguage } from "tradux"

const route = useRoute()

const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
    { code: 'ja', label: '日本語' },
    { code: 'de', label: 'Deutsch' },
]

const handleLanguageSelect = (code) => {
    setLanguage(code)
    window.location.reload()
}
</script>

<template>
    <!-- Header -->
    <header class="relative">
        <!-- Navigation -->
        <nav class="relative z-20 px-6 py-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div
                        class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-sm">AI</span>
                    </div>
                    <router-link to="/"
                        class="text-white font-semibold text-xl hover:text-purple-300 transition-colors">
                        {{ t.title }}
                    </router-link>
                </div>

                <div class="hidden md:flex items-center space-x-8">
                    <router-link to="/" :class="[
                        'transition-colors',
                        route.name === 'Projects'
                            ? 'text-purple-400 font-medium'
                            : 'text-gray-300 hover:text-white'
                    ]">
                        {{ t.navigation.projects }}
                    </router-link>
                    <router-link to="/contact" :class="[
                        'transition-colors',
                        route.name === 'Contact'
                            ? 'text-purple-400 font-medium'
                            : 'text-gray-300 hover:text-white'
                    ]">
                        {{ t.navigation.contact }}
                    </router-link>
                    <div class="relative inline-block">
                        <details class="group">
                            <summary
                                class="flex gap-2 items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                                <svg aria-hidden="true" class="icon label-icon astro-5trz26bn astro-eytsx3ik" width="16"
                                    height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;">
                                    <path fill-rule="evenodd"
                                        d="M8.516 3a.94.94 0 0 0-.941.94v1.15H2.94a.94.94 0 1 0 0 1.882h7.362a7.422 7.422 0 0 1-1.787 3.958 7.42 7.42 0 0 1-1.422-2.425.94.94 0 1 0-1.774.627 9.303 9.303 0 0 0 1.785 3.043 7.422 7.422 0 0 1-4.164 1.278.94.94 0 1 0 0 1.881 9.303 9.303 0 0 0 5.575-1.855 9.303 9.303 0 0 0 4.11 1.74l-.763 1.525a.968.968 0 0 0-.016.034l-1.385 2.77a.94.94 0 1 0 1.683.841l1.133-2.267h5.806l1.134 2.267a.94.94 0 0 0 1.683-.841l-1.385-2.769a.95.95 0 0 0-.018-.036l-3.476-6.951a.94.94 0 0 0-1.682 0l-1.82 3.639a7.423 7.423 0 0 1-3.593-1.256 9.303 9.303 0 0 0 2.27-5.203h1.894a.94.94 0 0 0 0-1.881H9.456V3.94A.94.94 0 0 0 8.516 3Zm6.426 11.794a1.068 1.068 0 0 1-.02.039l-.703 1.407h3.924l-1.962-3.924-1.24 2.478Z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ currentLanguage }}</span>
                            </summary>
                            <div class="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg hidden group-open:block">
                                <ul>
                                    <li v-for="lang in languages" :key="lang.code">
                                        <button @click="handleLanguageSelect(lang.code)"
                                            class="w-full text-left px-4 py-2 hover:bg-purple-100 text-gray-800">
                                            {{ lang.label }}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </div>
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
