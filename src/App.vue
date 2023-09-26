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
        this.littleProfileOpened = true;
      }
      else{
        this.$router.push("/login");
      }
    },
    logoClicked() {
      this.$router.push("/");
    },
    cartClicked(){
      console.log("cart");
    },
    littleProfileClosed(){
      this.littleProfileOpened =false;
    },
    search(data){
      console.log("searching ", data);
    },
    showProduct(data){
      console.log("showing ",data)
    },
    myAccount(){
      this.$router.push("/account");
      console.log("my account")
    },
    logOut(){
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
</style>
