# 🌐 Auto-Translate Package

The simplest way to add AI translation to your app

## ⚡ Super Simple Usage

Just 2 lines of code:

```javascript
import { translate } from 'auto-translate-package'

const result = await translate(myData, 'spanish')
```

That's it! No configuration, no setup, no complexity.

## 🚀 Quick Start

### Install

```bash
npm install auto-translate-package
```

### Use Anywhere

```javascript
import { translate } from 'auto-translate-package'

// Translate any object
const myWebsite = {
  title: "Welcome to My Site",
  nav: { home: "Home", about: "About" }
}

const spanish = await translate(myWebsite, 'spanish')
// Result: { title: "Bienvenido a Mi Sitio", nav: { home: "Inicio", about: "Acerca de" } }
```

### Vue.js Example

```vue
<template>
  <div>
    <h1>{{ content.title }}</h1>
    <button @click="translateToSpanish">Translate to Spanish</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { translate } from 'auto-translate-package'

const content = ref({
  title: "Hello World"
})

const translateToSpanish = async () => {
  content.value = await translate(content.value, 'spanish')
}
</script>
```

## 🎯 Features

- ✅ **Zero Configuration** - Works out of the box
- ✅ **Automatic Caching** - Translations cached automatically
- ✅ **Any Framework** - Works with Vue, React, vanilla JS
- ✅ **Deep Objects** - Translates nested objects perfectly
- ✅ **Loading States** - Optional loading indicators

## 📖 API

### `translate(data, language, apiUrl?)`

Translates any data structure to target language.

- `data` - Object/string to translate
- `language` - Target language ('spanish', 'french', etc.)
- `apiUrl` - Optional API endpoint (defaults to '/api/translate-json')

### `useTranslate()` (Vue only)

Get reactive loading state:

```javascript
import { useTranslate } from 'auto-translate-package'

const { translate, isLoading } = useTranslate()
```

## 🔧 Your API Format

Your translation API should accept:

```json
{
  "data": { "title": "Hello" },
  "targetLanguage": "spanish"
}
```

And return:

```json
{
  "success": true,
  "translatedData": { "title": "Hola" }
}
```

## 💡 Why So Simple?

Most translation libraries are overcomplicated. This package does one thing perfectly: translate your data. No plugins, no configuration, no learning curve.

Perfect for prototypes, demos, and production apps that need quick i18n.

## License

MIT
    title: "Welcome to Our Website"
  }
}

// AI automatically translates to any language
// No manual translation needed
// Simple, intuitive API
```

## 🔧 Advanced Configuration

```javascript
app.use(AutoTranslate, {
  apiEndpoint: 'https://your-api.com/translate-json',
  defaultLanguage: 'english',
  supportedLanguages: ['spanish', 'french', 'portuguese'],
  
  // Cache settings
  enableCache: true,
  cacheExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  // Custom translation provider
  customTranslator: async (text, targetLang) => {
    // Your custom translation logic
  },
  
  // Template variable preservation
  preserveVariables: true, // Keeps {{variable}} intact
  
  // Error handling
  onError: (error) => {
    console.error('Translation failed:', error)
  }
})
```

## 🌍 Supported Languages

- English, Spanish, French, Portuguese
- German, Italian, Dutch, Russian
- Chinese, Japanese, Korean, Arabic
- And many more...

## 📦 Framework Support

### Vanilla JavaScript
```javascript
import AutoTranslator from 'auto-translate'

const translator = new AutoTranslator({
  // Uses your existing Cloudflare Workers API at /api/translate-json
  // No configuration needed!
})

const translated = await translator.translate(content, 'spanish')
```

### React Hook (Coming Soon)
```javascript
import { useAutoTranslate } from 'auto-translate/react'

const { t, changeLanguage } = useAutoTranslate(content)
```

## 🚀 Integration with Your Existing Cloudflare Workers

The package automatically works with your existing Cloudflare Workers setup! Since you already have the m2m100-1.2b model running, the auto-translate package will use your `/api/translate-json` endpoint.

### Your Current Setup (Already Working!)
```javascript
// Your existing server/index.js - NO CHANGES NEEDED
export default {
  async fetch(request, env) {
    if (url.pathname === "/api/translate-json") {
      const { data, targetLanguage } = await request.json()
      
      // Your existing translation logic with m2m100-1.2b
      const translatedData = await translateObject(data, targetLanguage, env)
      
      return Response.json({
        success: true,
        translatedData,
        targetLanguage
      })
    }
  }
}
```

### How It Works Together
1. **Auto-translate package** sends requests to `/api/translate-json`
2. **Your Cloudflare Workers** processes with m2m100-1.2b model
3. **Translations cached** automatically for performance
4. **Zero configuration** - it just works!

## 💡 Use Cases

- **Marketing Websites** - Instant multilingual landing pages
- **E-commerce** - Product descriptions in multiple languages  
- **Documentation** - Auto-translate docs and guides
- **SaaS Applications** - Reach global audiences instantly
- **Blogs & Content** - Multilingual content without manual work

## 🎯 Why Choose Auto-Translate?

✅ **No manual translation work**  
✅ **No complex i18n setup**  
✅ **No separate translation files**  
✅ **No translation keys to manage**  
✅ **Instant multilingual websites**  
✅ **AI-powered accuracy**  
✅ **Built-in caching**  
✅ **Framework agnostic**  

## 📄 License

MIT License - feel free to use in any project!

## 🤝 Contributing

Contributions welcome! Please read our contributing guide and submit PRs.

---

**Made with ❤️ for developers who want multilingual websites without the complexity**
