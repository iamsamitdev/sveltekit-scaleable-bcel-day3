import { apiService } from "$lib/services"
import type { Product, ProductResponse } from "$lib/types/product"

class ProductService {
  // Fetch all products with optional filters
  async getProducts(page = 1, search = "", limit = 10, signal?: AbortSignal) {
    try {
      let endpoint = `/products?page=${page}&limit=${limit}`

      if (search.trim()) {
        endpoint += `&search=${encodeURIComponent(search.trim())}`
      }

      console.log("ProductService: Making API call to", endpoint)
      const response = await apiService.get<ProductResponse>(endpoint, { signal })
      console.log("ProductService: API response", response)

      if (response.success) {
        return response.data
      } else {
        console.error("ProductService: API returned error", response.error)
        return {
          status: false,
          total: 0,
          products: [],
          message: response.error || "Failed to fetch products",
        }
      }
    } catch (error) {
      console.error("ProductService: Exception in getProducts:", error)
      return {
        status: false,
        total: 0,
        products: [],
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Get single product by ID
  async getProduct(id: number, signal?: AbortSignal) {
    try {
      const response = await apiService.get<{
        status: boolean
        product: Product
      }>(`/products/${id}`, { signal })
      return response.data
    } catch (error) {
      console.error("Error fetching product:", error)
      throw error
    }
  }

  // Create new product
  async createProduct(productData: Partial<Product> | FormData) {
    try {
      const response = await apiService.post<{
        status: boolean
        product: Product
      }>("/products", productData)
      return response.data
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  }

  // Update product
  async updateProduct(id: number, productData: Partial<Product> | FormData) {
    try {
      // ถ้าเป็น FormData ให้ใช้ method override เพื่อรองรับ multipart/form-data
      if (typeof FormData !== 'undefined' && productData instanceof FormData) {
        if (!productData.has('_method')) productData.append('_method', 'PUT')
        const response = await apiService.post<{
          status: boolean
          product: Product
        }>(`/products/${id}`, productData)
        return response.data
      }
      const response = await apiService.put<{
        status: boolean
        product: Product
      }>(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  // Delete product
  async deleteProduct(id: number) {
    try {
      const response = await apiService.delete<{
        status: boolean
        message: string
      }>(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }
}

export const productService = new ProductService()
