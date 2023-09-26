<script>
import { RouterLink, RouterView } from 'vue-router';
import navbarComponent from "@/public/components/navbar.component.vue";
import footerComponent from "@/public/components/footer.component.vue";
import profileMiniComponent from "@/account/components/profile-mini.component.vue";
import accountService from "@/account/services/account.service";
export default {
  components:{
    navbarComponent,
    footerComponent,
    profileMiniComponent,

    RouterLink,
    RouterView,
  },
  data(){
    return{
      littleProfileOpened: false,
    }
  },
  methods:{
    userClicked(){
      console.log("user");
      this.littleProfileOpened = !this.littleProfileOpened;
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
    },
    myAccount(){

    },
    logOut(){
      accountService.logout();
    }
  }
}
</script>

<template>
    <header>
      <navbarComponent @logo="logoClicked" @cart="cartClicked" @user="userClicked" @search="search" @product="showProduct"/>
      <profileMiniComponent :open-clicked="littleProfileOpened" @account="myAccount" @orders="myAccount" @logout="logout"/>
    </header>
    <main>
      <ScrollTop />
      <div class="wrapper">
        <div class="header-area"/>
        <RouterView />
      </div>
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
