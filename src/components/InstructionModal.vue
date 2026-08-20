<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-zinc-950/70 backdrop-blur-md transition-opacity"
          @click="closeModal"
        />

        <!-- Dialog Card -->
        <div
          class="relative z-10 w-full max-w-xl bg-white border border-zinc-200/80 shadow-2xl rounded-3xl overflow-hidden text-zinc-900 my-auto"
        >
          <!-- Header -->
          <div class="px-6 pt-6 pb-4 border-b border-zinc-100 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 text-lg">
                ✦
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-extrabold block">
                  3D Studio Guide
                </span>
                <h3 class="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
                  How to Build Your Chandelier
                </h3>
              </div>
            </div>
            <button
              @click="closeModal"
              class="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors"
              title="Close guide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body / Steps -->
          <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <!-- Step Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Step 1 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-zinc-100 flex items-start gap-3">
                <div class="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 class="text-xs font-extrabold text-zinc-900">Select Base Collar</h4>
                  <p class="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Open the parts menu and choose your central base collar to initialize the 3D frame.
                  </p>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-zinc-100 flex items-start gap-3">
                <div class="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 class="text-xs font-extrabold text-zinc-900">Add Arms & Bulbs</h4>
                  <p class="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    Attach custom tiers, multi-piece arms, and decorative bulbs in sequential order.
                  </p>
                </div>
              </div>
            </div>

            <!-- 3D Navigation Controls Box -->
            <div class="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h4 class="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 mb-2.5">
                <span>🕹️</span> 3D Canvas Controls
              </h4>
              <div class="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div class="p-2 rounded-xl bg-white border border-amber-200/50 shadow-xs">
                  <span class="block text-base mb-1">🖱️</span>
                  <strong class="block text-zinc-900 font-bold">Rotate</strong>
                  <span class="text-zinc-500 text-[10px]">Click & Drag</span>
                </div>
                <div class="p-2 rounded-xl bg-white border border-amber-200/50 shadow-xs">
                  <span class="block text-base mb-1">🔍</span>
                  <strong class="block text-zinc-900 font-bold">Zoom</strong>
                  <span class="text-zinc-500 text-[10px]">Scroll Wheel</span>
                </div>
                <div class="p-2 rounded-xl bg-white border border-amber-200/50 shadow-xs">
                  <span class="block text-base mb-1">🖐️</span>
                  <strong class="block text-zinc-900 font-bold">Pan</strong>
                  <span class="text-zinc-500 text-[10px]">Right-Click Drag</span>
                </div>
              </div>
            </div>

            <!-- Assembly & Order -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-zinc-100 flex items-center gap-3">
              <span class="text-lg">🛒</span>
              <div class="text-xs">
                <strong class="text-zinc-900 block font-bold">Real-Time Price & Breakdown</strong>
                <span class="text-zinc-500 text-[11px]">Prices update dynamically as parts are placed. Click "View Assembly Breakdown" to checkout.</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <label class="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-500 hover:text-zinc-700">
              <input
                type="checkbox"
                v-model="dontShowAgain"
                class="rounded border-zinc-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
              />
              <span>Don't show this guide automatically again</span>
            </label>

            <button
              @click="closeModal"
              class="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Got it, Let's Build</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "start"): void;
}>();

const isOpen = ref(props.modelValue);
const dontShowAgain = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val;
  }
);

const closeModal = () => {
  if (dontShowAgain.value) {
    localStorage.setItem("luster_hide_3d_instruction", "true");
  }
  isOpen.value = false;
  emit("update:modelValue", false);
  emit("start");
};
</script>
