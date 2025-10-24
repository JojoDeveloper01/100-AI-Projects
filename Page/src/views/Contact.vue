<script setup>
import { ref } from 'vue'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { t } from 'tradux'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitForm = async () => {
    isSubmitting.value = true

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    showSuccess.value = true
    isSubmitting.value = false

    // Reset form after success
    setTimeout(() => {
        form.value = {
            name: '',
            email: '',
            message: ''
        }
        showSuccess.value = false
    }, 3000)
}
</script>

<template>
    <BaseLayout>
        <!-- Hero Section -->
        <section class="relative py-10">
            <div class="mx-auto text-center">
                <h1 class="text-4xl md:text-6xl font-bold  mb-6 leading-tight">
                    <span class="">
                        {{ t.contact.title }}
                    </span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                    {{ t.contact.description }}
                </p>
            </div>
        </section>
        <div class="max-w-6xl mx-auto mb-16">
            <!-- Success Message -->
            <div v-if="showSuccess" class="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="size-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-green-400 mb-2">{{ t.contact.form.successMessage }}</h3>
                <p class="text-green-300">{{ t.contact.form.successPhrase }}</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Contact Form -->
                <div class="translation-card p-8">
                    <h2 class="text-2xl font-bold  mb-6">{{ t.contact.form.title }}</h2>

                    <form @submit.prevent="submitForm" class="space-y-6">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">{{ t.contact.form.name }}
                                *</label>
                            <input v-model="form.name" type="text" required
                                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :placeholder="t.contact.form.placeHolders.name" />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">{{ t.contact.form.email }}
                                *</label>
                            <input v-model="form.email" type="email" required
                                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com" />
                        </div>

                        <!-- Message -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">{{ t.contact.form.message }}
                                *</label>
                            <textarea v-model="form.message" required rows="6"
                                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                :placeholder="t.contact.form.placeHolders.message"></textarea>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" :disabled="isSubmitting"
                            class="w-full bg-blue-500 font-semibold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!isSubmitting">{{ t.contact.form.sendMessage }}</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ t.contact.form.sending }}
                            </span>
                        </button>
                    </form>
                </div>

                <!-- Contact Info -->
                <div class="space-y-8">
                    <!-- Contact Methods -->
                    <div class="translation-card p-8">
                        <h3 class="text-xl font-bold  mb-6">{{ t.contact.sendMeAnEmail }}</h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <p class=" font-medium">{{ t.contact.form.email }}</p>
                                    <p class="text-gray-400">contact@100aiprojects.dev</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="translation-card p-8">
                        <h3 class="text-xl font-bold  mb-6">{{ t.contact.connectWithMe }}</h3>

                        <div class="flex space-x-4">
                            <a href="https://github.com/JojoDeveloper01" target="_blank" rel="noopener"
                                class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/joseth-balcazar/" target="_blank" rel="noopener"
                                class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="https://x.com/JojoDeveloper01" target="_blank" rel="noopener"
                                class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
