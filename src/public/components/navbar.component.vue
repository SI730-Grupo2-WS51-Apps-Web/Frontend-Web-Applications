<script>
import { RouterLink } from 'vue-router';
import stylesService from "@/public/styles/styles.service";
import {getProductListLike} from "@/product/services/products.service";

export default {
  methods: {
    alterModeClicked() {
      stylesService.methods.alterMode();
      this.currentMode = stylesService.methods.getCurrentMode();
    },
    userClicked() {
      this.$emit('user')
    },
    cartClicked(){
      this.$emit('cart');
    },
    logoClicked(){
      this.$emit('logo');
    },
    searchBarClicked(){
      this.$emit('search', this.selectedProduct);
    },
    productSelected(){
      this.$emit('product', this.selectedProduct);
    },
    filterProducts(){
      getProductListLike(this.selectedProduct)
          .then((response)=>{
            this.productsFiltered = response;
          })
          .catch((error)=>{
            console.log("Error al obtener la lista de productos filtrados", error)
            this.productsFiltered = null;
          })
    }
  },
  data() {
    return {
      productsFiltered: null,
      selectedProduct: null,
      currentMode: stylesService.modes[stylesService.isDarkMode],
    };
  },
}
</script>


<template>
  <pv-toolbar id="mainToolbar" class="navbar">
    <template #start>
      <pv-image class="logo" src="/images/logos/main/logo.png" alt="logo" @click="logoClicked" />
    </template>
    <template #center>
      <pv-autocomplete
          v-model="selectedProduct"
          optionLabel="name"
          :suggestions="productsFiltered"
          @complete="filterProducts"
          placeholder="Busca un producto"
          forceSelection
          @keydown.enter="searchBarClicked"
          @itemSelect="productSelected"
      />
      <i class="pi pi-search" @click="searchBarClicked"/>

    </template>
    <template #end class="gap-3">
      <pv-image class="navbar-icon" :src="`/images/navbar-icons/${this.currentMode}/mode.svg`" :alt="`${this.currentMode}`" @click="alterModeClicked" />
      <pv-image class="navbar-icon" :src="`/images/navbar-icons/${this.currentMode}/cart.svg`" :alt="`${this.currentMode}`" @click="cartClicked" />
      <pv-image class="navbar-icon" :src="`/images/navbar-icons/${this.currentMode}/profile.svg`" :alt="`${this.currentMode}`" @click="userClicked" />
    </template>
  </pv-toolbar>
</template>


<style scoped>
#mainToolbar{
  width: 100%;
  outline: none;
}
</style>