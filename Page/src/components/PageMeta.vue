<script setup>
import { onMounted, onUnmounted } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta.js'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/favicon.svg'
    },
    keywords: {
        type: String,
        default: ''
    }
})

const { setPageMeta, resetMeta } = usePageMeta()

onMounted(() => {
    setPageMeta({
        title: props.title,
        description: props.description,
        image: props.image,
        keywords: props.keywords
    })
})

// Reset to route meta when component unmounts
onUnmounted(() => {
    resetMeta()
})
</script>

<template>
    <!-- This component doesn't render anything -->
</template>