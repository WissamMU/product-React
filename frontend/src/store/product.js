// Import Zustand for state management
import { create } from 'zustand';

// Create a Zustand store for product management
export const useProductStore = create((set) => ({
  // Initial state: empty products array
  products: [],

  // Action to directly set products (useful for initial loading)
  setProducts: (products) => set({ products }),

  // Async action to create a new product
  createProduct: async (newProduct) => {
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
  }
}));