<script setup>
import { ref, defineAsyncComponent } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { frameworks } from '@/data/frameworks.js'

// Lazy load EarthGlobe component (contains Three.js)
const EarthGlobe = defineAsyncComponent({
    loader: () => import('@/components/EarthGlobe.vue'),
    loadingComponent: () => import('@/components/LoadingGlobe.vue'),
    delay: 200, // Show loading after 200ms
    timeout: 10000 // Timeout after 10 seconds
})

import 'highlight.js/styles/vs2015.css'
import { onMounted, nextTick, watch } from 'vue'
import { t } from "tradux"

const highlightCode = async () => {
    // Dynamic import of highlight.js to reduce initial bundle
    const [{ default: hljs }, { default: javascript }] = await Promise.all([
        import('highlight.js/lib/core'),
        import('highlight.js/lib/languages/javascript')
    ])

    hljs.registerLanguage('javascript', javascript)
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
const activePackageManager = ref(0)
const showCopiedFeedback = ref(false)

// Package managers data
const packageManagers = [
    {
        name: 'npm',
        color: '#CB3837',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>`,
        installCommand: 'npm install tradux',
        extraStep: false
    },
    {
        name: 'yarn',
        color: '#2C8EBB',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.461 2.619.461 2.619s1.266.047 1.473.263c.207.216.293.468.293.468s.549 1.67.467 3.307c-.033.691-.088 1.308-.088 1.308s.462 1.355-.168 1.999c-.63.644-1.26.613-1.26.613s-.99.084-1.74-.265c-.75-.35-1.43-.964-1.43-.964s-.75.964-1.43.964-1.74.265-1.74.265-.63.031-1.26-.613c-.63-.644-.168-1.999-.168-1.999s-.055-.617-.088-1.308c-.082-1.637.467-3.307.467-3.307s.086-.252.293-.468c.207-.216 1.473-.263 1.473-.263s-.016-1.702.461-2.619c.097-.185.259-.319.463-.375.083-.023.241-.069.551.019.468-.969.63-1.071.755-1.154a.981.981 0 01.525-.157z"/></svg>`,
        installCommand: 'yarn add tradux',
        extraStep: false
    },
    {
        name: 'pnpm',
        color: '#F69220',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v7.5h7.5V0H0zm8.25 0v7.5h7.5V0h-7.5zm8.25 0v7.5H24V0h-7.5zM0 8.25v7.5h7.5v-7.5H0zm8.25 0v7.5h7.5v-7.5h-7.5zM0 16.5V24h7.5v-7.5H0zm8.25 0V24h7.5v-7.5h-7.5zm8.25 0V24H24v-7.5h-7.5z"/></svg>`,
        installCommand: 'pnpm install tradux && pnpx tradux init',
        extraStep: true
    },
    {
        name: 'bun',
        color: '#FBF0DF',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0.75c-0.622 0-1.125 0.503-1.125 1.125v0.75c0 0.622 0.503 1.125 1.125 1.125s1.125-0.503 1.125-1.125v-0.75c0-0.622-0.503-1.125-1.125-1.125zM5.636 5.636c-0.44-0.44-1.153-0.44-1.591 0s-0.44 1.153 0 1.591l0.531 0.531c0.44 0.44 1.153 0.44 1.591 0s0.44-1.153 0-1.591l-0.531-0.531zM18.364 5.636c0.44-0.44 1.153-0.44 1.591 0s0.44 1.153 0 1.591l-0.531 0.531c-0.44 0.44-1.153 0.44-1.591 0s-0.44-1.153 0-1.591l0.531-0.531zM12 5.25c-3.728 0-6.75 3.022-6.75 6.75 0 3.311 2.397 6.095 5.625 6.658v3.592c0 0.622 0.503 1.125 1.125 1.125s1.125-0.503 1.125-1.125v-3.592c3.228-0.563 5.625-3.347 5.625-6.658 0-3.728-3.022-6.75-6.75-6.75z"/></svg>`,
        installCommand: 'bun install tradux && bunx tradux init',
        extraStep: true
    }
]

// Code snippets for copy functionality
const codeSnippets = {
    envVars: 'CLOUDFLARE_ACCOUNT_ID=your_account_id\nCLOUDFLARE_API_TOKEN=your_api_token',
    configJson: '{\n    "i18nPath": "./i18n",\n    "defaultLanguage": "en",\n    "availableLanguages": ["en"]\n}',
    cliBasic: 'npx tradux',
    cliInit: 'npx tradux init',
    cliTranslate: '# Single language\nnpx tradux -t es\n\n# Multiple languages\nnpx tradux -t es,pt,fr\n\n# Interactive mode\nnpx tradux -t',
    cliUpdate: '# Update all existing languages\nnpx tradux -u\n\n# Update specific languages\nnpx tradux -u es,pt',
    cliRemove: '# Interactive removal\nnpx tradux -r\n\n# Remove specific languages\nnpx tradux -r es,pt',
    jsImport: 'import { t, setLanguage, currentLanguage, availableLanguages, config } from \'tradux\';'
}

// Re-highlight code when framework or package manager changes
watch([activeFramework, activePackageManager], highlightCode)

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
                        <span class="text-blue-400 font-bold">Tradux</span> - Intelligent Translation Library
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-300 max-w-3xl">
                        Developer-friendly translation
                        library that automates the process of managing multilingual content in your projects. It
                        seamlessly integrates with
                        <span class="text-blue-400 font-semibold">Cloudflare Workers to provide AI-powered
                            translations</span> using language models.
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
                                `p-2.5 rounded-full! border-5`,
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

        <!-- Call to Action Section -->
        <section class="translation-card p-8 mb-16">
            <h3 class="text-4xl font-bold  mb-4">Start Using Tradux Today</h3>
            <p class="text-xl text-gray-300 mb-6">
                Empower your apps with seamless multilingual support using Tradux.
            </p>
            <div class="">
                <a href="https://github.com/JojoDeveloper01/Tradux" target="_blank"
                    class="inline-flex items-center justify-center px-6! py-4! bg-blue-500 rounded-lg font-semibold ! hover:bg-blue-600 transition-colors duration-300">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" class="mr-2">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Documentation
                </a>
            </div>
        </section>

        <!-- Purpose Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-blue-400">🎯 Purpose</h2>
                <p class="text-lg text-gray-300 mb-6">
                    Tradux solves the common problem of managing translations in modern applications by:
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">Automating translation workflows</h3>
                        <p class="text-gray-300">No more manual translation files</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">Providing intelligent updates</h3>
                        <p class="text-gray-300">Sync translations when your base language changes</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">Offering simple integration</h3>
                        <p class="text-gray-300">Works with any JavaScript framework</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">Maintaining consistency</h3>
                        <p class="text-gray-300">Ensures all languages stay in sync with your default language</p>
                    </div>
                </div>
                <div class="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <h3 class="text-xl font-semibold text-blue-300 mb-2">Auto-syncing config</h3>
                    <p class="text-gray-300">Automatically updates availableLanguages when files are added/removed</p>
                </div>
            </div>
        </section>

        <!-- Key Features Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-green-400">⚡ Key Features</h2>
                <div class="space-y-4 grid grid-cols-2">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">AI-Powered Translations via Cloudflare
                                Workers API</h3>
                            <p class="text-gray-300">Worker AI - m2m100-1.2b</p>

                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Automatic Language Synchronization</h3>
                            <p class="text-gray-300">Add/remove content across all languages</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Smart Update System</h3>
                            <p class="text-gray-300">Only translates missing content, preserves existing translations
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Auto Config Management</h3>
                            <p class="text-gray-300">Automatically syncs availableLanguages with actual files</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Framework Agnostic</h3>
                            <p class="text-gray-300">Works with React, Vue, Vanilla JS, Node.js, and more</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Local Storage Integration</h3>
                            <p class="text-gray-300">Remembers user language preferences</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Simple CLI Interface</h3>
                            <p class="text-gray-300">Easy-to-use command line tools</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">Intelligent Path Resolution</h3>
                            <p class="text-gray-300">Automatically finds i18n folders in public directories</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Installation Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-purple-400">🚀 Installation</h2>

                <!-- Package Manager Selector -->
                <div class="mb-6">
                    <div class="flex gap-3 items-center p-2 mb-4">
                        <div class="cursor-pointer flex justify-center items-center flex-col gap-2 font-medium"
                            v-for="(packageManager, index) in packageManagers" :key="index"
                            @click="activePackageManager = index">
                            <button :class="[
                                'p-2.5 rounded-full! border-4 flex items-center gap-2 transition-colors duration-300',
                                activePackageManager === index
                                    ? ''
                                    : 'hover:bg-white/10'
                            ]"
                                :style="{ borderColor: activePackageManager === index ? packageManager.color : '#6b7280' }">
                                <div class="flex flex-col items-center justify-center">
                                    <span v-html="packageManager.icon" :style="{
                                        color: activePackageManager === index ? packageManager.color : '#6b7280'
                                    }" class="*:size-8 *:fill-current transition-colors duration-300" />
                                </div>
                            </button>
                            <span :class="[
                                'text-sm font-bold transition-colors duration-300',
                                activePackageManager === index ? '' : 'text-gray-400'
                            ]" :style="{
                                color: activePackageManager === index ? packageManagers[activePackageManager].color : ''
                            }">
                                {{ packageManager.name }}
                            </span>
                        </div>
                    </div>

                    <!-- Installation Command Display -->
                    <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                        <pre
                            class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">{{ packageManagers[activePackageManager].installCommand }}</code></pre>
                        <button @click="copyToClipboard(packageManagers[activePackageManager].installCommand)"
                            class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </button>
                    </div>

                    <!-- Extra Step Notice for pnpm/bun -->
                    <div v-if="packageManagers[activePackageManager].extraStep"
                        class="mt-4 p-4 rounded-lg bg-orange-500/10 border border-orange-400/20">
                        <div class="flex items-start gap-3">
                            <div
                                class="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span class="text-xs font-bold text-black">!</span>
                            </div>
                            <div>
                                <h4 class="text-orange-300 font-semibold mb-1">Extra Step Required</h4>
                                <p class="text-sm text-gray-300">
                                    {{ packageManagers[activePackageManager].name }} requires running the init command
                                    to properly set up Tradux in your project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Setup Requirements Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-orange-400">📋 Setup Requirements</h2>
                <div class="space-y-4">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-orange-300 mb-2">Cloudflare Account</h3>
                        <p class="text-gray-300">You need Cloudflare API credentials</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-orange-300 mb-4">Environment Variables</h3>
                        <p class="text-gray-300 mb-3">Create a .env file with:</p>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token</code></pre>
                            <button @click="copyToClipboard(codeSnippets.envVars)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Configuration Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-cyan-400">⚙️ Configuration</h2>
                <p class="text-lg text-gray-300 mb-6">
                    After installation, Tradux automatically creates a <code
                        class="bg-gray-800 px-2 py-1 rounded">tradux.config.json</code> file:
                </p>

                <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-6">
                    <pre class="language-json"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">{
    "i18nPath": "./i18n",
    "defaultLanguage": "en",
    "availableLanguages": ["en"]
}</code></pre>
                    <button @click="copyToClipboard(codeSnippets.configJson)"
                        class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                    </button>
                </div>

                <h3 class="text-xl font-semibold text-cyan-300 mb-4">Configuration Options:</h3>
                <div class="space-y-3">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">defaultLanguage</code> - Your base language (default: 'en')
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">i18nPath</code> - Path to translation files (default: './i18n')
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">availableLanguages</code> - Auto-managed list of available
                            language files
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CLI Usage Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-yellow-400">🛠️ CLI Usage</h2>

                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">View all available commands:</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre
                                class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">npx tradux</code></pre>
                            <button @click="copyToClipboard(codeSnippets.cliBasic)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">Initialize Tradux in your project:</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre
                                class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">npx tradux init</code></pre>
                            <button @click="copyToClipboard(codeSnippets.cliInit)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">Translate to specific languages:</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Single language
npx tradux -t es

# Multiple languages
npx tradux -t es,pt,fr

# Interactive mode
npx tradux -t</code></pre>
                            <button @click="copyToClipboard(codeSnippets.cliTranslate)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">Update existing translations:</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Update all existing languages
npx tradux -u

# Update specific languages
npx tradux -u es,pt</code></pre>
                            <button @click="copyToClipboard(codeSnippets.cliUpdate)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">Remove language files:</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Interactive removal
npx tradux -r

# Remove specific languages
npx tradux -r es,pt</code></pre>
                            <button @click="copyToClipboard(codeSnippets.cliRemove)"
                                class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p class="text-gray-300">
                            <strong class="text-yellow-300">Update vs Translate:</strong> Update (-u) syncs existing
                            language files with your default language, adding missing content and removing obsolete
                            keys. Translate (-t) creates new translation files. Remove (-r) deletes language files and
                            automatically updates the config.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- JavaScript API Section -->
        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-pink-400">💻 JavaScript API</h2>

                <div class="mb-6">
                    <p class="text-lg text-gray-300 mb-4">Import Tradux functions in your application:</p>
                    <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                        <pre
                            class="language-javascript"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">import { t, setLanguage, currentLanguage, availableLanguages, config } from 'tradux';</code></pre>
                        <button @click="copyToClipboard(codeSnippets.jsImport)"
                            class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </button>
                    </div>
                </div>

                <h3 class="text-2xl font-semibold text-pink-300 mb-6">Core Functions</h3>

                <div class="overflow-x-auto mb-6">
                    <table class="w-full border-collapse border border-white/20 rounded-lg overflow-hidden">
                        <thead>
                            <tr class="bg-white/10">
                                <th class="border border-white/20 p-3 text-left text-pink-300">Function/Variable</th>
                                <th class="border border-white/20 p-3 text-left text-pink-300">Purpose</th>
                                <th class="border border-white/20 p-3 text-left text-pink-300">Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border border-white/20 p-3"><code class="text-cyan-300">t</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">Access translations</td>
                                <td class="border border-white/20 p-3"><code
                                        class="text-yellow-300">t.navigation.home</code></td>
                            </tr>
                            <tr class="bg-white/5">
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">setLanguage(lang)</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">Switch active language</td>
                                <td class="border border-white/20 p-3 text-gray-300">User language selection</td>
                            </tr>
                            <tr>
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">currentLanguage</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">Current language code</td>
                                <td class="border border-white/20 p-3 text-gray-300">Display current language</td>
                            </tr>
                            <tr class="bg-white/5">
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">availableLanguages</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">Available language list</td>
                                <td class="border border-white/20 p-3 text-gray-300">Language selector lists</td>
                            </tr>
                            <tr>
                                <td class="border border-white/20 p-3"><code class="text-cyan-300">config</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">Access configuration</td>
                                <td class="border border-white/20 p-3 text-gray-300">View current settings</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 class="text-2xl font-semibold text-pink-300 mb-6">Function Details</h3>

                <div class="space-y-6">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">setLanguage(lang)</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                Changes the active language system-wide
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                Updates the global t object
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                Saves preference to localStorage (browser)
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                <strong>Use for:</strong> Language switchers, user preferences
                            </li>
                        </ul>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">currentLanguage</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                Returns the currently active language code as a string
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                <strong>Use for:</strong> Displaying current language, conditional logic
                            </li>
                        </ul>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">availableLanguages</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                Returns array of available language codes from config
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                <strong>Use for:</strong> Building language selectors, validation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </BaseLayout>
</template>

<style scoped>
.hero {
    display: flex;
    gap: 3rem;
    margin-bottom: 5rem;

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