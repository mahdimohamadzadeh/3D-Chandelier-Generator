declare module "v-lazy-image" {
  import type { DefineComponent } from "vue";
  const VLazyImage: DefineComponent<{ src: string; alt?: string }, object, unknown>;
  export default VLazyImage;
}
