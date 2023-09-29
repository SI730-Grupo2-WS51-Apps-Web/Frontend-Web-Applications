<script>
import ProductsService from "@/public/data/db.json";
import RouterView from "@/router/index.js";

export default {
  data() {
    return {
      Products: [],
      Categories: []
    };
  },
  mounted() {
    // Usa el JSON importado
    Products = ProductsService.products;
    Categories = ProductsService.category;
  },
  methods : {
    redirectToProduct(productId) {
      // Redirige a la página del producto utilizando el enrutador
      router.push({ name: "product", params: { id: productId } });
    }
    }
};
</script>


<template>
    <div v-for="(product, index) in Products" :key="product.id"></div>
    <pv-card @click="redirectToProduct(product.id)" >
    <template #title> Simple Card </template>
    <template #content>
        <div>
            <pv-image src="{{ Products.image }}" alt="Image" width="250" preview />
        </div>
        <div>
            <h2>{{ Products.name }}</h2>
            <p>{{ Products.category }}</p>
            <p>{{ Products.subcategory }}</p>
            <p>{{ Products.franchise}}</p>
            <p>{{ Products.price }}</p>
            
        </div>
    </template>
</pv-card>
</template>