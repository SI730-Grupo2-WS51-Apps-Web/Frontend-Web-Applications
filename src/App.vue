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
      userInfo: undefined,
    }
  },
  methods:{
    userClicked(){
      if(this.userInfo){
        console.log("user");
        this.littleProfileOpened = !this.littleProfileOpened;
      }
      else{
        this.$router.push("/login");
      }
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
      console.log("my account")
    },
    logOut(){
      console.log("loggin out...")
      accountService.methods.logOut();
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
      <profileMiniComponent :open-clicked="littleProfileOpened" @account="myAccount" @orders="myAccount" @logout="logOut"/>
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
