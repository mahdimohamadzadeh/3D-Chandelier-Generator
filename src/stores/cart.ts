import { defineStore } from 'pinia';
import type { ShopProduct } from '@/data/shopProducts';
import type { ProductOrder } from '@/stores/models3D';

export interface CartItem {
  id: string;
  productId?: number;
  title: string;
  price: number;
  quantity: number;
  archetype: 'empire' | 'crystal' | 'candelabra' | 'gothic' | 'murano' | 'pendant';
  details?: string;
  type: 'shop_product' | 'custom_3d';
  customComponents?: ProductOrder[];
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    promoCode: '',
    discount: 0,
  }),

  getters: {
    totalItemsCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    shipping: (state): number => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (subtotal === 0) return 0;
      return subtotal >= 300 ? 0 : 29; // Free shipping over $300
    },

    tax: (state): number => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return Math.round(subtotal * 0.08); // 8% tax
    },

    grandTotal(): number {
      const discountedSubtotal = Math.max(0, this.subtotal - this.discount);
      return discountedSubtotal + this.shipping + this.tax;
    },
  },

  actions: {
    addShopProduct(product: ShopProduct, qty = 1) {
      const existing = this.items.find(
        (i) => i.type === 'shop_product' && i.productId === product.id
      );
      if (existing) {
        existing.quantity += qty;
      } else {
        this.items.push({
          id: `shop-${product.id}-${Date.now()}`,
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: qty,
          archetype: product.archetype,
          details: `${product.dimensions} • ${product.material}`,
          type: 'shop_product',
        });
      }
    },

    addCustom3DOrder(components: ProductOrder[], totalPrice: number) {
      const title = `Custom 3D Chandelier (${components.length} parts)`;
      const details = components.map((c) => c.title).join(', ');

      this.items.push({
        id: `3d-${Date.now()}`,
        title,
        price: totalPrice,
        quantity: 1,
        archetype: 'crystal',
        details: details || 'Custom modular 3D assembly',
        type: 'custom_3d',
        customComponents: [...components],
      });
    },

    updateQuantity(itemId: string, qty: number) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        if (qty <= 0) {
          this.removeItem(itemId);
        } else {
          item.quantity = qty;
        }
      }
    },

    removeItem(itemId: string) {
      this.items = this.items.filter((i) => i.id !== itemId);
    },

    applyPromoCode(code: string): boolean {
      if (code.trim().toUpperCase() === 'LUSTER10') {
        this.promoCode = 'LUSTER10';
        this.discount = Math.round(this.subtotal * 0.1);
        return true;
      }
      return false;
    },

    clearCart() {
      this.items = [];
      this.promoCode = '';
      this.discount = 0;
    },
  },
});
