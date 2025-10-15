import { useHead, useSeoMeta } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { routeMetaData } from '@/config/routes.js'

export function usePageMeta() {
    const route = useRoute()

    // Get meta data for current route
    const meta = routeMetaData[route.path]

    // Set up SEO meta tags using Unhead
    useSeoMeta({
        title: meta.title,
        description: meta.description,
        ogTitle: meta.title,
        ogDescription: meta.description,
        ogImage: `https://100aiprojects.dev${meta.image}`,
        ogUrl: `https://100aiprojects.dev${route.path}`,
        ogType: 'website',
        ogSiteName: '100 AI Projects',
        twitterCard: 'summary_large_image',
        twitterTitle: meta.title,
        twitterDescription: meta.description,
        twitterImage: `https://100aiprojects.dev${meta.image}`,
        twitterImageAlt: meta.title,
    })

    // Set canonical link
    useHead({
        link: [
            {
                rel: 'canonical',
                href: `https://100aiprojects.dev${route.path}`
            }
        ]
    })

    return {
        meta,
        setCustomMeta: (customMeta) => {
            useSeoMeta(customMeta)
        }
    }
}