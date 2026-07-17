<template>
  <div class="hero w-full absolute top-56">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img src="/mobileBanner.jpeg" class="max-w-lg rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-4xl font-bold my-4 tracking-wider leading-relaxed">
          لوسترهای سه بعدی سفارشی : درخشش رویای شما در خانه‌تان!
        </h1>
        <h2 class="text-lg mt-10 font-semibold tracking-wider leading-loose">
          به دنیای درخشان لوسترهای سه بعدی سفارشی خوش آمدید! در اینجا، می‌توانید
          لوستری منحصر به فرد و متناسب با سلیقه و دکوراسیون خود را طراحی و سفارش
          دهید.
        </h2>
        <ul class="list-disc p-3 text-lg gap-y-4 flex flex-col my-7">
          <li>
            <span class="font-semibold">منحصر به فرد بودن</span>
            : لوستری خواهید داشت که هیچ کس دیگری مانند آن را ندارد.
          </li>
          <li>
            <span class="font-semibold">
              لوستر شما با سبک و سیاق دکوراسیون منزل شما</span
            >
            : تناسب کامل با دکوراسیون هماهنگ خواهد بود.
          </li>
          <li>
            <span class="font-semibold"> تنوع بی‌نظیر</span>
            : در طرح، رنگ، جنس و ابعاد هیچ محدودیتی ندارید.
          </li>
          <li>
            <span class="font-semibold"> قیمت مناسب </span>

            : با توجه به نیاز و بودجه شما، بهترین قیمت را به شما ارائه خواهیم
            داد.
          </li>
        </ul>
        <button @click="$emit('onStart')" class="btn btn-warning mt-5">
          شروع کنید
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
