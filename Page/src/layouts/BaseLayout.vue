<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
    <div class="max-w-7xl">
        <div class="px-4 bg-gradient-to-b from-transparent via-black to-transparent">
            <Header />
            <main class="my-8 ">
                <slot />
            </main>
            <Footer />
        </div>
    </div>
</template>
