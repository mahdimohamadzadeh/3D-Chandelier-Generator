<template>
  <div class="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-amber-50/60 to-slate-100/90 group-hover:from-amber-100/60 group-hover:to-amber-50/90 transition-colors duration-500">
    <!-- Ambient background glow -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

    <!-- Empire Gold Tier SVG -->
    <svg v-if="archetype === 'empire'" class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="50" y2="20" />
      <path d="M 25 20 Q 50 15 75 20 L 85 45 Q 50 40 15 45 Z" stroke-linecap="round" />
      <path d="M 30 45 Q 50 42 70 45 L 78 70 Q 50 65 22 70 Z" stroke-linecap="round" />
      <circle cx="50" cy="85" r="5" class="fill-amber-500/20" />
      <line x1="15" y1="45" x2="22" y2="70" />
      <line x1="85" y1="45" x2="78" y2="70" />
      <!-- Hanging crystals -->
      <path d="M 22 70 L 25 82 M 35 70 L 37 84 M 50 70 L 50 85 M 65 70 L 63 84 M 78 70 L 75 82" stroke-dasharray="2 2" />
    </svg>

    <!-- Crystal Crown SVG -->
    <svg v-else-if="archetype === 'crystal'" class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="50" y2="22" />
      <circle cx="50" cy="22" r="4" />
      <path d="M 15 35 Q 50 25 85 35 L 75 75 Q 50 85 25 75 Z" />
      <!-- Diamond facets pattern -->
      <polygon points="50,25 32,55 50,85 68,55" stroke-dasharray="3 2" />
      <polygon points="50,35 22,55 50,75 78,55" />
      <circle cx="50" cy="92" r="3" class="fill-amber-500" />
    </svg>

    <!-- Bohemian Candelabra SVG -->
    <svg v-else-if="archetype === 'candelabra'" class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="50" y2="75" />
      <path d="M 50 65 Q 20 65 20 35 L 20 28" />
      <path d="M 50 65 Q 80 65 80 35 L 80 28" />
      <path d="M 50 70 Q 32 70 32 45 L 32 38" />
      <path d="M 50 70 Q 68 70 68 45 L 68 38" />
      <!-- Candle flames -->
      <path d="M 20 23 Q 20 17 20 15 Q 22 20 20 23 Z" class="fill-amber-500" />
      <path d="M 32 33 Q 32 27 32 25 Q 34 30 32 33 Z" class="fill-amber-500" />
      <path d="M 68 33 Q 68 27 68 25 Q 70 30 68 33 Z" class="fill-amber-500" />
      <path d="M 80 23 Q 80 17 80 15 Q 82 20 80 23 Z" class="fill-amber-500" />
      <path d="M 50 18 Q 50 12 50 10 Q 52 15 50 18 Z" class="fill-amber-500" />
    </svg>

    <!-- Gothic Wrought Iron Ring SVG -->
    <svg v-else-if="archetype === 'gothic'" class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="20" y2="50" />
      <line x1="50" y1="5" x2="80" y2="50" />
      <line x1="50" y1="5" x2="50" y2="50" />
      <ellipse cx="50" cy="50" rx="35" ry="12" stroke-width="2" />
      <ellipse cx="50" cy="50" rx="30" ry="9" stroke-dasharray="2 2" />
      <!-- Hanging studs -->
      <circle cx="15" cy="50" r="3" class="fill-amber-500" />
      <circle cx="85" cy="50" r="3" class="fill-amber-500" />
      <circle cx="50" cy="62" r="3" class="fill-amber-500" />
      <!-- Chain links -->
      <path d="M 50 62 L 50 82 M 20 50 L 25 75 M 80 50 L 75 75" />
    </svg>

    <!-- Murano Glass SVG -->
    <svg v-else-if="archetype === 'murano'" class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="50" y2="30" />
      <circle cx="50" cy="45" r="18" />
      <path d="M 32 45 C 20 25 10 40 32 55" />
      <path d="M 68 45 C 80 25 90 40 68 55" />
      <path d="M 50 63 C 35 80 65 80 50 95" />
      <circle cx="50" cy="45" r="8" stroke-dasharray="2 2" />
    </svg>

    <!-- Vintage Pendant SVG -->
    <svg v-else class="w-24 h-24 stroke-amber-600 group-hover:stroke-amber-500 transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(217,119,6,0.2)]" viewBox="0 0 100 100" fill="none" stroke-width="1.5">
      <line x1="50" y1="5" x2="50" y2="40" />
      <rect x="42" y="32" width="16" height="8" rx="2" />
      <circle cx="50" cy="62" r="22" />
      <path d="M 32 62 Q 50 48 68 62" />
      <circle cx="50" cy="62" r="6" class="fill-amber-500/30" />
      <line x1="50" y1="84" x2="50" y2="94" stroke-dasharray="2 2" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  archetype: 'empire' | 'crystal' | 'candelabra' | 'gothic' | 'murano' | 'pendant';
}>();
</script>
