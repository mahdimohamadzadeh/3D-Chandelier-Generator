<template>
  <div class="min-h-screen my-16 hero">
    <div class="flex-col hero-content md:px-10">
      <img
        src="/mobileBanner.jpeg"
        class="w-10/12 rounded-lg shadow-xl lg:w-full"
      />
      <div>
        <h1 class="my-4 text-4xl font-bold">
          لوسترهای سه بعدی سفارشی : درخشش رؤیای شما در خانه‌تان!
        </h1>
        <h2 class="mt-10 text-base">
          به دنیای درخشان لوسترهای سه بعدی سفارشی خوش آمدید! در اینجا، می‌توانید
          لوستری منحصر به فرد و متناسب با سلیقه و دکوراسیون خود را طراحی و سفارش
          دهید.
        </h2>
        <p class="my-6 text-2xl font-bold">مزایای لوسترهای سه بعدی سفارشی :</p>
        <ul class="flex flex-col px-3 text-lg list-disc gap-y-4">
          <li>
            منحصر به فرد بودن : لوستری خواهید داشت که هیچ کس دیگری مانند آن را
            ندارد.
          </li>
          <li>
            تناسب کامل با دکوراسیون : لوستر شما با سبک و سیاق دکوراسیون منزل شما
            هماهنگ خواهد بود.
          </li>
          <li>تنوع بی‌نظیر : در طرح، رنگ، جنس و ابعاد هیچ محدودیتی ندارید.</li>
          <li>
            قیمت مناسب : با توجه به نیاز و بودجه شما، بهترین قیمت را به شما
            ارائه خواهیم داد.
          </li>
        </ul>
        <button @click="$emit('onStart')" class="mt-5 btn btn-warning">
          شروع کنید
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
