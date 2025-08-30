<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ExamplePreview from "@/components/ExamplePreview.vue"

const jsonInput = ref('')
const targetLanguage = ref('portuguese')
const translatedData = ref(null)
const loading = ref(false)
const error = ref(null)

const languages = [
  { code: 'portuguese', name: 'Portuguese' },
  { code: 'spanish', name: 'Spanish' },
  { code: 'french', name: 'French' },
  { code: 'german', name: 'German' },
  { code: 'italian', name: 'Italian' },
  { code: 'chinese', name: 'Chinese' },
  { code: 'japanese', name: 'Japanese' },
  { code: 'korean', name: 'Korean' }
]

const sampleData = {
  "myWebsite": {
    "common": {
      "navigation": {
        "home": "Home",
        "about": "About Us",
        "services": "Our Services",
        "contact": "Contact"
      },
      "footer": {
        "copyright": "© {{current_year}} My Awesome Company. All rights reserved."
      }
    },
    "home": {
      "hero_section": {
        "title": "Welcome to My Awesome Company",
        "subtitle": "We build modern and scalable web solutions.",
        "call_to_action": "Learn More"
      },
      "features_section": {
        "title": "Why Choose Us?",
        "features": [
          {
            "icon": "speed",
            "name": "Lightning Fast",
            "description": "Our solutions are optimized for maximum performance."
          }
        ]
      }
    },
    "about": {
      "title": "Our Story",
      "description": "Founded in 2020, our mission is to deliver innovative technology solutions to businesses worldwide."
    },
    "contact": {
      "title": "Get in Touch",
      "subtitle": "We'd love to hear from you.",
      "form_fields": {
        "name": "Your Name",
        "email": "Your Email",
        "message": "Your Message"
      },
      "send_button": "Send Message"
    }
  }
}

const loadSample = () => {
  jsonInput.value = JSON.stringify(sampleData, null, 2)
}

const translateJson = async () => {
  if (!jsonInput.value.trim()) {
    error.value = 'Please enter JSON data to translate'
    return
  }

  try {
    JSON.parse(jsonInput.value)
  } catch (e) {
    error.value = 'Invalid JSON format'
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/translate-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: JSON.parse(jsonInput.value),
        targetLanguage: targetLanguage.value
      })
    })

    const result = await response.json()

    if (result.success) {
      translatedData.value = result.translatedData
    } else {
      error.value = result.error || 'Translation failed'
    }
  } catch (err) {
    error.value = 'Failed to translate: ' + err.message
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const formattedOutput = computed(() => {
  if (!translatedData.value) return ''
  return JSON.stringify(translatedData.value, null, 2)
})

// Simple scroll hijacking
const previewRef = ref(null)
const previewContainerRef = ref(null)
const isLocked = ref(false)
const hasLocked = ref(false)

const checkLock = () => {
  if (hasLocked.value || !previewContainerRef.value) return

  const rect = previewContainerRef.value.getBoundingClientRect()
  const center = rect.top + rect.height / 2

  if (Math.abs(center - window.innerHeight / 2) < 26) {
    isLocked.value = true
    hasLocked.value = true
    document.body.style.overflow = 'hidden'
  }
}

const handleWheel = (e) => {
  if (!isLocked.value) return

  e.preventDefault()
  const preview = previewRef.value
  preview.scrollTop += e.deltaY * 2

  // Unlock at bottom
  if (preview.scrollTop + preview.clientHeight >= preview.scrollHeight - 5) {
    isLocked.value = false
    document.body.style.overflow = 'auto'
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkLock)
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkLock)
  window.removeEventListener('wheel', handleWheel)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-16 pb-8">
      <div class="max-w-4xl mx-auto! text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🌐 JSON Translation Tool
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Translate your website content JSON to any language using AI
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 pb-16">

      <!-- Demo Section -->
      <section ref="previewContainerRef" class="mb-8 h-[90vh] relative">
        <div ref="previewRef"
          class="h-full overflow-y-auto overflow-x-hidden scroll-smooth rounded-xl border border-white/10 backdrop-blur-sm"
          style="scroll-behavior: smooth;">
          <ExamplePreview />
        </div>

        <!-- Scroll indicator when locked -->
        <div v-if="isLocked"
          class="absolute top-4 right-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          🔒 Component Scroll Active
        </div>
      </section>
      <div
        class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-8 mt-4 mb-10 text-white">
        <h3 class="text-2xl font-bold text-purple-300 mb-6">🎯 Super Simple Auto-Translate</h3>
        <p class="mb-6 leading-relaxed text-gray-300 text-lg">Just 2 lines of code to translate anything:</p>
        <div class="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 overflow-x-auto">
          <pre
            class="text-gray-200 font-mono text-sm leading-relaxed"><code><span class="text-purple-400">import</span> { <span class="text-pink-400">translate</span> } <span class="text-purple-400">from</span> <span class="text-green-400">'auto-translate-package'</span>

<span class="text-purple-400">const</span> <span class="text-blue-400">result</span> = <span class="text-purple-400">await</span> <span class="text-pink-400">translate</span>(<span class="text-blue-400">myData</span>, <span class="text-green-400">'spanish'</span>)</code></pre>
        </div>
        <p class="leading-relaxed text-gray-300 text-lg"><strong class="text-white">That's it!</strong> Click any
          language above to see it work ⚡</p>
      </div>

      <!-- Input Section -->
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 class="text-2xl font-bold text-white">Input JSON Data</h2>
          <button @click="loadSample"
            class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium">
            Load Sample Data
          </button>
        </div>

        <textarea v-model="jsonInput" placeholder="Paste your JSON data here..."
          class="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
          rows="12"></textarea>
      </div>

      <!-- Controls -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label class="text-gray-300 font-medium">Target Language:</label>
          <select v-model="targetLanguage"
            class="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code" class="bg-slate-800">
              {{ lang.name }}
            </option>
          </select>
        </div>

        <button @click="translateJson" :disabled="loading || !jsonInput.trim()"
          class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition-all duration-300 transform hover:scale-105">
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Translating...
          </span>
          <span v-else>✨ Translate JSON</span>
        </button>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-8">
        <div class="flex items-center mb-2">
          <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-red-400">Translation Error</h3>
        </div>
        <p class="text-red-300">{{ error }}</p>
      </div>

      <!-- Output Section -->
      <div v-if="translatedData" class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 class="text-2xl font-bold text-white">Translated JSON Output</h2>
          <button @click="copyToClipboard(formattedOutput)"
            class="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all font-medium">
            📋 Copy JSON
          </button>
        </div>

        <pre
          class="bg-black/30 border border-white/10 rounded-lg p-6 overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap text-gray-300"><code>{{ formattedOutput }}</code></pre>
      </div>
    </div>
  </div>
</template>
