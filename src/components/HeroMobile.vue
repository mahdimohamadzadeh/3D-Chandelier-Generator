<template>
  <div class="min-h-screen my-16 hero">
    <div class="flex-col hero-content md:px-10">
      <img
        src="/mobileBanner.jpeg"
        class="w-10/12 rounded-lg shadow-xl lg:w-full"
      />
      <div>
        <h1 class="my-4 text-4xl font-bold">
          Custom 3D Chandeliers — Make your home shine!
        </h1>
        <h2 class="mt-10 text-base">
          Welcome to the world of custom 3D chandeliers. Design a unique chandelier that matches your taste and decor.
        </h2>
        <p class="my-6 text-2xl font-bold">Why choose custom 3D chandeliers:</p>
        <ul class="flex flex-col px-3 text-lg list-disc gap-y-4">
          <li>
            Unique designs — a chandelier no one else will have.
          </li>
          <li>
            Perfect fit for your decor — matches your home's style.
          </li>
          <li>Unlimited variety — choose any shape, color, material, and size.</li>
          <li>
            Affordable options — tailored to your needs and budget.
          </li>
        </ul>
        <button @click="$emit('onStart')" class="mt-5 btn btn-warning">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
