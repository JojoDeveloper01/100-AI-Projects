<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import CopyButton from '@/components/CopyButton.vue'
import { frameworks } from '@/data/frameworks.js'

const EarthGlobe = defineAsyncComponent({
    loader: () => import('@/components/EarthGlobe.vue'),
    loadingComponent: () => import('@/components/LoadingGlobe.vue'),
    delay: 200,
    timeout: 10000
})

import 'highlight.js/styles/vs2015.css'
import { onMounted, nextTick, watch, ref, defineAsyncComponent } from 'vue'
import { t } from "tradux"

const highlightCode = async () => {
    const [{ default: hljs }, { default: javascript }] = await Promise.all([
        import('highlight.js/lib/core'),
        import('highlight.js/lib/languages/javascript')
    ])

    hljs.registerLanguage('javascript', javascript)
    await nextTick()

    document.querySelectorAll('pre code').forEach(block => {
        block.removeAttribute('data-highlighted')
        hljs.highlightElement(block)
    })
}

onMounted(async () => {
    await nextTick()
    highlightCode()
})

const activeFramework = ref(0)
const activePackageManager = ref(0)

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
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><g fill="currentColor" clip-path="url(#SVGXv8lpc2Y)"><path fill-rule="evenodd" d="M23.994 11.675C23.825 5.23 18.561.013 12.004 0C5.21-.005-.3 5.668.013 12.556c.28 6.216 5.344 11.296 11.71 11.441c6.81.157 12.449-5.4 12.271-12.322M7.92 7.525q-.218.422-.336.879c-.025.018-.02.05-.032.073c0 .05 0 .1-.014.147v.328c.017.05.012.1.017.15c.029.065-.019.146.054.198c.088.3.187.594.347.861c.05.084.042.129-.031.194a5.2 5.2 0 0 0-.987 1.183c-.472.802-.648 1.679-.648 2.6a.3.3 0 0 1-.016.104a.3.3 0 0 1-.062.105c-.609.667-.936 1.427-.786 2.348c.076.467.212.91.49 1.298a.4.4 0 0 1 .089.273c-.018.404.144.732.488.939c.58.351 1.207.477 1.875.328a1 1 0 0 0 .133-.052c.068-.032.137-.063.198-.053c.068.01.128.063.189.115q.052.046.107.084c.381.228.809.286 1.238.267c1.044-.044 2.085-.107 3.121-.252c.342-.047.67-.133.95-.343a.6.6 0 0 1 .198-.1c1.049-.346 2.052-.798 2.967-1.406c.555-.364 1.137-.662 1.794-.808c.359-.078.62-.315.78-.648c.408-.844-.217-1.79-1.19-1.799c-.658-.005-1.263.2-1.843.49a9 9 0 0 0-.615.352c-.19.115-.38.231-.579.333l-.029.017c-.04.024-.083.049-.136.046v-.1c.052-1.395-.401-2.607-1.328-3.646c-.056-.062-.046-.102-.005-.162a6.8 6.8 0 0 0 .831-1.6c.344-.973.413-1.972.308-2.987c-.05-.489-.15-.966-.356-1.417c-.18-.385-.515-.567-.93-.474c-.111.023-.149-.01-.194-.102a5 5 0 0 0-.468-.817a.89.89 0 0 0-.685-.36c-.444-.025-.75.216-1.008.539a3.3 3.3 0 0 0-.458.805c-.036.087-.08.136-.15.162a.4.4 0 0 1-.094.02a3.28 3.28 0 0 0-2.014.97a1.34 1.34 0 0 1-.543.349c-.293.097-.496.299-.637.57" clip-rule="evenodd"/><path d="M14.947 15.813c0 .242-.056.478-.086.713c-.026.207-.005.231.205.195c.472-.082.9-.28 1.311-.515c.441-.251.861-.537 1.332-.726a3 3 0 0 1 1.134-.243c.343 0 .582.186.624.48c.04.272-.11.533-.384.59c-.781.166-1.456.551-2.113.98c-.882.569-1.842.98-2.841 1.295c-.037.01-.085.019-.108.041c-.236.25-.548.292-.863.333c-.884.116-1.773.168-2.665.22a3 3 0 0 1-.77-.026c-.41-.08-.583-.233-.645-.57c-.056-.301.086-.587.388-.784l.116-.073a1.3 1.3 0 0 1-.398-.364c-.05-.069-.076-.026-.092.031l-.15.57q-.05.19-.129.37c-.152.348-.43.516-.797.55a2 2 0 0 1-1.065-.215c-.23-.113-.299-.283-.223-.533c.04-.134.116-.25.207-.391c-.317.063-.456-.121-.566-.344a2.37 2.37 0 0 1-.231-1.54c.081-.424.33-.77.63-1.069c.175-.175.228-.344.223-.59c-.04-1.425.498-2.595 1.605-3.499c.097-.081.195-.165.297-.239c.063-.044.07-.073.018-.138c-.286-.36-.509-.75-.61-1.204c-.117-.511.057-.955.314-1.38a.3.3 0 0 1 .158-.11c.323-.116.595-.291.842-.538c.555-.555 1.243-.81 2.03-.776c.1.005.144-.024.175-.118a4.4 4.4 0 0 1 .461-.98a1.3 1.3 0 0 1 .26-.31q.293-.242.49.076c.242.386.428.8.616 1.215c.048.105.084.142.194.07a2 2 0 0 1 .417-.189c.116-.04.184-.013.234.108c.147.354.226.724.27 1.104c.013.105.037.207.024.312c-.008.228.003.457.005.688c0 .102-.036.205-.005.309c-.023.624-.189 1.214-.43 1.786c-.225.535-.553 1.01-.881 1.485c-.129.183-.126.186.042.336c.818.737 1.27 1.663 1.42 2.743c.006.042.004.087.004.131c-.034.1.003.197.005.294c.009.148-.025.296 0 .44"/></g><defs><clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>`,
        installCommand: 'yarn add tradux',
        extraStep: false
    },
    {
        name: 'pnpm',
        color: '#F69220',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="currentColor" d="M0 .004V40h39.996V.004Zm43.996 0V40h40V.004Zm44.008 0V40H128V.004Zm0 43.996v39.996H128V44Z"/><path fill="#6b7280" d="M43.996 44v39.996h40V44ZM0 87.996v40h39.996v-40Zm43.996 0v40h40v-40Zm44.008 0v40H128v-40Z"/></svg>`,
        installCommand: 'pnpm install tradux && pnpx tradux init',
        extraStep: true
    },
    {
        name: 'bun',
        color: '#FBF0DF',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="currentColor" d="M64 10.222c-5.234 0-10.394 2.325-16.36 5.734a358 358 0 0 0-6.1 3.58c-3.879 2.303-8.218 4.922-13.276 7.523h-.002v.002C10.607 36.257 0 51.657 0 68.204c0 13.707 7.219 26.122 18.814 35.082S46.388 117.778 64 117.778s33.589-5.532 45.184-14.492S128 81.911 128 68.204c0-16.563-10.61-31.946-28.264-41.141v-.004c-6.246-3.24-10.989-6.067-15.203-8.58l-.002-.003c-1.81-1.108-3.506-2.124-5.207-3.058l-.008-.004C73.744 12.236 69.211 10.222 64 10.222m0 1.058c4.942 0 9.273 1.905 14.802 5.058l.002.002l.004.002c1.68.923 3.368 1.93 5.175 3.04l.003.001h.002c4.214 2.514 8.983 5.363 15.26 8.618c17.38 9.052 27.694 24.092 27.694 40.203c0 13.336-7.015 25.444-18.405 34.245C97.148 111.251 81.39 116.72 64 116.72s-33.15-5.468-44.54-14.27C8.07 93.65 1.059 81.54 1.059 68.204c0-16.095 10.31-31.15 27.69-40.203c5.097-2.621 9.46-5.256 13.333-7.556a357 357 0 0 1 6.084-3.57C54.082 13.495 59.08 11.28 64 11.28m0 3.025c-4.27 0-8.705 2.096-14.223 5.173c-1.921 1.084-3.906 2.277-6.002 3.517v.002h-.002C39.83 25.345 35.32 28 30.258 30.654v-.002C14.011 39.127 4.231 53.155 4.231 68.203c0 12.586 6.75 23.98 17.579 32.2S47.558 113.697 64 113.697s31.359-5.074 42.188-13.293c10.83-8.22 17.58-19.615 17.58-32.2c0-15.05-9.781-29.075-26.047-37.52l-.002-.001c-6.378-3.254-11.355-6.314-15.405-8.734h-.002c-1.844-1.092-3.537-2.104-5.08-3.004h-.005c-5.152-2.951-8.992-4.64-13.227-4.64m3.957 3.256q.112 0 .24.047c12.812 5.043 13.693 14.755 12.136 20.45a.54.54 0 0 1-.234.33a.57.57 0 0 1-.76-.123a.52.52 0 0 1-.106-.386a26.1 26.1 0 0 0-3.638-10.81a27.2 27.2 0 0 0-7.957-8.384v-.066c-.488-.343-.212-1.058.319-1.058m-4.474.4a.53.53 0 0 1 .397.137c9.68 9.793 6.449 18.866 2.742 23.436c-.406.474-1.132-.018-.93-.589a25.6 25.6 0 0 0 1.132-11.279a25.9 25.9 0 0 0-3.857-10.704v-.064c-.254-.429.11-.902.516-.934zm-3.843.41c.267-.041.55.094.618.46c3.25 12.91-4.45 19.309-10.155 21.447c-.61.228-.982-.556-.508-.963a26.9 26.9 0 0 0 7.07-9.173a26 26 0 0 0 2.459-11.18c0-.335.25-.551.516-.591m-4.795 2.28c.26.066.463.287.386.612c-2.928 13.057-12.727 15.784-18.82 15.424c-.643.017-.628-.851-.019-1.031a29 29 0 0 0 10.484-5.52a27.8 27.8 0 0 0 7.238-9.166a.64.64 0 0 1 .731-.318zM42.971 55.28a9.7 9.7 0 0 1 2.052.17a9.44 9.44 0 0 1 4.774 2.464a8.9 8.9 0 0 1 2.55 4.612a8.7 8.7 0 0 1-.54 5.196a9.07 9.07 0 0 1-3.441 4.033a9.6 9.6 0 0 1-5.186 1.508c-2.47-.004-4.837-.954-6.583-2.64c-1.745-1.686-2.725-3.971-2.725-6.353a8.76 8.76 0 0 1 1.572-4.998a9.26 9.26 0 0 1 4.188-3.312a9.6 9.6 0 0 1 3.339-.68m41.994 0a9.7 9.7 0 0 1 2.054.176a9.43 9.43 0 0 1 4.772 2.479a8.9 8.9 0 0 1 2.537 4.622a8.7 8.7 0 0 1-.557 5.2a9.1 9.1 0 0 1-3.465 4.023a9.6 9.6 0 0 1-5.2 1.483c-2.463-.012-4.822-.968-6.556-2.655c-1.735-1.685-2.708-3.962-2.703-6.338c0-1.782.55-3.523 1.576-5.002a9.26 9.26 0 0 1 4.197-3.312a9.6 9.6 0 0 1 3.345-.676m-44.47 2.808a3.6 3.6 0 0 0-1.512.252a3.5 3.5 0 0 0-1.574 1.244a3.3 3.3 0 0 0-.593 1.878c0 .893.368 1.75 1.02 2.384a3.57 3.57 0 0 0 2.468.994a3.6 3.6 0 0 0 1.95-.56a3.4 3.4 0 0 0 1.298-1.512a3.27 3.27 0 0 0 .206-1.955a3.34 3.34 0 0 0-.954-1.733a3.55 3.55 0 0 0-2.308-.992Zm41.926 0a3.6 3.6 0 0 0-1.512.252a3.5 3.5 0 0 0-1.576 1.244a3.3 3.3 0 0 0-.591 1.878c0 .888.363 1.74 1.008 2.372a3.57 3.57 0 0 0 2.444 1.006h.033a3.6 3.6 0 0 0 1.953-.56a3.4 3.4 0 0 0 1.297-1.512a3.27 3.27 0 0 0 .207-1.955a3.34 3.34 0 0 0-.955-1.733a3.55 3.55 0 0 0-2.308-.992M53.81 79.618l20.68.032a.36.36 0 0 1 .334.146a13.2 13.2 0 0 1-2.357 4.81l-.072-.06c-2.132-1.957-4.952-3.072-7.895-3.12a11 11 0 0 0-4.54 1.023a10.6 10.6 0 0 0-3.617 2.752a13.2 13.2 0 0 1-2.884-5.438c.016-.032.083-.144.35-.144zm10.775 3.44c2.51.072 4.9 1.047 6.702 2.732l.083.068q-.522.528-1.106 1a10.7 10.7 0 0 1-6.115 2.794a10.6 10.6 0 0 1-6.116-2.827q-.243-.196-.475-.405h.006a8.9 8.9 0 0 1 3.11-2.456a9.3 9.3 0 0 1 3.91-.905z"/></svg>`,
        installCommand: 'bun install tradux && bunx tradux init',
        extraStep: true
    }
]

const codeSnippets = {
    envVars: 'CLOUDFLARE_ACCOUNT_ID=your_account_id\nCLOUDFLARE_API_TOKEN=your_api_token',
    configJson: '{\n    "i18nPath": "./i18n",\n    "defaultLanguage": "en",\n    "availableLanguages": ["en"]\n}',
    cliBasic: 'npx tradux',
    cliInit: 'npx tradux init',
    cliTranslate: '# Single language\nnpx tradux -t es\n\n# Multiple languages\nnpx tradux -t es,pt,fr\n\n# Interactive mode\nnpx tradux -t',
    cliUpdate: '# Update all existing languages\nnpx tradux -u\n\n# Update specific languages\nnpx tradux -u es,pt',
    cliRemove: '# Interactive removal\nnpx tradux -r\n\n# Remove specific languages\nnpx tradux -r es,pt',
    jsImport: 'import { t, setLanguage, getCurrentLanguage, getAvailableLanguages, config } from \'tradux\';',
    jsSetLanguage: 'setLanguage(\'es\')',
    jsGetLanguage: 'console.log(currentLanguage)',
    jsGetAvailableLanguages: 'console.log(availableLanguages)',
    jsGetConfig: 'console.log(config)',
    jsTranslateExample: 't.welcome.title',
    jsTranslateNestedExample: 't.user.profile.settings.language'
}

watch([activeFramework, activePackageManager], async () => {
    await nextTick()
    highlightCode()
})
</script>

<template>
    <BaseLayout>
        <section class="hero">
            <div class="w-full flex flex-col gap-10 lg:gap-8">
                <div class="first">
                    <h1 class="mb-6 py-4 md:text-7xl font-bold ">
                        {{ t.tradux.hero.title }}
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-300 max-w-3xl">
                        {{ t.tradux.hero.description }}
                    </p>
                </div>

                <!-- EarthGlobe between first and second elements -->
                <div class="EarthGlobe-mobile hidden scale-75 max-[470px]:scale-60 sm:scale-100">
                    <EarthGlobe :rotation-speed="0.002" />
                </div>

                <div class="second grid gap-2">
                    <div class="flex flex-wrap gap-3 items-center p-2 max-[1095px]:justify-center overflow-auto">
                        <div class="cursor-pointer flex justify-center items-center flex-col gap-2 font-medium"
                            v-for="(framework, index) in frameworks" :key="framework.name || index"
                            @click="activeFramework = index">
                            <button :class="[
                                'p-2.5 rounded-full! border-4 flex items-center gap-2 transition-colors duration-300',
                                activeFramework === index ? '' : 'hover:bg-white/10'
                            ]" :style="{ borderColor: activeFramework === index ? framework.color : '#6b7280' }"
                                :aria-label="`Select ${framework.name} framework`">
                                <div class="flex flex-col items-center justify-center">
                                    <span v-html="framework.icon"
                                        :style="{ color: activeFramework === index ? framework.color : '#6b7280' }"
                                        class="*:size-12 *:fill-current transition-colors duration-300" />
                                </div>
                            </button>
                            <span :class="[
                                'text-sm font-bold transition-colors duration-300',
                                activeFramework === index ? '' : 'text-gray-400'
                            ]" :style="{ color: activeFramework === index ? framework.color : '' }">
                                {{ framework.name }}
                            </span>
                        </div>
                    </div>
                    <div class="relative overflow-hidden rounded-xl">
                        <pre class="language-javascript grid">
                            <code class="rounded-xl min-w-96 px-5 overflow-x-auto custom-scrollbar">{{ frameworks[activeFramework].usage }}</code>
                        </pre>

                        <div v-if="frameworks[activeFramework].name === 'Astro' || frameworks[activeFramework].name === 'Node'"
                            class="w-full absolute pl-4 pr-2 top-1 flex justify-between items-center">
                            <span class="w-full relative group">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
                                    class="text-amber-400 hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="1" />
                                    <text x="12" y="16" text-anchor="middle" font-size="14" stroke="#000"
                                        fill="#000">i</text>
                                </svg>
                                <div
                                    class="absolute top-full mt-2 z-10 px-4 py-2 rounded-lg bg-gray-900 text-sm text-gray-200 border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-wrap">
                                    {{ t.tradux.extraInfoServerUtility }}
                                </div>
                            </span>
                            <CopyButton :text="frameworks[activeFramework].usage" button-id="framework"
                                button-class="text-sm flex items-center gap-1 p-2! rounded-lg text-gray-400 hover: hover:bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="EarthGlobe h-full flex items-start justify-center sticky top-4">
                <EarthGlobe :rotation-speed="0.002" />
            </div>
        </section>

        <section class="translation-card p-8 mb-16">
            <h3 class="text-4xl font-bold  mb-4">{{ t.tradux.callToAction.title }}</h3>
            <p class="text-xl text-gray-300 mb-6">
                {{ t.tradux.callToAction.description }}
            </p>
            <div class="">
                <a href="https://github.com/JojoDeveloper01/Tradux" target="_blank"
                    class="inline-flex items-center justify-center px-6! py-4! bg-blue-500 rounded-lg font-semibold ! hover:bg-blue-600 transition-colors duration-300">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" class="mr-2">
                        <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {{ t.tradux.callToAction.button }}
                </a>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-purple-400">{{ t.tradux.seoInternationalization.title }}</h2>
                <p class="text-lg text-gray-300 mb-6">
                    {{ t.tradux.seoInternationalization.description }}
                </p>
                <p class="text-gray-300 mb-4">
                    {{ t.tradux.seoInternationalization.details }}
                </p>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-blue-400">{{ t.tradux.purpose.title }}</h2>
                <p class="text-lg text-gray-300 mb-6">
                    {{ t.tradux.purpose.description }}
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">{{
                            t.tradux.purpose.features.automating.title }}</h3>
                        <p class="text-gray-300">{{ t.tradux.purpose.features.automating.description }}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">{{
                            t.tradux.purpose.features.intelligent.title }}</h3>
                        <p class="text-gray-300">{{ t.tradux.purpose.features.intelligent.description }}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">{{
                            t.tradux.purpose.features.integration.title }}</h3>
                        <p class="text-gray-300">{{ t.tradux.purpose.features.integration.description }}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-blue-300 mb-2">{{
                            t.tradux.purpose.features.consistency.title }}</h3>
                        <p class="text-gray-300">{{ t.tradux.purpose.features.consistency.description }}</p>
                    </div>
                </div>
                <div class="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <h3 class="text-xl font-semibold text-blue-300 mb-2">{{ t.tradux.purpose.features.autoSync.title }}
                    </h3>
                    <p class="text-gray-300">{{ t.tradux.purpose.features.autoSync.description }}</p>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-green-400">{{ t.tradux.keyFeatures.title }}</h2>
                <div class="space-y-4 flex flex-wrap sm:grid sm:grid-cols-2">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.aiPowered.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.aiPowered.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.autoSync.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.autoSync.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.smartUpdate.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.smartUpdate.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.autoConfig.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.autoConfig.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.frameworkAgnostic.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.frameworkAgnostic.description }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.cookie.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.cookie.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.simpleCli.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.simpleCli.description }}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-300">{{
                                t.tradux.keyFeatures.features.intelligentPath.title }}</h3>
                            <p class="text-gray-300">{{ t.tradux.keyFeatures.features.intelligentPath.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-purple-400">{{ t.tradux.installation.title }}</h2>

                <div class="mb-6">
                    <div class="flex flex-wrap gap-3 items-center p-2 mb-4">
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

                    <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                        <pre
                            class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">{{ packageManagers[activePackageManager].installCommand }}</code></pre>
                        <CopyButton :text="packageManagers[activePackageManager].installCommand" button-id="package"
                            button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                    </div>

                    <div v-if="packageManagers[activePackageManager].extraStep"
                        class="mt-4 p-4 rounded-lg bg-orange-500/10 border border-orange-400/20">
                        <div class="flex items-start gap-3">
                            <div
                                class="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                                <span class="text-xs font-bold text-black">!</span>
                            </div>
                            <div>
                                <h4 class="text-orange-300 font-semibold mb-1">{{
                                    t.tradux.installation.extraStepNotice.title }}</h4>
                                <p class="text-sm text-gray-300">
                                    {{ packageManagers[activePackageManager].name }} {{
                                        t.tradux.installation.extraStepNotice.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-orange-400">{{ t.tradux.setupRequirements.title }}</h2>
                <div class="space-y-4">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-orange-300 mb-2">{{
                            t.tradux.setupRequirements.cloudflare.title }}</h3>
                        <p class="text-gray-300">{{ t.tradux.setupRequirements.cloudflare.description }}</p>
                    </div>
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h3 class="text-xl font-semibold text-orange-300 mb-4">{{
                            t.tradux.setupRequirements.envVars.title }}</h3>
                        <p class="text-gray-300 mb-3">{{ t.tradux.setupRequirements.envVars.description }}</p>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token</code></pre>
                            <CopyButton :text="codeSnippets.envVars" button-id="envVars"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-cyan-400">{{ t.tradux.configuration.title }}</h2>
                <p class="text-lg text-gray-300 mb-6">
                    {{ t.tradux.configuration.description }}
                </p>

                <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-6">
                    <pre class="language-json"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">{
    "i18nPath": "./i18n",
    "defaultLanguage": "en",
    "availableLanguages": ["en"]
}</code></pre>
                    <CopyButton :text="codeSnippets.configJson" button-id="configJson"
                        button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                </div>

                <h3 class="text-xl font-semibold text-cyan-300 mb-4">{{ t.tradux.configuration.options.title }}</h3>
                <div class="space-y-3">
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">defaultLanguage</code> - {{
                                t.tradux.configuration.options.defaultLanguage }}
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">i18nPath</code> - {{ t.tradux.configuration.options.i18nPath }}
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-cyan-400 rounded-full mt-3 shrink-0"></div>
                        <div>
                            <code class="text-cyan-300">availableLanguages</code> - {{
                                t.tradux.configuration.options.availableLanguages }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-yellow-400">{{ t.tradux.cliUsage.title }}</h2>

                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">{{
                            t.tradux.cliUsage.commands.viewCommands.title }}</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre
                                class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">npx tradux</code></pre>
                            <CopyButton :text="codeSnippets.cliBasic" button-id="cliBasic"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">{{
                            t.tradux.cliUsage.commands.initialize.title }}</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <pre
                                class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">npx tradux init</code></pre>
                            <CopyButton :text="codeSnippets.cliInit" button-id="cliInit"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">{{
                            t.tradux.cliUsage.commands.translate.title }}</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Single language
npx tradux -t es

# Multiple languages
npx tradux -t es,pt,fr

# Interactive mode
npx tradux -t</code></pre>
                            <CopyButton :text="codeSnippets.cliTranslate" button-id="cliTranslate"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">{{
                            t.tradux.cliUsage.commands.update.title }}</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Update all existing languages
npx tradux -u

# Update specific languages
npx tradux -u es,pt</code></pre>
                            <CopyButton :text="codeSnippets.cliUpdate" button-id="cliUpdate"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-yellow-300 mb-3">{{
                            t.tradux.cliUsage.commands.remove.title }}</h3>
                        <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 mb-3">
                            <pre class="language-bash"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar"># Interactive removal
npx tradux -r

# Remove specific languages
npx tradux -r es,pt</code></pre>
                            <CopyButton :text="codeSnippets.cliRemove" button-id="cliRemove"
                                button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p class="text-gray-300">
                            <strong class="text-yellow-300">{{ t.tradux.cliUsage.commands.updateVsTranslate.title
                                }}</strong> {{ t.tradux.cliUsage.commands.updateVsTranslate.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <div class="translation-card p-8 mb-8">
                <h2 class="text-5xl font-bold mb-10 text-pink-400">{{ t.tradux.javascriptApi.title }}</h2>

                <div class="mb-6">
                    <p class="text-lg text-gray-300 mb-4">{{ t.tradux.javascriptApi.importDescription }}</p>
                    <div class="relative overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                        <pre
                            class="language-javascript"><code class="rounded-xl px-5 py-4 overflow-x-auto custom-scrollbar">import { t, setLanguage, getCurrentLanguage, getAvailableLanguages, config } from 'tradux';</code></pre>
                        <CopyButton :text="codeSnippets.jsImport" button-id="jsImport"
                            button-class="absolute right-3 top-3 text-sm flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-lg text-gray-400 hover:bg-white/10" />
                    </div>
                </div>

                <h3 class="text-2xl font-semibold text-pink-300 mb-6">{{ t.tradux.javascriptApi.coreFunctions.title }}
                </h3>

                <div class="overflow-x-auto mb-6">
                    <table class="w-full border-collapse border border-white/20 rounded-lg overflow-hidden">
                        <thead>
                            <tr class="bg-white/10">
                                <th class="border border-white/20 p-3 text-left text-pink-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.headers.function }}</th>
                                <th class="border border-white/20 p-3 text-left text-pink-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.headers.purpose }}</th>
                                <th class="border border-white/20 p-3 text-left text-pink-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.headers.useCase }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border border-white/20 p-3"><code class="text-cyan-300">t</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.t.purpose }}</td>
                                <td class="border border-white/20 p-3"><code
                                        class="text-yellow-300">{{ t.tradux.javascriptApi.coreFunctions.table.functions.t.useCase }}</code>
                                </td>
                            </tr>
                            <tr class="bg-white/5">
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">setLanguage(lang)</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.setLanguage.purpose }}</td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.setLanguage.useCase }}</td>
                            </tr>
                            <tr>
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">currentLanguage</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.currentLanguage.purpose }}</td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.currentLanguage.useCase }}</td>
                            </tr>
                            <tr class="bg-white/5">
                                <td class="border border-white/20 p-3"><code
                                        class="text-cyan-300">availableLanguages</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.availableLanguages.purpose }}
                                </td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.availableLanguages.useCase }}
                                </td>
                            </tr>
                            <tr>
                                <td class="border border-white/20 p-3"><code class="text-cyan-300">config</code></td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.config.purpose }}</td>
                                <td class="border border-white/20 p-3 text-gray-300">{{
                                    t.tradux.javascriptApi.coreFunctions.table.functions.config.useCase }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 class="text-2xl font-semibold text-pink-300 mb-6">{{ t.tradux.javascriptApi.functionDetails.title }}
                </h3>

                <div class="space-y-6">
                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">{{
                            t.tradux.javascriptApi.functionDetails.setLanguage.title }}</h4>
                        <ul class="space-y-2 text-gray-300 mb-4">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                {{ t.tradux.javascriptApi.functionDetails.setLanguage.features.systemWide }}
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                {{ t.tradux.javascriptApi.functionDetails.setLanguage.features.updates }}
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                {{ t.tradux.javascriptApi.functionDetails.setLanguage.features.localStorage }}
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                <strong>{{ t.tradux.javascriptApi.functionDetails.setLanguage.features.useFor
                                    }}</strong>
                            </li>
                        </ul>
                        <div class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                            <code class="text-cyan-300">{{ codeSnippets.jsSetLanguage }}</code>
                            <CopyButton :text="codeSnippets.jsSetLanguage" button-id="jsSetLanguage"
                                :show-text="false" />
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">{{
                            t.tradux.javascriptApi.functionDetails.currentLanguage.title }}</h4>
                        <ul class="space-y-2 text-gray-300 mb-4">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                {{ t.tradux.javascriptApi.functionDetails.currentLanguage.features.returns }}
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                <strong>{{ t.tradux.javascriptApi.functionDetails.currentLanguage.features.useFor
                                    }}</strong>
                            </li>
                        </ul>
                        <div class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                            <code class="text-cyan-300">{{ codeSnippets.jsGetLanguage }}</code>
                            <CopyButton :text="codeSnippets.jsGetLanguage" button-id="jsGetLanguage"
                                :show-text="false" />
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">{{
                            t.tradux.javascriptApi.functionDetails.availableLanguages.title }}</h4>
                        <ul class="space-y-2 text-gray-300 mb-4">
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                {{ t.tradux.javascriptApi.functionDetails.availableLanguages.features.returns }}
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="w-2 h-2 bg-pink-400 rounded-full mt-2 shrink-0"></div>
                                <strong>{{ t.tradux.javascriptApi.functionDetails.availableLanguages.features.useFor
                                }}</strong>
                            </li>
                        </ul>
                        <div class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                            <code class="text-cyan-300">{{ codeSnippets.jsGetAvailableLanguages }}</code>
                            <CopyButton :text="codeSnippets.jsGetAvailableLanguages" button-id="jsGetAvailableLanguages"
                                :show-text="false" />
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">Translation Usage Examples</h4>
                        <div class="space-y-4">
                            <div>
                                <p class="text-gray-300 mb-2">Basic translation access:</p>
                                <div
                                    class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                                    <code class="text-cyan-300">{{ codeSnippets.jsTranslateExample }}</code>
                                    <CopyButton :text="codeSnippets.jsTranslateExample" button-id="jsTranslateExample"
                                        :show-text="false" />
                                </div>
                            </div>
                            <div>
                                <p class="text-gray-300 mb-2">Nested object translation:</p>
                                <div
                                    class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                                    <code class="text-cyan-300">{{ codeSnippets.jsTranslateNestedExample }}</code>
                                    <CopyButton :text="codeSnippets.jsTranslateNestedExample"
                                        button-id="jsTranslateNestedExample" :show-text="false" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 class="text-xl font-semibold text-pink-300 mb-3">Config Access</h4>
                        <p class="text-gray-300 mb-4">Access current Tradux configuration:</p>
                        <div class="bg-gray-900/60 rounded-md p-4 border border-white/10 relative overflow-x-auto">
                            <code class="text-cyan-300">{{ codeSnippets.jsGetConfig }}</code>
                            <CopyButton :text="codeSnippets.jsGetConfig" button-id="jsGetConfig" :show-text="false" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </BaseLayout>
</template>

<style scoped>
.hero {
    display: flex;
    gap: 1rem;
    margin-bottom: 5rem;

    h1 {
        font-size: xxx-large;
    }

    >div {
        flex: 1;
    }
}

@media (max-width: 1095px) {
    .hero {
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }

    .hero>.EarthGlobe {
        display: none;
    }

    .EarthGlobe-mobile {
        display: flex !important;
        justify-content: center;
        width: 100%;
    }
}

@media (min-width: 1096px) {
    .EarthGlobe-mobile {
        display: none !important;
    }
}

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