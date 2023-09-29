<script>
import ProductsService from "/public/data/db.json";
import router from "@/router/index.js"; 

export default {
  data() {
    return {
      Products: [],
      Categories: [],
      Product_id: -1
    };
  },
  mounted() {
    
    this.Products = ProductsService.products;
    this.Categories = ProductsService.category;
  },
  methods: {
    redirectToProduct(productId) {
      
      router.push({ name: "product", params: { id: productId } });
    },
    getCategoryById(categoryId) {
      const category = this.Categories.find(c => c.id === categoryId);
      return category ? category.name : '';
    },
    getFranchiseById(categoryId) {
      const franchise = this.Categories.find(c => c.id === categoryId);
      return franchise ? franchise.name : '';
    }
  }
};
</script>

<template>
  <div class="product-grid">
    <div v-for="(product, index) in Products" :key="product.id" class="product-card">
      <pv-card @click="redirectToProduct(product.id)">
        <template #content>
          <div>
            <pv-image :src="product.image" :alt="product.name" width="250" preview />
          </div>
          <div>
            <h2>{{ product.name }}</h2>
            <p>Categoría: {{ getCategoryById(product.category) }}</p>
            <p style="color: #33FF77;">Disponible</p>
            <p>Precio: {{ product.price }} Soles</p>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Columnas de 250px mínimo */
  gap: 16px; /* Espacio entre las tarjetas */
}

.product-card {
  border: 1px; /* Un borde para cada tarjeta (puedes personalizarlo) */
  padding: 16px; /* Espacio interior de cada tarjeta (puedes personalizarlo) */
}
</style>