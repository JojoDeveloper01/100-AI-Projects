class AutoTranslator {
  constructor(config) {
    // Use relative path to your existing Cloudflare Workers API
    this.apiEndpoint = config.apiEndpoint || '/api/translate-json'
    this.defaultLanguage = config.defaultLanguage || 'english'
    this.cache = new Map()
    this.supportedLanguages = config.supportedLanguages || []
  }

  // Generate cache key for content
  generateCacheKey(content, targetLanguage) {
    const contentHash = btoa(JSON.stringify(content)).slice(0, 16)
    return `${contentHash}_${targetLanguage}`
  }

  // Recursively translate nested objects
  async translateObject(obj, targetLanguage) {
    if (typeof obj === 'string') {
      // Skip template variables like {{variable}}
      if (obj.includes('{{') && obj.includes('}}')) {
        return obj
      }
      
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: obj,
            targetLanguage
          })
        })
        
        const result = await response.json()
        return result.success ? result.translatedData : obj
      } catch (error) {
        console.warn('Translation failed for:', obj, error)
        return obj
      }
    } else if (Array.isArray(obj)) {
      const translated = []
      for (const item of obj) {
        translated.push(await this.translateObject(item, targetLanguage))
      }
      return translated
    } else if (obj && typeof obj === 'object') {
      const translated = {}
      for (const [key, value] of Object.entries(obj)) {
        translated[key] = await this.translateObject(value, targetLanguage)
      }
      return translated
    }
    
    return obj
  }

  // Main translation method with caching
  async translate(content, targetLanguage) {
    if (targetLanguage === this.defaultLanguage) {
      return content
    }

    const cacheKey = this.generateCacheKey(content, targetLanguage)
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const translatedContent = await this.translateObject(content, targetLanguage)
      
      // Cache the result
      this.cache.set(cacheKey, translatedContent)
      
      // Also save to localStorage for persistence
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`auto_translate_${cacheKey}`, JSON.stringify(translatedContent))
      }
      
      return translatedContent
    } catch (error) {
      console.error('Translation failed:', error)
      return content // Return original on failure
    }
  }

  // Load cached translations from localStorage
  loadCachedTranslations() {
    if (typeof localStorage === 'undefined') return

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('auto_translate_')) {
        try {
          const cacheKey = key.replace('auto_translate_', '')
          const cachedData = JSON.parse(localStorage.getItem(key))
          this.cache.set(cacheKey, cachedData)
        } catch (error) {
          console.warn('Failed to load cached translation:', key)
        }
      }
    }
  }
}

export default AutoTranslator
