<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { t, setLanguage, getCurrentLanguage, getAvailableLanguages } from "tradux"

const route = useRoute()

const selectedLanguage = ref(getCurrentLanguage())

const currentLang = ref('')

onMounted(async () => {
    currentLang.value = await getCurrentLanguage()
})

const changeLanguage = async (newLang) => {
    const success = await setLanguage(newLang)
    if (success) {
        selectedLanguage.value = newLang
        window.location.reload()
    }
}
</script>

<template>
    <!-- Header -->
    <header class="relative">
        <!-- Navigation -->
        <nav class="z-20 py-4">
            <div class="mx-auto flex items-center justify-between">

                <div class="flex items-center space-x-2">
                    <router-link to="/"
                        class="size-8 bg-black rounded-lg flex items-center justify-center font-semibold text-xl hover:text-purple-300 transition-colors">
                        <span class=" font-bold text-sm">AI</span>
                    </router-link>
                </div>
                <div class="flex items-center space-x-8">
                    <router-link to="/#projects" :class="[
                        'transition-colors',
                        route.name === 'Projects'
                            ? 'text-blue-400 font-medium'
                            : 'text-gray-300 hover:'
                    ]">
                        {{ t.navigation.projects }}
                    </router-link>
                    <router-link to="/contact" :class="[
                        'transition-colors',
                        route.name === 'Contact'
                            ? 'text-blue-400 font-medium'
                            : 'text-gray-300 hover:'
                    ]">
                        {{ t.navigation.contact }}
                    </router-link>
                </div>

                <div class="relative inline-block">
                    <details class="group">
                        <summary class="flex gap-2 items-center cursor-pointer px-4 py-2 rounded-md">
                            <svg aria-hidden="true" class="icon label-icon astro-5trz26bn astro-eytsx3ik" width="16"
                                height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1em;">
                                <path fill-rule="evenodd"
                                    d="M8.516 3a.94.94 0 0 0-.941.94v1.15H2.94a.94.94 0 1 0 0 1.882h7.362a7.422 7.422 0 0 1-1.787 3.958 7.42 7.42 0 0 1-1.422-2.425.94.94 0 1 0-1.774.627 9.303 9.303 0 0 0 1.785 3.043 7.422 7.422 0 0 1-4.164 1.278.94.94 0 1 0 0 1.881 9.303 9.303 0 0 0 5.575-1.855 9.303 9.303 0 0 0 4.11 1.74l-.763 1.525a.968.968 0 0 0-.016.034l-1.385 2.77a.94.94 0 1 0 1.683.841l1.133-2.267h5.806l1.134 2.267a.94.94 0 0 0 1.683-.841l-1.385-2.769a.95.95 0 0 0-.018-.036l-3.476-6.951a.94.94 0 0 0-1.682 0l-1.82 3.639a7.423 7.423 0 0 1-3.593-1.256 9.303 9.303 0 0 0 2.27-5.203h1.894a.94.94 0 0 0 0-1.881H9.456V3.94A.94.94 0 0 0 8.516 3Zm6.426 11.794a1.068 1.068 0 0 1-.02.039l-.703 1.407h3.924l-1.962-3.924-1.24 2.478Z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span>{{ currentLang }}</span>
                        </summary>
                        <div class="absolute right-0 mt-2 w-36 bg-[#2a2a2a] rounded shadow-lg group-open:block z-[999]">
                            <ul>
                                <li v-for="lang in getAvailableLanguages()" :key="lang.value" :name="lang.name"
                                    :value="lang.value">
                                    <button @click=" changeLanguage(lang.value)"
                                        class="w-full text-left px-4 py-2 hover:bg-[#0000002e] text-gray-800">
                                        {{ lang.name }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
        </nav>
    </header>
</template>
