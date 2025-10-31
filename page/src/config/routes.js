import { t, initialized } from 'tradux'

await initialized

export const routesConfig = [
    {
        path: '/',
        name: 'Projects',
        meta: {
            title: t.title_meta,
            description: t.description_meta,
            image: '/shots/100_AI_Projects_shot.webp'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        meta: {
            title: t.contact.title_meta,
            description: t.contact.description_meta,
            image: '/shots/100_AI_Projects_shot.webp'
        }
    },
    {
        path: '/tradux',
        name: 'Tradux',
        meta: {
            title: t.tradux.title_meta,
            description: t.tradux.description_meta,
            image: '/shots/tradux_shot.webp'
        }
    }
]

// Convert routes array to lookup object for server use
export const routeMetaData = {}
routesConfig.forEach(route => {
    routeMetaData[route.path] = route.meta
})