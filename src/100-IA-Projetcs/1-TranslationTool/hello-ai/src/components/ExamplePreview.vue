<script setup>
import { ref, reactive, computed } from 'vue'
import { translate, useTranslate } from '../../../auto-translate-package/src/vue-plugin.js'

const currentLanguage = ref('english')

// Get loading state (optional)
const { isLoading } = useTranslate()

const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'portuguese', name: 'Português', flag: '🇵🇹' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'italian', name: 'Italiano', flag: '🇮🇹' },
    { code: 'chinese', name: '中文', flag: '🇨🇳' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'korean', name: '한국어', flag: '🇰🇷' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'russian', name: 'Русский', flag: '🇷🇺' },
    { code: 'hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'dutch', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'polish', name: 'Polski', flag: '🇵🇱' },
    { code: 'turkish', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'czech', name: 'Čeština', flag: '🇨🇿' },
    { code: 'finnish', name: 'Suomi', flag: '🇫🇮' },
    { code: 'romanian', name: 'Română', flag: '🇷🇴' },
    { code: 'swedish', name: 'Svenska', flag: '🇸🇪' },
    { code: 'danish', name: 'Dansk', flag: '🇩🇰' },
    { code: 'norwegian', name: 'Norsk', flag: '🇳🇴' },
    { code: 'greek', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'hebrew', name: 'עברית', flag: '🇮🇱' },
    { code: 'thai', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vietnamese', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'indonesian', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'malay', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'tagalog', name: 'Filipino', flag: '🇵🇭' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'urdu', name: 'اردو', flag: '🇵🇰' },
    { code: 'persian', name: 'فارسی', flag: '🇮🇷' },
    { code: 'swahili', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'ukrainian', name: 'Українська', flag: '🇺🇦' },
    { code: 'bulgarian', name: 'Български', flag: '🇧🇬' },
    { code: 'croatian', name: 'Hrvatski', flag: '🇭🇷' },
    { code: 'serbian', name: 'Српски', flag: '🇷🇸' },
    { code: 'slovak', name: 'Slovenčina', flag: '🇸🇰' },
    { code: 'slovenian', name: 'Slovenščina', flag: '🇸🇮' },
    { code: 'lithuanian', name: 'Lietuvių', flag: '🇱🇹' },
    { code: 'latvian', name: 'Latviešu', flag: '🇱🇻' },
    { code: 'estonian', name: 'Eesti', flag: '🇪🇪' },
    { code: 'hungarian', name: 'Magyar', flag: '🇭🇺' },
    { code: 'catalan', name: 'Català', flag: '🇪🇸' },
    { code: 'basque', name: 'Euskera', flag: '🇪🇸' },
    { code: 'galician', name: 'Galego', flag: '🇪🇸' },
    { code: 'welsh', name: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { code: 'irish', name: 'Gaeilge', flag: '🇮🇪' },
    { code: 'icelandic', name: 'Íslenska', flag: '🇮🇸' },
    { code: 'maltese', name: 'Malti', flag: '🇲🇹' },
    { code: 'luxembourgish', name: 'Lëtzebuergesch', flag: '🇱🇺' }
]

// Website content in different languages
const translations = reactive({
    english: {
        navigation: {
            home: "Home",
            about: "About",
            services: "Services",
            contact: "Contact"
        },
        hero: {
            title: "Welcome to TechFlow Solutions",
            subtitle: "We build innovative software solutions that transform your business",
            cta: "Get Started",
            cta_secondary: "Learn More"
        },
        about: {
            title: "About Our Company",
            description: "Founded in 2020, we are a team of passionate developers and designers creating cutting-edge digital experiences for businesses worldwide."
        },
        services: {
            title: "Our Services",
            items: [
                {
                    title: "Web Development",
                    description: "Custom websites and web applications built with modern technologies"
                },
                {
                    title: "Mobile Apps",
                    description: "Native and cross-platform mobile applications for iOS and Android"
                },
                {
                    title: "Cloud Solutions",
                    description: "Scalable cloud infrastructure and deployment solutions"
                }
            ]
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Ready to start your project? Contact us today!",
            form: {
                name: "Your Name",
                email: "Your Email",
                message: "Your Message",
                submit: "Send Message"
            }
        },
        footer: {
            copyright: " 2024 TechFlow Solutions. All rights reserved.",
            links: {
                privacy: "Privacy Policy",
                terms: "Terms of Service"
            }
        }
    }
})

const changeLanguage = async (langCode) => {
    if (langCode === 'english' || translations[langCode]) {
        currentLanguage.value = langCode
        return
    }

    // SUPER SIMPLE: Just call translate() with your data and target language!
    try {
        const translatedData = await translate(translations.english, langCode)
        translations[langCode] = translatedData
        currentLanguage.value = langCode
    } catch (err) {
        console.error('Translation failed:', err)
    }
}

const currentContent = computed(() => {
    return translations[currentLanguage.value] || translations.english
})


const currentLanguageInfo = computed(() => {
    return languages.find(lang => lang.code === currentLanguage.value) || languages[0]
})
</script>

<template>
    <div
        class="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-2xl font-sans text-white">
        <!-- Language Switcher -->
        <div class="absolute top-4 right-4 z-50">
            <div
                class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-white/30 hover:-translate-y-0.5 transition-all">
                <span class="text-lg">{{ currentLanguageInfo.flag }}</span>
                <span class="font-medium text-white">{{ currentLanguageInfo.name }}</span>
                <svg class="w-3 h-3 transition-transform text-white" viewBox="0 0 12 12">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
            </div>

            <div
                class="h-60 overflow-y-auto absolute top-full right-0 mt-2 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden min-w-40 border border-white/10">
                <button v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)"
                    :class="currentLanguage === lang.code ? 'bg-purple-500/30 text-purple-300' : 'hover:bg-white/10'"
                    :disabled="isLoading"
                    class="w-full flex items-center gap-2 px-4 py-3 border-none bg-transparent cursor-pointer transition-colors relative text-white">
                    <span class="text-lg">{{ lang.flag }}</span>
                    <span>{{ lang.name }}</span>
                    <div v-if="isLoading && currentLanguage !== lang.code"
                        class="ml-auto w-3 h-3 border-2 border-gray-400 border-t-purple-400 rounded-full animate-spin">
                    </div>
                </button>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
            <div class="max-w-6xl mx-auto px-8 flex justify-between items-center">
                <div class="flex items-center gap-2 text-xl font-bold">
                    <span class="text-2xl">⚡</span>
                    TechFlow
                </div>
                <div class="hidden md:flex gap-8">
                    <a href="#home" class="text-white no-underline hover:text-purple-200 transition-colors">{{
                        currentContent.navigation.home }}</a>
                    <a href="#about" class="text-white no-underline hover:text-purple-200 transition-colors">{{
                        currentContent.navigation.about }}</a>
                    <a href="#services" class="text-white no-underline hover:text-purple-200 transition-colors">{{
                        currentContent.navigation.services }}</a>
                    <a href="#contact" class="text-white no-underline hover:text-purple-200 transition-colors">{{
                        currentContent.navigation.contact }}</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white py-20 px-8">
            <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">{{ currentContent.hero.title }}</h1>
                    <p class="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">{{ currentContent.hero.subtitle }}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button
                            class="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold cursor-pointer hover:bg-gray-100 transition-all transform hover:scale-105">
                            {{ currentContent.hero.cta }}
                        </button>
                        <button
                            class="bg-transparent text-white px-8 py-4 border-2 border-white rounded-lg font-bold cursor-pointer hover:bg-white hover:text-purple-600 transition-all">
                            {{ currentContent.hero.cta_secondary }}
                        </button>
                    </div>
                </div>
                <div class="flex-1 flex justify-center">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 w-80 animate-pulse">
                        <div class="h-4 bg-white/30 rounded-md mb-6"></div>
                        <div class="space-y-3">
                            <div class="h-3 bg-white/20 rounded"></div>
                            <div class="h-3 bg-white/20 rounded w-4/5"></div>
                            <div class="h-3 bg-white/20 rounded w-3/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="bg-black/20 py-20 text-center">
            <div class="max-w-6xl mx-auto px-8">
                <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-white">{{ currentContent.about.title }}</h2>
                <p class="text-xl leading-relaxed max-w-4xl mx-auto text-gray-300">{{ currentContent.about.description
                    }}</p>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20">
            <div class="max-w-6xl mx-auto px-8">
                <h2 class="text-4xl lg:text-5xl font-bold text-center mb-16 text-white">{{ currentContent.services.title
                    }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="service in currentContent.services.items" :key="service.title"
                        class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl text-center hover:-translate-y-2 transition-all duration-300">
                        <div class="text-6xl mb-6">🚀</div>
                        <h3 class="text-2xl font-bold mb-4 text-white">{{ service.title }}</h3>
                        <p class="text-gray-300 leading-relaxed">{{ service.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="bg-black/20 py-20 text-center">
            <div class="max-w-6xl mx-auto px-8">
                <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-white">{{ currentContent.contact.title }}</h2>
                <p class="text-xl text-gray-300 mb-12">{{ currentContent.contact.subtitle }}</p>

                <form class="max-w-2xl mx-auto flex flex-col gap-6">
                    <input type="text" :placeholder="currentContent.contact.form.name"
                        class="p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <input type="email" :placeholder="currentContent.contact.form.email"
                        class="p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <textarea :placeholder="currentContent.contact.form.message" rows="4"
                        class="p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"></textarea>
                    <button type="submit"
                        class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                        {{ currentContent.contact.form.submit }}
                    </button>
                </form>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black/40 text-white py-12">
            <div class="max-w-6xl mx-auto px-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-gray-300">{{ currentContent.footer.copyright }}</p>
                    <div class="flex gap-8">
                        <a href="#" class="text-gray-300 no-underline hover:text-white transition-colors">{{
                            currentContent.footer.links.privacy }}</a>
                        <a href="#" class="text-gray-300 no-underline hover:text-white transition-colors">{{
                            currentContent.footer.links.terms }}</a>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Loading Overlay -->
        <div v-if="isLoading"
            class="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="text-center">
                <div
                    class="w-12 h-12 border-4 border-gray-600 border-t-purple-400 rounded-full animate-spin mx-auto mb-4">
                </div>
                <p class="text-white text-lg">🤖 Translating website...</p>
            </div>
        </div>
    </div>
</template>