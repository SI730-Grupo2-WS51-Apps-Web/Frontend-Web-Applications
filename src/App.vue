<script>
import { RouterLink, RouterView } from 'vue-router';
import navbarComponent from "@/public/components/navbar.component.vue";
import footerComponent from "@/public/components/footer.component.vue";
import profileMiniComponent from "@/account/components/profile-mini.component.vue";
import accountService from "@/account/services/account-cache.service";
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
      userInfo: undefined,
    }
  },
  methods:{
    userClicked(){
      if(this.userInfo){
        console.log("El menu del perfil fue abierto");
        this.littleProfileOpened = true;
      }
      else{
        console.log("El usuario necesita iniciar sesion para abrir el perfil");
        this.$router.push("/login");
      }
    },
    logoClicked() {
      this.$router.push("/");
      console.log("logo");
    },
    cartClicked(){
      console.log("cart");
    },
    littleProfileClosed(){
      console.log("El menu del perfil fue cerrado");
      this.littleProfileOpened =false;
    },
    search(data){
      console.log("searching ", data);
    },
    showProduct(data){
      console.log("showing ",data)
    },
    myAccount(){
      console.log("my account")
    },
    logOut(){
      console.log("loggin out...")
      accountService.methods.logOut();
    },
    logged(){
      this.$router.push("/account");
    }
  },
  created() {
    this.userInfo = accountService.methods.watchUser((newUserInfo)=>{this.userInfo = newUserInfo})
  }
}
</script>

<template>
    <header>
      <navbarComponent @logo="logoClicked" @cart="cartClicked" @user="userClicked" @search="search" @product="showProduct"/>
      <profileMiniComponent :open-clicked="littleProfileOpened" @account="myAccount" @orders="myAccount" @logout="logOut" @closed="littleProfileClosed"/>
    </header>
    <main>
      <pv-scroll-top />
      <div class="header-area"/>
      <div class="content-margin">
        <RouterView @logged="logged"/>
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
.content-margin{
  padding: 5rem;
}
</style>
