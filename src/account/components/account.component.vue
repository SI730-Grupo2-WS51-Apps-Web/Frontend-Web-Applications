<script>
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import {getUserImageByUser} from "@/shared/services/image.service";

export default {
  methods: {
    getUserInfo(newUserInfo){
      console.log(newUserInfo)
      if(newUserInfo !== undefined && newUserInfo !== null && newUserInfo){
        this.userInfo = newUserInfo;
        if(this.userInfo.personal.genre){
          this.welcomeText = "Bienvenido"
        }
        else{
          this.welcomeText = "Bienvenida"
        }
        if(!this.isUserLogged) this.isUserLogged=true;
        this.updateImage();
      }
      else{
        if(this.isUserLogged) this.isUserLogged=false;
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
      isUserLogged: false,
      welcomeText: "Bienvenido",
    };
  },
  created() {
    this.userInfo = accountService.methods.watchUser(this.getUserInfo)
    this.isUserLogged = !!this.userInfo;
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
  }
}
</script>

<template>
  <div class="account flex flex-col" v-if="this.isUserLogged">
    <pv-avatar :image="`public/images/profile/${userInfo.image}.png`" class="mr-2" alt="Usuario.png" id="main-profile-avatar"/>
    <div class="flex flex-row welcome-content text">
      <div id="accountWelcomeText">{{welcomeText}},</div>
      <div id="accountUserText">{{this.userInfo.personal.firstName}}</div>
    </div>
    <div class="little-margin"/>
    <div class="flex flex-row gap-8">
      <pv-card class="profile-data-card little-margin">
        <template #title><div class="align-center text-4"> Información Personal: </div></template>
        <template #content>
          <div class="text-1 little-margin-width">
            <div class="flex-row flex-justify-content gap-1">
                <div class="main-text">Nombre:</div>
                <div class="text">{{this.userInfo.personal.firstName + " " + this.userInfo.personal.lastName}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Sexo:</div>
              <div class="text">{{this.userInfo.personal.genre?"Masculino":"Femenino"}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Telefono:</div>
              <div class="text">{{this.userInfo.personal.phone}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Correo:</div>
              <div class="text">{{this.userInfo.login.email}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Contraseña:</div>
              <div class="text">{{this.userInfo.login.password}}</div>
            </div>
          </div>
        </template>
      </pv-card>
      <pv-card class="profile-data-card little-margin">
        <template #title><div class="align-center text-4"> Información de Compras: </div></template>
        <template #content>
          <div class="text-1 little-margin-width">
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Direccion:</div>
              <div class="text">{{this.userInfo.shipping.address}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Distrito:</div>
              <div class="text">{{this.userInfo.shipping.district}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Provincia:</div>
              <div class="text">{{this.userInfo.shipping.province}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">Metodo de Pago:</div>
              <div class="text">{{this.userInfo.payment.paymentMethod}}</div>
            </div>
            <div class="flex-row flex-justify-content gap-1">
              <div class="main-text">{{this.userInfo.payment.paymentMethod}}:</div>
              <div class="text">{{this.userInfo.payment.MethodData.name}}</div>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

  </div>
  <div class="account flex flex-col text" v-else>
    <pv-avatar image="images/characters/astronaut_not_here.png" class="mr-2" alt="No deberías estar aquí..." id="not-logged-avatar"/>
    <div>Hmp... Parece que no debería estar aquí todavía...</div>
    <div>Quizá deberías tratar de <router-link to="login" id="link">iniciar sesión</router-link> primero</div>
  </div>
</template>

<style>
.welcome-content{
  align-items: flex-start;
  align-content: flex-start;
}
#accountUserText{
  padding-left: 1rem;
  padding-top: 0.5rem;
  color: var(--akira-red);
  font-family: JAPANBRUSH,serif;
  font-size: 3.2rem;
}
#accountWelcomeText{
  font-size: 2.5rem;
}
#main-profile-avatar {
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
#main-profile-avatar img{
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
#not-logged-avatar {
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
#not-logged-avatar img{
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
</style>