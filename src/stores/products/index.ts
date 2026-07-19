import { defineStore } from "pinia";
import { GetSortCategory } from "@/helpers/sortCategory";
import { products as mockProducts, categories as mockCategories } from "@/data/mockProducts";
import { findNumber } from "@/helpers/findNumberFromText";
import { getDynamicUrl, getImageUrl } from "@/helpers/imageUrl";
import { useLoadingStore } from "@/stores/loading";
import type { Object3D } from "three";

export interface Product {
  id: number;
  title: string;
  category: string;
  categoryID: number;
  price: number;
  dimension: string;
  dimensionName: string;
  imgURL: string;
  glbUrl: string;
  position: { x: number; y: number; z: number };
  isStock: string;
}

export interface GlbFile {
  url: string;
  id: number;
}

export interface ModelEntry {
  instance: Object3D | Object3D[];
  id: GlbFile;
}

export const useProductStore = defineStore({
  id: "products",
  state: () => ({
    products: [] as typeof mockProducts,
    categories: [] as typeof mockCategories,
    models: [] as ModelEntry[],
    isModalProduct: false as boolean,
    selectProduct: {} as Product,
    numberOfProduct: null as number | null,
  }),
  getters: {
    getProducts: (state): Product[] => {
      return state.products.map((product) => ({
        id: +product.id,
        title: product.name,
        category: product.categories[1].name,
        categoryID: +product.categories[1].id,
        price: +product.price,
        dimension: product.attributes[0].options[0],
        dimensionName: product.attributes[0].name,
        imgURL: getImageUrl(product.attributes[1].options[0]),
        glbUrl: product.attributes[1].options[0],
        position: {
          x: findNumber(product.tags[0].name),
          y: findNumber(product.tags[1].name),
          z: findNumber(product.tags[2].name),
        },
        isStock: product.stock_status,
      }));
    },
    getProductByID(): (productID: number) => Product[] {
      return (productID) => this.getProducts.filter((p) => p.id === productID);
    },
    getProductByCategory(): (categoryID: number) => Product[] {
      return (categoryID) => this.getProducts.filter((p) => p.categoryID === categoryID);
    },
    getPriceProductByID: (state) => {
      return (productID: number): string =>
        state.products.filter((p) => p.id === productID)[0].price;
    },
    getCategories: (state) => {
      return GetSortCategory(
        state.categories.map((c) => ({
          id: +c.id,
          slug: c.slug,
          title: c.name,
          description: c.description,
        }))
      );
    },
    getModelByID(): (productID: number) => ModelEntry[] {
      return (productID) => this.models.filter((m) => m.id.id === productID);
    },
    getCategoryIDByProductID(): (productID: number) => number {
      return (productID) =>
        this.getProducts.filter((p) => p.id === productID)[0].categoryID;
    },
  },
  actions: {
    async fetchProducts(): Promise<void> {
      try {
        const loadingStore = useLoadingStore();
        loadingStore.loading = true;
        await new Promise((r) => setTimeout(r, 200));
        this.products = mockProducts;
        loadingStore.loading = false;
      } catch (error) {
        console.error("Error loading mock products:", error);
      }
    },
    async fetchCategories(): Promise<void> {
      try {
        const loadingStore = useLoadingStore();
        loadingStore.loading = true;
        await new Promise((r) => setTimeout(r, 100));
        this.categories = mockCategories;
        loadingStore.loading = false;
      } catch (error) {
        console.error("Error loading mock categories:", error);
      }
    },
    setGlbFileArray(productID: number): GlbFile {
      const product = this.getProductByID(productID)[0];
      return { url: getDynamicUrl(product.glbUrl), id: product.id };
    },
    addModel(instance: Object3D | Object3D[], id: GlbFile): void {
      const index = this.models.findIndex((obj) => obj.id.id === id.id);
      if (index !== -1) {
        this.models[index] = { instance, id };
      } else {
        this.models.push({ instance, id });
      }
    },
    setProductModal(modalValue: boolean, productSelected?: Product): void {
      this.isModalProduct = modalValue;
      if (productSelected) this.selectProduct = productSelected;
    },
  },
});
