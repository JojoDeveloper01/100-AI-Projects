<script setup>
import { ref } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import EarthGlobe from '@/components/EarthGlobe.vue'
import { frameworks } from '@/data/frameworks.js'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/vs2015.css'
import { onMounted, nextTick, watch } from 'vue'
import { t } from "tradux"

hljs.registerLanguage('javascript', javascript)

const highlightCode = async () => {
    await nextTick()
    // Remove previous highlighting
    document.querySelectorAll('pre code').forEach(block => {
        block.removeAttribute('data-highlighted')
        block.className = block.className.replace(/hljs[^ ]*/g, '').trim()
    })
    hljs.highlightAll()
}

onMounted(highlightCode)


const activeFramework = ref(0)
const showCopiedFeedback = ref(false)

// Re-highlight code when framework changes
watch(activeFramework, highlightCode)

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedFeedback.value = true
        setTimeout(() => {
            showCopiedFeedback.value = false
        }, 1000)
    })
}
</script>

<template>
    <BaseLayout>
        <section class="hero">
            <div class="flex flex-col gap-10 lg:gap-8">
                <div class="first">
                    <h1 class="mb-6 py-4 md:text-7xl font-bold ">
                        The easiest way to internationalize your App
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-300 max-w-3xl">
                        <span class="text-blue-400 font-semibold">Tradux</span> is a library that facilitates the
                        process of multilingual content management
                        with
                        <span class="text-blue-400 font-semibold">AI-powered translations.</span>
                    </p>
                </div>

                <!-- EarthGlobe between first and second elements -->
                <div class="EarthGlobe-mobile hidden">
                    <EarthGlobe :rotation-speed="0.002" />
                </div>

                <div class="second grid gap-2">
                    <div class="flex gap-3 items-center p-2">
                        <div class="cursor-pointer flex justify-center items-center flex-col gap-2 font-medium"
                            v-for="(framework, index) in frameworks" :key="index" @click="activeFramework = index">
                            <button :class="[
                                `p-2.5 rounded-full border-5`,
                                'flex items-center gap-2 transition-colors duration-300',
                                activeFramework === index
                                    ? ''
                                    : ' hover: hover:bg-white/10'
                            ]" :style="{ borderColor: activeFramework === index ? framework.color : '#6b7280' }">
                                <div class="flex flex-col items-center justify-center">
                                    <span v-html="framework.icon" :style="{
                                        color: activeFramework === index ? framework.color : '#6b7280'
                                    }" class="*:size-12 *:fill-current transition-colors duration-300" />
                                </div>
                            </button>
                            <span :class="[
                                'text-sm font-bold transition-colors duration-300',
                                activeFramework === index ? '' : 'text-gray-400'
                            ]">
                                {{ framework.name }}
                            </span>
                        </div>
                    </div>
                    <div class="relative overflow-hidden rounded-xl">
                        <pre class="language-javascript grid">
                                <code class="rounded-xl min-w-96 px-5 overflow-x-auto custom-scrollbar">{{ frameworks[activeFramework].usage }}</code>
                            </pre>
                        <div class="absolute right-3 top-3 flex justify-end">
                            <button @click="copyToClipboard(frameworks[activeFramework].usage)" :class="[
                                'text-sm flex items-center gap-1 transition-all duration-300 px-3 rounded-lg',
                                showCopiedFeedback
                                    ? 'bg-green-600 '
                                    : 'text-gray-400 hover: hover:bg-white/10'
                            ]">
                                <svg v-if="!showCopiedFeedback" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                {{ showCopiedFeedback ? 'Copied!' : 'Copiar' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="EarthGlobe h-full flex items-start justify-center sticky top-4">
                <EarthGlobe :rotation-speed="0.002" />
            </div>
        </section>

        <section class="p-12 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <h3 class="text-4xl font-bold  mb-4">Start Using Tradux Today</h3>
            <p class="text-xl text-gray-300 mb-6">
                Empower your apps with seamless multilingual support using Tradux.
            </p>
            <div class="">
                <a href="https://github.com/JojoDeveloper01/Tradux" target="_blank"
                    class="inline-flex items-center justify-center px-6! py-4! bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold ! hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" class="mr-2">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Documentation
                </a>
            </div>
        </section>
    </BaseLayout>
</template>

<style scoped>
.hero {
    display: flex;
    gap: 3rem;
    margin-bottom: 8rem;

    h1 {
        font-size: xxx-large;
    }

    >div {
        flex: 1;
    }
}

/* Responsive layout for viewport max 1095px */
@media (max-width: 1095px) {
    .hero {
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }

    /* Hide desktop EarthGlobe */
    .hero>.EarthGlobe {
        display: none;
    }

    /* Show mobile EarthGlobe between first and second */
    .EarthGlobe-mobile {
        display: flex !important;
        justify-content: center;
        width: 100%;
    }
}

/* Desktop: Hide mobile EarthGlobe */
@media (min-width: 1096px) {
    .EarthGlobe-mobile {
        display: none !important;
    }
}

/* Custom scrollbar styling */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #8b5cf6 #374151;
}

.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #7c3aed, #db2777);
}

.custom-scrollbar::-webkit-scrollbar-corner {
    background: #374151;
}
</style>