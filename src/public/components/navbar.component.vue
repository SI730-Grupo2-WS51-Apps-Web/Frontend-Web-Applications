<script>
import { RouterLink } from 'vue-router';
import stylesService from "@/public/styles/styles.service";
export default {
  methods: {
    alterModeClicked() {
      stylesService.methods.alterMode();
      console.log(stylesService.methods.getCurrentMode());
      this.currentMode = stylesService.methods.getCurrentMode();
      if(this.currentMode){
        document.body.classList.remove('dark-theme')
        document.body.classList.add('light-theme')
      }
      else{
        document.body.classList.remove('light-theme')
        document.body.classList.add('dark-theme')
      }
    },
    userClicked() {
      this.$emit('user')
    },
    cartClicked(){
      this.$emit('cart');
    },
    logoClicked(){
      this.$emit('logo');
    }
  },
  data() {
    return {
      searchText: "",
      currentMode: stylesService.modes[stylesService.isDarkMode],
    };
  },
}
</script>


<template>
  <pv-toolbar id="mainToolbar" class="navbar">
    <template #start>
      <pv-image src="/images/logos/main/logo.png" alt="logo" @click="logoClicked" />
    </template>
    <template #center>
      <span class="p-input-icon-right">
        <i class="pi pi-search" />
        <pv-input-text v-model="searchText" placeholder="Search" size="large"/>
      </span>

    </template>
    <template #end>
      <pv-image :src="`/images/navbar-icons/${this.currentMode}/mode.svg`" :alt="`${this.currentMode}`" @click="alterModeClicked" />
      <pv-image :src="`/images/navbar-icons/${this.currentMode}/cart.svg`" :alt="`${this.currentMode}`" @click="cartClicked" />
      <pv-image :src="`/images/navbar-icons/${this.currentMode}/profile.svg`" :alt="`${this.currentMode}`" @click="userClicked" />
    </template>
  </pv-toolbar>
</template>


<style scoped>
#mainToolbar{
  width: 100%;
  outline: none;
}
</style>