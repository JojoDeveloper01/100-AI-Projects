
export const defaultMetaImage = '/shots/100_AI_Projects_shot.png'
// Shared route configuration with meta data
export const routesConfig = [
    {
        path: '/',
        name: 'Projects',
        meta: {
            title: '100 AI Projects - AI Development Portfolio',
            description: 'Explore a comprehensive collection of 100 artificial intelligence projects showcasing cutting-edge AI technologies, machine learning implementations, and innovative solutions.',
            image: defaultMetaImage
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        meta: {
            title: '100 AI Projects - Contact',
            description: 'Get in touch with the 100 AI Projects team. Connect with us for collaborations, questions, or discussions about artificial intelligence and machine learning projects.',
            image: defaultMetaImage
        }
    },
    {
        path: '/tradux',
        name: 'Tradux',
        meta: {
            title: 'Tradux - Intelligent Translation Management Library',
            description: 'Discover Tradux, a powerful JavaScript library for intelligent translation management. Automate multilingual workflows with AI-powered translation updates and seamless internationalization.',
            image: '/shots/tradux_shot.png'
        }
    }
]

// Convert routes array to lookup object for server use
export const routeMetaData = {}
routesConfig.forEach(route => {
    routeMetaData[route.path] = route.meta
})

// Default meta data for usePageMeta
export const defaultMeta = {
    title: '100 AI Projects - AI Development Portfolio',
    description: '100 small AI projects to learn, experiment, and explore practical and creative uses of artificial intelligence.',
    image: defaultMetaImage,
    url: 'https://100aiprojects.dev'
}