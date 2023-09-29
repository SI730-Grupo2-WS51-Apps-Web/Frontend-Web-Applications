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
    },
    register_error(error){
      this.$toast.add({severity:'error', summary:'Ocurrio un error al registrar la cuenta',detail: error, life: 5000})
    },
    register_success(){
      this.$toast.add({severity:'success', summary:'La cuenta se registró con éxito', life: 5000})
      this.logged();
    }
  },
  created() {
    this.userInfo = accountService.methods.watchUser((newUserInfo)=>{this.userInfo = newUserInfo})
  }
}
</script>

<template>
  <div id="app">
    <header>
      <navbarComponent @logo="logoClicked" @cart="cartClicked" @user="userClicked" @search="search" @product="showProduct"/>
      <profileMiniComponent :open-clicked="littleProfileOpened" @account="myAccount" @orders="myAccount" @logout="logOut" @closed="littleProfileClosed"/>
      <pv-toast/>
    </header>
    <main>
      <pv-scroll-top />
      <div class="header-area"/>
      <div class="content-margin">
        <RouterView @logged="logged" @register_error="register_error" @register_success="register_success"/>
      </div>
    </main>
    <footer>
      <footer-component/>
    </footer>
  </div>
</template>

<style scoped>
#app{
  min-height: 100vh;
  display:flex;
  flex-direction: column;
  vertical-align: center;
}
header div{
  flex-wrap: nowrap;
}
main{
  margin: 10px;
  margin-top: auto;
}
footer{
  margin-top: auto;
}
</style>