// Import Zustand for state management
import { create } from 'zustand';

// Create a Zustand store for product management
export const useProductStore = create((set) => ({
  // Initial state: empty products array
  products: [],

  // Action to directly set products (useful for initial loading)
  setProducts: (products) => set({ products }),

  // Async action to create a new product
  createProducts: async (newProduct) => {
    // Validation: Check for required fields
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: 'Please fill in all fields.'
      };
    }

    try {
      // API request to create product
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct) // Convert to JSON
      });

      // Parse response
      const data = await res.json();

      // Update local state with new product
      set((state) => ({
        products: [...state.products, data.data]
      }));

      // Success response
      return {
        success: true,
        message: 'Product added successfully.'
      };

    } catch (error) {
      // Handle fetch errors
      return {
        success: false,
        message: 'Failed to add product. Please try again.'
      };
    }
  },
  // Async action to fetch a product
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({ products: data.data });
  },
  // Async action to DELETE a product
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
    return { success: true, message: data.message };
  },
  // Update existing product  
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Update local state with modified product
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product)),
    }));

    return { success: true, message: data.message };
  },
}));