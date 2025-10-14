<template>
    <button @click="handleCopy" :class="buttonClass">
        <svg v-if="!isShowingFeedback" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span v-if="showText">{{ isShowingFeedback ? 'Copied!' : 'Copy' }}</span>
    </button>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    buttonId: {
        type: String,
        required: true
    },
    showText: {
        type: Boolean,
        default: true
    },
    buttonClass: {
        type: String,
        default: 'absolute top-2 right-2 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors'
    }
})

const showCopiedFeedback = ref(false)
const activeCopyButton = ref(null)

const isShowingFeedback = computed(() => {
    return showCopiedFeedback.value && activeCopyButton.value === props.buttonId
})

const handleCopy = () => {
    navigator.clipboard.writeText(props.text).then(() => {
        activeCopyButton.value = props.buttonId
        showCopiedFeedback.value = true
        setTimeout(() => {
            showCopiedFeedback.value = false
            activeCopyButton.value = null
        }, 1000)
    })
}
</script>