<script>
import { RouterLink, RouterView } from 'vue-router';
import navbarComponent from "@/public/components/navbar.component.vue";
import footerComponent from "@/public/components/footer.component.vue";
export default {
  components:{
    navbarComponent,
    footerComponent,
    RouterLink,
    RouterView,
  },
  data(){
    return{}
  },
  methods:{
    userClicked(){
      console.log("user");
    },
    logoClicked() {
      console.log("logo");
    },
    cartClicked(){
      console.log("cart");
    },
    search(data){
      console.log("searching ", data);
    },
    showProduct(data){
      console.log("showing ",data)
    }
  }
}
</script>

<template>
    <header>
      <navbarComponent @logo="logoClicked" @cart="cartClicked" @user="userClicked" @search="search" @product="showProduct"/>
      <ScrollTop />
    </header>
    <main>

      <RouterView />
    </main>
    <footer>
      <footer-component/>
    </footer>


</template>

<style scoped>
main{
  margin: 10px;
}
</style>
