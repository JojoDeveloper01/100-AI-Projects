import { ref } from 'vue'

// Default meta data
const defaultMeta = {
    title: '100 AI Projects - AI Development Portfolio',
    description: '100 small AI projects to learn, experiment, and explore practical and creative uses of artificial intelligence.',
    image: '/favicon.svg',
    url: 'https://100aiprojects.dev'
}

// Current meta state
const currentMeta = ref({ ...defaultMeta })

export function usePageMeta() {
    // Update document title and meta tags
    const updateMeta = (meta) => {
        // Update title
        document.title = meta.title || defaultMeta.title

        // Update or create meta description
        updateMetaTag('description', meta.description || defaultMeta.description)

        // Update keywords if provided
        if (meta.keywords) {
            updateMetaTag('keywords', meta.keywords)
        }

        // Update Open Graph meta tags
        updateMetaTag('og:title', meta.title || defaultMeta.title, 'property')
        updateMetaTag('og:description', meta.description || defaultMeta.description, 'property')
        updateMetaTag('og:image', meta.image || defaultMeta.image, 'property')
        updateMetaTag('og:url', meta.url || defaultMeta.url, 'property')
        updateMetaTag('og:type', 'website', 'property')

        // Update Twitter Card meta tags
        updateMetaTag('twitter:card', 'summary_large_image', 'name')
        updateMetaTag('twitter:title', meta.title || defaultMeta.title, 'name')
        updateMetaTag('twitter:description', meta.description || defaultMeta.description, 'name')
        updateMetaTag('twitter:image', meta.image || defaultMeta.image, 'name')

        // Update canonical URL
        updateLinkTag('canonical', meta.url || defaultMeta.url)

        currentMeta.value = { ...defaultMeta, ...meta }
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
        let element = document.querySelector(`meta[${attribute}="${name}"]`)

        if (!element) {
            element = document.createElement('meta')
            element.setAttribute(attribute, name)
            document.head.appendChild(element)
        }

        element.setAttribute('content', content)
    }

    // Helper function to update or create link tags
    const updateLinkTag = (rel, href) => {
        let element = document.querySelector(`link[rel="${rel}"]`)

        if (!element) {
            element = document.createElement('link')
            element.setAttribute('rel', rel)
            document.head.appendChild(element)
        }

        element.setAttribute('href', href)
    }

    // Set page meta
    const setPageMeta = (meta) => {
        updateMeta(meta)
    }

    // Reset to default meta
    const resetMeta = () => {
        updateMeta(defaultMeta)
    }

    return {
        currentMeta,
        setPageMeta,
        resetMeta,
        updateMeta
    }
}