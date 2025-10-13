<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <Header />
    <main class="my-8 px-4 bg-gradient-to-b from-transparent via-black to-transparent">
        <slot />
    </main>
    <Footer />
</template>
