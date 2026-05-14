<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import CopyButton from "@/components/CopyButton.vue";
import { frameworks } from "@/data/frameworks.js";

const EarthGlobe = defineAsyncComponent({
  loader: () => import("@/components/EarthGlobe.vue"),
  loadingComponent: () => import("@/components/LoadingGlobe.vue"),
  delay: 200,
  timeout: 10000,
});

import "highlight.js/styles/vs2015.css";
import { onMounted, nextTick, watch, ref, defineAsyncComponent } from "vue";
import { useTradux } from "tradux/vue";
import { marked } from "marked";

const { t } = useTradux();
const readmeHtml = ref("");

const highlightCode = async () => {
  const [{ default: hljs }, { default: javascript }] = await Promise.all([
    import("highlight.js/lib/core"),
    import("highlight.js/lib/languages/javascript"),
  ]);

  hljs.registerLanguage("javascript", javascript);
  await nextTick();

  document.querySelectorAll("pre code").forEach((block) => {
    block.removeAttribute("data-highlighted");
    hljs.highlightElement(block);
  });
};

onMounted(async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/JojoDeveloper01/Tradux/main/readme.md",
  );
  const text = await res.text();
  readmeHtml.value = marked(text);

  await nextTick();
  highlightCode();
});

const activeFramework = ref(0);
const activePackageManager = ref(0);

watch([activeFramework, activePackageManager], async () => {
  await nextTick();
  highlightCode();
});
</script>

<template>
  <BaseLayout>
    <section class="hero">
      <div class="w-full flex flex-col gap-10 lg:gap-8">
        <div class="first">
          <h1 class="mb-6 py-4 md:text-7xl font-bold">
            {{ t.tradux.hero.title }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-3xl">
            {{ t.tradux.hero.description }}
          </p>
        </div>

        <div
          class="EarthGlobe-mobile hidden scale-75 max-[470px]:scale-60 sm:scale-100"
        >
          <EarthGlobe :rotation-speed="0.002" />
        </div>

        <div class="second grid gap-2">
          <div
            class="flex flex-wrap gap-3 items-center p-2 max-[1095px]:justify-center overflow-auto"
          >
            <div
              class="cursor-pointer flex justify-center items-center flex-col gap-2 font-medium"
              v-for="(framework, index) in frameworks"
              :key="framework.name || index"
              @click="activeFramework = index"
            >
              <button
                :class="[
                  'p-2.5 rounded-full! border-4 flex items-center gap-2 transition-colors duration-300',
                  activeFramework === index ? '' : 'hover:bg-white/10',
                ]"
                :style="{
                  borderColor:
                    activeFramework === index ? framework.color : '#6b7280',
                }"
                :aria-label="`Select ${framework.name} framework`"
              >
                <div class="flex flex-col items-center justify-center">
                  <span
                    v-html="framework.icon"
                    :style="{
                      color:
                        activeFramework === index ? framework.color : '#6b7280',
                    }"
                    class="*:size-12 *:fill-current transition-colors duration-300"
                  />
                </div>
              </button>
              <span
                :class="[
                  'text-sm font-bold transition-colors duration-300',
                  activeFramework === index ? '' : 'text-gray-400',
                ]"
                :style="{
                  color: activeFramework === index ? framework.color : '',
                }"
              >
                {{ framework.name }}
              </span>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-xl">
            <pre class="language-javascript grid">
                            <code class="rounded-xl min-w-96 px-5 overflow-x-auto custom-scrollbar">{{ frameworks[activeFramework].usage }}</code>
                        </pre>

            <div
              v-if="
                frameworks[activeFramework].name === 'Astro' ||
                frameworks[activeFramework].name === 'Node'
              "
              class="w-full absolute pl-4 pr-2 top-1 flex justify-between items-center"
            >
              <span class="w-full relative group">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="text-amber-400 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="currentColor"
                    opacity="1"
                  />
                  <text
                    x="12"
                    y="16"
                    text-anchor="middle"
                    font-size="14"
                    stroke="#000"
                    fill="#000"
                  >
                    i
                  </text>
                </svg>
                <div
                  class="absolute top-full mt-2 z-10 px-4 py-2 rounded-lg bg-gray-900 text-sm text-gray-200 border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 text-wrap"
                >
                  {{ t.tradux.extraInfoServerUtility }}
                </div>
              </span>
              <CopyButton
                :text="frameworks[activeFramework].usage"
                button-id="framework"
                button-class="text-sm flex items-center gap-1 p-2! rounded-lg text-gray-400 hover: hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="EarthGlobe h-full flex items-start justify-center sticky top-4"
      >
        <EarthGlobe :rotation-speed="0.002" />
      </div>
    </section>

    <section class="mb-16">
      <p
        class="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-6 text-amber-100"
      >
        {{ t.tradux.readme.officialEnglishNotice }}
      </p>
      <div class="translation-card p-8 readme-content" v-html="readmeHtml" />
    </section>
  </BaseLayout>
</template>

<style scoped>
.hero {
  display: flex;
  gap: 1rem;
  margin-bottom: 5rem;

  h1 {
    font-size: xxx-large;
  }

  > div {
    flex: 1;
  }
}

@media (max-width: 1095px) {
  .hero {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }

  .hero > .EarthGlobe {
    display: none;
  }

  .EarthGlobe-mobile {
    display: flex !important;
    justify-content: center;
    width: 100%;
  }
}

@media (min-width: 1096px) {
  .EarthGlobe-mobile {
    display: none !important;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #8b5cf6 #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #7c3aed, #db2777);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: #374151;
}

/* README markdown rendering */
:deep(.readme-content) {
  h1,
  h2,
  h3,
  h4 {
    color: white;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  p {
    color: #d1d5db;
    margin-bottom: 1rem;
    line-height: 1.7;
  }
  a {
    color: #60a5fa;
    text-decoration: underline;
  }
  a:hover {
    color: #93c5fd;
  }
  ul,
  ol {
    color: #d1d5db;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 0.4rem;
    list-style: disc;
  }
  ol li {
    list-style: decimal;
  }
  strong {
    color: white;
  }
  code {
    color: #67e8f9;
    background: rgba(255, 255, 255, 0.08);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
  pre {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  pre code {
    background: transparent;
    padding: 1rem 1.25rem;
    display: block;
    color: #e2e8f0;
    font-size: 0.875rem;
  }
  blockquote {
    border-left: 4px solid #f59e0b;
    background: rgba(245, 158, 11, 0.08);
    padding: 0.75rem 1rem;
    margin: 1rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  blockquote p {
    color: #fcd34d;
    margin: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  th {
    background: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    padding: 0.6rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: left;
  }
  td {
    color: #d1d5db;
    padding: 0.6rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.03);
  }
  hr {
    border-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
  }
}
</style>
