<script setup>
import { ref } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

const frameworks = [
    {
        name: 'React',
        icon: '⚛️',
        setup: `npm install tradux`,
        usage: `import { t, setLanguage } from 'tradux';
                import { useState } from 'react';

                function App() {
                const [language, setLang] = useState('en');
                
                const handleLanguageChange = async (lang) => {
                    await setLanguage(lang);
                    setLang(lang);
                };

                return (
                    <div>
                    <h1>{t.title}</h1>
                    <p>{t.welcome}</p>
                    
                    <select onChange={(e) => handleLanguageChange(e.target.value)}>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                        <option value="es">Español</option>
                    </select>
                    </div>
                );
                }`
    },
    {
        name: 'Vanilla JS',
        icon: '💻',
        setup: `npm install tradux`,
        usage: `import { t, setLanguage } from 'tradux';

            // Update UI with translations
            function updateUI() {
            document.getElementById('title').textContent = t.title;
            document.getElementById('welcome').textContent = t.welcome;
            }

            // Language switcher
            document.getElementById('languageSelect').addEventListener('change', async (e) => {
            await setLanguage(e.target.value);
            updateUI();
            });

            // Initial load
            updateUI();`
    },

    {
        name: 'Node.js',
        icon: '🖥️',
        setup: `npm install tradux`,
        usage: `import { loadLanguage } from 'tradux';

                // Server-side translation loading
                    app.get('/api/content/:lang', async (req, res) => {
                    const { lang } = req.params;
                    const translations = await loadLanguage(lang);

                if (translations) {
                    res.json({
                        title: translations.title,
                        welcome: translations.welcome,
                        language: lang
                    });
                } else {
                    res.status(404).json({ error: 'Language not found' });
                    }
                });`
    }
]

const activeFramework = ref(0)

const features = [
    {
        icon: '🤖',
        title: 'AI-Powered Translations',
        description: 'Cloudflare Workers AI com modelo m2m100-1.2b para traduções precisas e com contexto.'
    },
    {
        icon: '🔄',
        title: 'Sistema de Sincronização Inteligente',
        description: 'Sincroniza automaticamente as traduções quando seu idioma base muda.'
    },
    {
        icon: '⚡',
        title: 'Agnóstico de Framework',
        description: 'Funciona perfeitamente com React, Vue, Vanilla JS, Node.js e qualquer framework JavaScript.'
    },
    {
        icon: '🛠️',
        title: 'Interface CLI Simples',
        description: 'Ferramentas de linha de comando fáceis de usar para gerenciamento de traduções.'
    }
]
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert('Código copiado para a área de transferência!')
    })
}
</script>

<template>
    <BaseLayout>
        <div class="min-h-screen">
            <!-- Hero Section -->
            <section class="relative py-20 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
                <div class="relative max-w-7xl mx-auto px-6">
                    <div class="text-center">
                        <div class="inline-flex items-center space-x-2 mb-6">
                            <span class="text-5xl">🌐</span>
                            <h1
                                class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Tradux
                            </h1>
                        </div>
                        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Intelligent Translation Library that automates multilingual content management with
                            <span class="text-purple-400 font-semibold">AI-powered translations</span>
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://github.com/JojoDeveloper01/Tradux" target="_blank"
                                class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <span class="flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </span>
                            </a>
                            <button
                                class="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Code Examples Section -->
            <section class="mx-auto max-w-7xl px-6 lg:px-8 mt-12 mb-24">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div class="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
                        <div class="flex flex-wrap gap-2 mb-6">
                            <button v-for="(framework, index) in frameworks" :key="index"
                                @click="activeFramework = index" :class="[
                                    'px-4 py-2 rounded-lg font-medium transition-all',
                                    'flex items-center gap-2',
                                    activeFramework === index
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                ]">
                                {{ framework.icon }} {{ framework.name }}
                            </button>
                        </div>

                        <div class="translation-card bg-gray-950/50 border border-gray-700 rounded-lg overflow-hidden">
                            <div class="flex items-center justify-between p-4 border-b border-gray-700">
                                <span class="text-purple-400 font-medium">Uso com {{ frameworks[activeFramework].name
                                    }}</span>
                                <button @click="copyToClipboard(frameworks[activeFramework].usage)"
                                    class="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copiar
                                </button>
                            </div>
                            <pre
                                class="p-6 text-green-400 font-mono text-sm overflow-x-auto h-96"><code>{{ frameworks[activeFramework].usage }}</code></pre>
                        </div>
                    </div>

                    <div
                        class="relative w-full h-auto p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center">
                        <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls
                            class="w-full h-full rounded-md object-cover border border-gray-600 shadow-xl"></video>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="py-20 mt-12">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold text-white mb-4">⚡ Powerful Features</h2>
                        <p class="text-xl text-gray-400">Everything you need for seamless translation management</p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="feature in features" :key="feature.title"
                            class="translation-card p-8 hover:bg-white/10 hover:border-white/20">
                            <div class="text-4xl mb-4">{{ feature.icon }}</div>
                            <h3 class="text-xl font-semibold text-white mb-3">{{ feature.title }}</h3>
                            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Benefits Section -->
            <section class="py-20 mt-12">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="flex gap-12 items-center">
                        <div>
                            <h2 class="text-4xl font-bold text-white mb-6">🎯 Why Choose Tradux?</h2>
                            <div class="space-y-6">
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 mt-1">
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-white mb-2">No More Manual Translation
                                            Files</h3>
                                        <p class="text-gray-400">Automate your translation workflow and focus on
                                            building features, not managing language files.</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 mt-1">
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-white mb-2">Intelligent Updates</h3>
                                        <p class="text-gray-400">Only translates new content, preserves existing
                                            translations, and removes obsolete keys automatically.</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0 mt-1">
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-white mb-2">Framework Flexibility</h3>
                                        <p class="text-gray-400">Works with any JavaScript framework or vanilla JS - no
                                            vendor lock-in.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="translation-card p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                            <div class="text-6xl mb-4 text-center">🚀</div>
                            <h3 class="text-2xl font-bold text-white text-center mb-4">Ready to Get Started?</h3>
                            <p class="text-gray-300 text-center mb-6">Join developers who are already using Tradux to
                                manage their translations efficiently.</p>
                            <div class="text-center">
                                <a href="https://github.com/JojoDeveloper01/Tradux" target="_blank"
                                    class="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                                    Documentation & Setup
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </BaseLayout>
</template>

<style scoped>
.translation-card {
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
}
</style>