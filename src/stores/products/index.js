import { GetSortCategory } from "@/helpers/sortCategory";
import axios from "axios";
import { defineStore } from "pinia";
import { findNumber } from "@/helpers/findNumberFromText";
import { getDynamicUrl } from "@/helpers/imageUrl.js";
import { useLoadingStore } from "../loading";

const baseURL = "https://shahanluster.com/wp-json/wc/v3";
const consumerKey = "ck_6d15db6af6404391b068f043de387197250c274d";
const consumerSecret = "cs_1468bd2a970b1858015eede75017da1197aa36b6";

const axiosInstance = axios.create({
  baseURL,
  // Set user pass for resAPI
  auth: {
    username: consumerKey,
    password: consumerSecret,
  },
});
export const useProductStore = defineStore({
  id: "products",
  state: () => ({
    products: [],
    categories: [],
    models: [],
    isModalProduct: false,
    selectProduct: {},
    numberOfProduct: null,
  }),
  getters: {
    getProducts: (state) => {
      return state.products.map((product) => ({
        // Get filtered products
        id: +product.id,
        title: product.name,
        category: product.categories[1].name,
        categoryID: +product.categories[1].id,
        price: +product.price,
        dimension: product.attributes[0].options[0],
        dimensionName: product.attributes[0].name,
        imgURL: product.images[0].src,
        glbUrl: product.attributes[1].options[0],
        position: {
          x: findNumber(product.tags[0].name),
          y: findNumber(product.tags[1].name),
          z: findNumber(product.tags[2].name),
        },
        isStock: product.stock_status,
      }));
    },
    getProductByID() {
      return (productID) => {
        return this.getProducts.filter((product) => product.id === productID);
      };
    },
    getProductByCategory() {
      return (categoryID) => {
        return this.getProducts.filter(
          (product) => product.categoryID === categoryID
        );
      };
    },
    getPriceProductByID: (state) => {
      return (productID) =>
        state.products.filter((product) => product.id === productID)[0].price;
    },
    getCategories: (state) => {
      let NewCategories = [];
      NewCategories = state.categories.map((category) => ({
        // Get all filtered categories
        id: +category.id,
        slug: category.slug,
        title: category.name,
        description: category.description,
      }));
      return GetSortCategory(NewCategories);
    },
    getModelByID() {
      return (productID) => {
        return this.models.filter((model) => model.id === productID);
      };
    },
    getCategoryIDByProductID() {
      return (productID) => {
        return this.getProducts.filter((product) => product.id === productID)[0]
          .categoryID;
      };
    },
  },
  actions: {
    async fetchProducts() {
      // fetch products from woocommerce wordpress API
      try {
        const loadingStore = useLoadingStore();
        loadingStore.$state.loading = true;
        const response = await axiosInstance.get(
          "/products?per_page=100&category=179"
        );
        this.products = response.data;
        loadingStore.$state.loading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCategories() {
      // fetch categories from woocommerce wordpress API
      try {
        const loadingStore = useLoadingStore();
        loadingStore.$state.loading = true;
        const response = await axiosInstance.get(
          "/products/categories?per_page=100"
        );
        this.categories = response.data;
        loadingStore.$state.loading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    setGlbFileArray(productID) {
      const productResult = this.getProductByID(productID);
      const glbFile = {
        url: getDynamicUrl(productResult[0].glbUrl),
        id: productResult[0].id,
      };
      return glbFile;
    },
    addModel(instance, id) {
      let index = this.models.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        this.models[index] = { instance, id }; // If the object with the same id exists, replace it
      } else {
        this.models.push({ instance, id }); // If not, simply push the new object
      }
    },
    setProductModal(modalValue, productSelected) {
      this.isModalProduct = null;
      this.isModalProduct = modalValue;
      if (productSelected) {
        this.selectProduct = productSelected;
      }
    },
  },
});
