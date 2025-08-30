<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <div
        class="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <main class="mx-4 my-8">
            <slot />
        </main>
        <Footer />
    </div>
</template>
