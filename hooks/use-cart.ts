import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';
import { toast } from 'react-hot-toast';

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  decrementItem: (id: string) => void;
  setItem: (items: Product[]) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (item: Product) => {
      const currentItems = get().items;
      console.log(currentItems)
      const existingItem = currentItems.find((i) => i.id === item.id);

      // if (existingItem) {
      //   return toast("Item already in cart")
      // }

      set({ items: [...get().items, item] });
    },
    removeItem: (id: string) => {
      set({items: [...get().items.filter((item) => item.id !== id)]})
      toast.success("Item removed from cart")
    },
    removeAll: () => {
      set({items: []})
    },
    decrementItem: (id: string) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((i) => i.id === id);

      if (existingItem) {
        set({items: [...get().items.filter((item) => item.id !== id)]})
        toast.success("Item removed from cart")
      }
    },
    setItem: (newItems: Product[]) => {
      set({ items: newItems });
      toast.success("Cart items updated");
    },
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart;