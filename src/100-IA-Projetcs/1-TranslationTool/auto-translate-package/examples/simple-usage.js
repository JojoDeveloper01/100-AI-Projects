// Example: Simple usage for any JavaScript project

import AutoTranslator from 'auto-translate'

// 1. Initialize the translator
const translator = new AutoTranslator({
  apiEndpoint: 'https://your-api.com/translate-json',
  defaultLanguage: 'english'
})

// 2. Define your content in a JSON structure
const websiteContent = {
  navigation: {
    home: "Home",
    about: "About Us", 
    services: "Services",
    contact: "Contact"
  },
  hero: {
    title: "Welcome to Our Company",
    subtitle: "We create amazing digital experiences",
    cta: "Get Started"
  },
  footer: {
    copyright: "© 2024 Our Company. All rights reserved."
  }
}

// 3. Create language switcher
function createLanguageSwitcher() {
  const select = document.createElement('select')
  const languages = [
    { code: 'english', name: 'English' },
    { code: 'spanish', name: 'Español' },
    { code: 'french', name: 'Français' },
    { code: 'portuguese', name: 'Português' }
  ]

  languages.forEach(lang => {
    const option = document.createElement('option')
    option.value = lang.code
    option.textContent = lang.name
    select.appendChild(option)
  })

  select.addEventListener('change', async (e) => {
    const newLanguage = e.target.value
    await changeLanguage(newLanguage)
  })

  return select
}

// 4. Translation function
let currentContent = websiteContent
async function changeLanguage(targetLanguage) {
  // Show loading
  document.body.classList.add('translating')
  
  try {
    // Translate content
    currentContent = await translator.translate(websiteContent, targetLanguage)
    
    // Update all text elements
    updatePageContent()
  } catch (error) {
    console.error('Translation failed:', error)
  } finally {
    document.body.classList.remove('translating')
  }
}

// 5. Update page content
function updatePageContent() {
  // Update navigation
  document.querySelector('[data-translate="nav.home"]').textContent = currentContent.navigation.home
  document.querySelector('[data-translate="nav.about"]').textContent = currentContent.navigation.about
  document.querySelector('[data-translate="nav.services"]').textContent = currentContent.navigation.services
  document.querySelector('[data-translate="nav.contact"]').textContent = currentContent.navigation.contact
  
  // Update hero section
  document.querySelector('[data-translate="hero.title"]').textContent = currentContent.hero.title
  document.querySelector('[data-translate="hero.subtitle"]').textContent = currentContent.hero.subtitle
  document.querySelector('[data-translate="hero.cta"]').textContent = currentContent.hero.cta
  
  // Update footer
  document.querySelector('[data-translate="footer.copyright"]').textContent = currentContent.footer.copyright
}

// 6. Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add language switcher to page
  const switcher = createLanguageSwitcher()
  document.querySelector('#language-switcher').appendChild(switcher)
  
  // Initial content update
  updatePageContent()
})

// HTML structure needed:
/*
<div id="language-switcher"></div>

<nav>
  <a data-translate="nav.home">Home</a>
  <a data-translate="nav.about">About Us</a>
  <a data-translate="nav.services">Services</a>
  <a data-translate="nav.contact">Contact</a>
</nav>

<section>
  <h1 data-translate="hero.title">Welcome to Our Company</h1>
  <p data-translate="hero.subtitle">We create amazing digital experiences</p>
  <button data-translate="hero.cta">Get Started</button>
</section>

<footer>
  <p data-translate="footer.copyright">© 2024 Our Company. All rights reserved.</p>
</footer>
*/
