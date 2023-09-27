<script>
import { RouterLink } from 'vue-router';
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import {getUserImageByUser} from "@/shared/services/image.service";

export default {
  methods: {
    getUserInfo(newUserInfo){
      if(newUserInfo){
        this.userInfo = newUserInfo;
        if(this.userInfo.personal.genre){
          this.welcomeText = "Bienvenido"
        }
        else{
          this.welcomeText = "Bienvenida"
        }
        this.updateImage();
      }
      else{
        this.isOpen=false;
      }
    },
    getMode(newDarkMode){
      this.isDarkMode = newDarkMode;
      this.currentMode = stylesService.methods.getCurrentMode();
    },
    updateImage(){
      getUserImageByUser(this.userInfo)
          .then((response)=>{this.profilePhoto = response; console.log("imagen del miniperfil actualizada")})
          .catch((error)=>{console.log(error)})
      ;
    },
    accountClicked(){
      this.$emit("account");
    },
    ordersClicked(){
      this.$emit("orders");
    },
    logoutClicked(){
      this.$emit("logout");
    },
  },
  props: {
    openClicked: {
      type:Boolean,
      required: true,
    }
  },
  data() {
    return {
      userInfo: null,
      isDarkMode: false,
      currentMode: "light",
      profilePhoto:"default.png",
      isOpen: false,
      welcomeText: "Bienvenido",
    };
  },
  created() {
    this.userInfo = accountService.methods.watchUser(this.getUserInfo)
    this.updateImage();
    stylesService.methods.watchDarkMode(this.getMode);
  },
  watch: {
    openClicked:{
      handler(newOpenClicked, oldOpenClicked){
        if (newOpenClicked) {
          this.isOpen = true;
        }

      },
      immediate: true,
    },
    isOpen:{
      handler(newIsOpen, oldIsOpen){
        if(!newIsOpen){
          this.$emit("closed");
        }
      }
    }
  }
}
</script>

<template>
  <pv-dialog v-model:visible="isOpen" :style="{ width: '24rem', borderRadius:'4rem' }" position="right" :modal="true" :draggable="false" id="radius">
    <template #header></template>
    <template #default>
      <div class="flex flex-col">
        <pv-avatar :image="`public/images/profile/${userInfo.image}`" class="mr-2" alt="Usuario.png" id="mini-profile-avatar"/>
        <div id="welcomeText" style="margin: 2px">{{welcomeText}}</div>
        <div id="userText" style="margin: 2px">{{this.userInfo.personal.firstName}}</div>
        <div class="flex flex-col align-left">
          <div class="flex flex-row" @click="accountClicked">
            <img :src="`/images/account-actions/${currentMode}/profile.svg`" width="30" height="30">
            <div class="little-profile-text padding-width-1">Mi Cuenta</div>
          </div>
          <div class="flex flex-row" @click="ordersClicked">
            <img :src="`/images/account-actions/${currentMode}/orders.svg`" width="30" height="30">
            <div class="little-profile-text padding-width-1">Mis Pedidos</div>
          </div>
          <div class="flex flex-row" @click="logoutClicked">
            <img :src="`/images/account-actions/${currentMode}/exit.svg`" width="30" height="30">
            <div class="little-profile-text padding-width-1">Cerrar Sesion</div>
          </div>
        </div>
        <!--
        <pv-button label="No" icon="pi pi-times" @click="visible = false" text />
        <pv-button label="Yes" icon="pi pi-check" @click="visible = false" autofocus />
        -->
      </div>
    </template>

    <template #footer />
  </pv-dialog>
</template>

<style>
  #mini-profile-avatar {
    height: 17rem;
    width: 17rem;
    border-radius: 2rem;
  }
  #mini-profile-avatar img{
    height: 17rem;
    width: 17rem;
    border-radius: 2rem;
  }
  #radius .p-dialog-header{
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    padding: 2rem 2rem 0;
  }
  #radius .p-dialog-footer{
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
  #userText{
    color: var(--akira-red);
    font-family: JAPANBRUSH,serif;
    font-size: 3.2rem;
  }
  #welcomeText{
    font-size: 2.5rem;
  }
  .little-profile-text{
    font-size: 1.6rem;
  }
</style>