import { defineStore } from "pinia";

export interface ProductOrder {
  id: number;
  title: string;
  price: number;
  [key: string]: unknown;
}

export const useModelStore = defineStore({
  id: "model",
  state: () => ({
    modelSelect: Array.from({ length: 8 }, (): ProductOrder[] => []),
    prices: Array.from({ length: 8 }, (): number[] => []),
    orders: Array.from({ length: 8 }, (): (ProductOrder | ProductOrder[])[] => []),
    totalPrice: 0 as number,
    totalOrder: [] as ProductOrder[],
    armsCount: 1 as number
  }),
  actions: {
    setArmsCount(count: number): void {
      this.armsCount = count
    },
    resetCategory(categoryIndex: number): void {
      this.modelSelect[categoryIndex] = []
      this.prices[categoryIndex] = []
      this.orders[categoryIndex] = []
    },
    updatePrices(categoryID: number, numberOfProduct: number): void {
      let total = 0;
      const endPrice = this.modelSelect[categoryID].slice(-1)[0].price;
      this.prices[categoryID].push(+endPrice * numberOfProduct);
      if (this.prices[categoryID].length > 1) {
        this.prices[categoryID].splice(0, this.prices[categoryID].length - 1);
      }
      this.prices.forEach((category) => {
        category.forEach((product) => { total += product; });
      });
      this.totalPrice = total;
    },
    updateOrder(categoryID: number, numberOfProduct: number): void {
      let total: ProductOrder[] = [];
      const endOrder = this.modelSelect[categoryID].slice(-1)[0];
      if (numberOfProduct > 1) {
        const multiPushArray: ProductOrder[] = [];
        for (let i = 0; i < numberOfProduct; i++) {
          multiPushArray.push({ ...endOrder });
        }
        this.orders[categoryID].push(multiPushArray);
      } else {
        this.orders[categoryID].push(endOrder);
      }
      if (this.orders[categoryID].length > 1) {
        this.orders[categoryID].splice(0, this.orders[categoryID].length - 1);
      }
      this.orders.forEach((category) => {
        category.forEach((order) => {
          if (Array.isArray(order)) {
            order.forEach((item) => total.push(item));
          } else {
            total.push(order);
          }
        });
      });
      this.totalOrder = total;
    },
  },
});
