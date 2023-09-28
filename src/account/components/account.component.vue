<script>
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import notLoggedInComponent from "@/account/components/not-logged-in.component.vue";
export default {
  components: {notLoggedInComponent},
  methods: {
    getUserInfo(newUserInfo){
      if(newUserInfo !== undefined && newUserInfo !== null && newUserInfo){
        this.userInfo = newUserInfo;
        if(this.userInfo.personal.genre){
          this.welcomeText = "Bienvenido"
        }
        else{
          this.welcomeText = "Bienvenida"
        }
        if(!this.isUserLogged) this.isUserLogged=true;
      }
      else{
        if(this.isUserLogged) this.isUserLogged=false;
      }
    },
    getMode(newDarkMode){
      this.isDarkMode = newDarkMode;
      this.currentMode = stylesService.methods.getCurrentMode();
    },
  },
  data() {
    return {
      userInfo: null,
      isDarkMode: false,
      currentMode: "light",
      isUserLogged: false,
      welcomeText: "Bienvenido",
    };
  },
  created() {
    this.userInfo = accountService.methods.watchUser(this.getUserInfo)
    this.isUserLogged = !!this.userInfo;
    stylesService.methods.watchDarkMode(this.getMode);
  },
}
</script>

<template>
  <div class="account flex flex-col" v-if="this.isUserLogged">
    <pv-avatar :image="`/images/profile/${userInfo.imageName}`" class="mr-2" alt="Usuario.png" id="main-profile-avatar"/>
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
            <div v-if="this.userInfo.shipping.address">
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
            </div>
            <div v-else>
              <div class="flex-row flex-justify-content gap-1">
                <div class="main-text">Direccion:</div>
                <div class="text">Registrar su dirección</div>
              </div>
            </div>
            <div v-if="userInfo.payment.paymentMethod && userInfo.payment.MethodData">
              <div class="flex-row flex-justify-content gap-1">
                <div class="main-text">Metodo de Pago:</div>
                <div class="text">{{this.userInfo.payment.paymentMethod}}</div>
              </div>
              <div class="flex-row flex-justify-content gap-1">
                <div class="main-text">{{this.userInfo.payment.paymentMethod}}:</div>
                <div class="text">{{this.userInfo.payment.MethodData.name}}</div>
              </div>
            </div>
            <div v-else>
              <div class="flex-row flex-justify-content gap-1">
                <div class="main-text">Metodo de Pago:</div>
                <div class="text">Seleccionar</div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

  </div>
  <notLoggedInComponent v-else/>
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
</style>