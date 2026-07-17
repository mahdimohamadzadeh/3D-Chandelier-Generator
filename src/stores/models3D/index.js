import { defineStore } from "pinia";

export const useModelStore = defineStore({
  id: "model",
  state: () => ({
    modelSelect: Array.from({ length: 8 }, () => []),
    prices: Array.from({ length: 8 }, () => []),
    orders: Array.from({ length: 8 }, () => []),
    totalPrice: 0,
    totalOrder: [],
  }),
  getters: {
    // getCategories: (state) => {
    //   return state.categories.map((category) => ({
    //     id: category.id,
    //     slug: category.slug,
    //     title: category.name,
    //   }));
    // },
  },
  actions: {
    updatePrices(categoryID, numberOfProduct) {
      // Set last price and get total price from array of prices
      let total = 0;
      const endPrice = this.modelSelect[categoryID].slice(-1)[0].price;
      this.prices[categoryID].push(+endPrice * numberOfProduct);
      if (this.prices[categoryID].length > 1) {
        this.prices[categoryID].splice(0, this.prices[categoryID].length - 1);
      }
      this.prices.forEach((category) => {
        category.forEach((product) => {
          total += product;
        });
      });
      this.totalPrice = total;
    },
    updateOrder(categoryID, numberOfProduct) {
      // Set last order and get total order from array
      let total = [];
      let multiPushArray = [];
      const endOrder = this.modelSelect[categoryID].slice(-1)[0];
      if (numberOfProduct > 1) {
        for (let i = 0; i < numberOfProduct; i++) {
          multiPushArray.push({ ...endOrder }); // Using spread syntax to clone the object
          this.orders[categoryID].push(multiPushArray);
        }
      } else {
        this.orders[categoryID].push(endOrder);
      }
      if (this.orders[categoryID].length > 1) {
        this.orders[categoryID].splice(0, this.orders[categoryID].length - 1);
      }
      this.orders.forEach((category) => {
        category.forEach((order) => {
          if (order.length) {
            order.forEach((item) => {
              total.push(item);
            });
          } else {
            total.push(order);
          }
        });
      });
      this.totalOrder = total;
      // this.orders.forEach((category) => {
      //   category.forEach((product) => {
      //     const existingProduct = this.totalOrder.filter(
      //       (order) => order.id === product.id
      //     );
      //     if (existingProduct.length == 0) {
      //       this.totalOrder.push(product);
      //     }
      //   });
      // });
    },
  },
});
