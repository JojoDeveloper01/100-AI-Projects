import { ref } from 'vue'

// Simple global state
const isLoading = ref(false)
const cache = new Map()

// SIMPLE API: Just translate your data!
export async function translate(data, language, apiUrl = '/api/translate-json') {
  const cacheKey = `${JSON.stringify(data)}_${language}`
  
  // Return cached result instantly
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  isLoading.value = true

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: data,
        targetLanguage: language
      })
    })

    const result = await response.json()
    
    if (result.success) {
      cache.set(cacheKey, result.translatedData)
      return result.translatedData
    } else {
      throw new Error(result.error || 'Translation failed')
    }

  } catch (error) {
    console.error('Translation error:', error)
    throw error
  } finally {
    isLoading.value = false
  }
}

// Optional: Get loading state
export function useTranslate() {
  return {
    translate,
    isLoading
  }
}
