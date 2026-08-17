<template>
  <div class="min-h-screen pt-20 pb-20 bg-slate-50 text-zinc-900 selection:bg-amber-500 selection:text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-widest">
          <span>✦</span> Architectural Lighting Journal
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 text-zinc-900">
          The Luster <span class="text-amber-500">Journal</span>
        </h1>
        <p class="text-zinc-500 text-sm sm:text-base mt-3 leading-relaxed">
          Proportions formulas, restoration guides, 2026 design trends, and custom 3D chandelier guides.
        </p>
      </div>

      <!-- Featured Post Banner (Clean Light Design) -->
      <div v-if="featuredPost" class="relative rounded-3xl overflow-hidden shadow-xl mb-12 bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-950 text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs font-bold text-amber-400 mb-4">
              <span class="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-md uppercase tracking-wider">FEATURED</span>
              <span>•</span>
              <span>{{ featuredPost.category }}</span>
              <span>•</span>
              <span>{{ featuredPost.readTime }}</span>
            </div>

            <h2 class="text-2xl sm:text-4xl font-extrabold leading-tight text-white hover:text-amber-400 transition-colors cursor-pointer" @click="activePost = featuredPost">
              {{ featuredPost.title }}
            </h2>

            <p class="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {{ featuredPost.excerpt }}
            </p>
          </div>

          <div class="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold flex items-center justify-center text-xs">
                {{ featuredPost.author.initials }}
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ featuredPost.author.name }}</p>
                <p class="text-xs text-zinc-400">{{ featuredPost.author.role }}</p>
              </div>
            </div>

            <button
              @click="activePost = featuredPost"
              class="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              Read Entry →
            </button>
          </div>
        </div>

        <!-- Abstract Vector Graphic Header -->
        <div class="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div class="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xs font-mono text-zinc-400 uppercase tracking-widest">Architectural Calculation</span>
          <p class="text-sm font-bold text-white mt-1">Room Dimension Ratio Formula</p>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in regularPosts"
          :key="post.id"
          class="bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col group justify-between"
        >
          <!-- Vector Header -->
          <div class="p-6 bg-gradient-to-b from-amber-50/50 to-slate-100/60 border-b border-zinc-100 flex items-center justify-between cursor-pointer" @click="activePost = post">
            <span class="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-md">
              {{ post.category }}
            </span>
            <span class="text-xs font-mono text-zinc-500">{{ post.readTime }}</span>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-xs text-zinc-400 mb-2">{{ post.date }}</p>
              <h3 class="text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer" @click="activePost = post">
                {{ post.title }}
              </h3>
              <p class="text-xs text-zinc-500 mt-3 line-clamp-3 leading-relaxed">
                {{ post.excerpt }}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold flex items-center justify-center">
                  {{ post.author.initials }}
                </div>
                <span class="text-xs font-semibold text-zinc-700">{{ post.author.name }}</span>
              </div>

              <button @click="activePost = post" class="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                Read →
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Article Reader Modal -->
    <transition name="fade">
      <div v-if="activePost" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="activePost = null">
        <div class="bg-white border border-zinc-200 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 animate-in fade-in zoom-in duration-200 text-zinc-900">
          <button @click="activePost = null" class="sticky top-0 float-right z-10 w-9 h-9 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex items-center justify-center transition-colors">
            ✕
          </button>

          <span class="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            {{ activePost.category }}
          </span>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3">
            {{ activePost.title }}
          </h1>

          <div class="flex items-center gap-4 mt-4 pb-6 border-b border-zinc-100 text-xs text-zinc-500">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-xs">
                {{ activePost.author.initials }}
              </div>
              <div>
                <p class="font-bold text-zinc-900">{{ activePost.author.name }}</p>
                <p class="text-zinc-400 text-[11px]">{{ activePost.author.role }}</p>
              </div>
            </div>
            <span>•</span>
            <span>{{ activePost.date }}</span>
            <span>•</span>
            <span>{{ activePost.readTime }}</span>
          </div>

          <!-- Article Content -->
          <div class="prose prose-amber max-w-none text-zinc-700 text-sm sm:text-base leading-relaxed whitespace-pre-line my-6">
            {{ activePost.content }}
          </div>

          <div class="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
            <button @click="activePost = null" class="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs rounded-xl">
              Close Journal Entry
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { blogPosts } from '@/data/blogPosts';
import type { BlogPost } from '@/data/blogPosts';

const activePost = ref<BlogPost | null>(null);

const featuredPost = computed(() => blogPosts.find((p) => p.featured) || blogPosts[0]);
const regularPosts = computed(() => blogPosts.filter((p) => p.id !== featuredPost.value?.id));
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
