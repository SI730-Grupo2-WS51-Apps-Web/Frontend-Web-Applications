<script>
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import notLoggedInComponent from "@/account/components/not-logged-in.component.vue";
import {genres} from "@/account/models/user.model";
import {validatePersonalInformation} from "@/account/services/account-data-validator.service";

export default {
  components: {notLoggedInComponent, genres},
  methods: {
    getUserInfo(newUserInfo){
      if(newUserInfo !== undefined && newUserInfo !== null && newUserInfo){
        this.userInfo = newUserInfo;
        if(!this.isUserLogged) this.isUserLogged=true;
        this.currentMode = stylesService.methods.getCurrentMode()
      }
      else{
        if(this.isUserLogged) this.isUserLogged=false;
      }
    },
    tryEditPersonalData(){
      this.errorMessage = true;
      this.errorMessage = validatePersonalInformation(this.userInfo);
      if(!this.errorMessage){
        accountService.methods.updatePersonalInformation(this.userInfo)
            .then((response)=>{
              this.$emit("logged")
            })
      }
    },
    getMode(newDarkMode){
      this.isDarkMode = newDarkMode;
      this.currentMode = stylesService.methods.getCurrentMode();
    },
  },
  data() {
    return {
      genreList: genres,
      userInfo: null,
      isDarkMode: false,
      currentMode: "light",
      isUserLogged: false,
      errorMessage: "",
    };
  },
  created() {
    this.userInfo = accountService.methods.watchUser(this.getUserInfo)
    this.isUserLogged = !!this.userInfo;
    this.isDarkMode = stylesService.methods.watchDarkMode(this.getMode);
    this.currentMode = stylesService.methods.getCurrentMode();
  },
}
</script>

<template>

  <div v-if="isUserLogged && errorMessage !== true">
    <div class="medium-margin flex flex-col align-center">
      <div class="text-10 little-margin">Editar Informacion Personal</div>
    </div>
    <div class="flex align-center flex-col">
      <div class="flex flex-col login gap-1">
        <pv-input-text v-model="userInfo.personal.firstName" placeholder="Nombres"/>
        <pv-input-text v-model="userInfo.personal.lastName" placeholder="Apellidos"/>
        <pv-input-number v-model="userInfo.personal.phone" inputMode="numeric" mode="decimal" :min="900000000" :max="999999999" placeholder="Telefono" :use-grouping="false"/>
        <pv-dropdown v-model="userInfo.personal.genre" :options="genreList" optionLabel="name" option-value="value" placeholder="Elija su sexo"></pv-dropdown>
        <small class="p-error text" id="text-error">{{ errorMessage || ' ' }}</small>
      </div>
      <div class="flex flex-row login gap-2 medium-margin">
        <pv-button label="Cancelar" size="large" severity="secondary" outlined rounded @click="this.$emit('logged')"/>
        <pv-button :label="this.userInfo.shipping.district?'Actualizar':'Registrar'" size="large" severity="secondary" rounded @click="tryEditPersonalData"/>
      </div>
    </div>
  </div>
  <div v-else-if="errorMessage === true">
    <div class="medium-margin flex flex-col align-center">
      <div class="text-10 little-margin">{{this.userInfo.shipping.district?"Actualizando Direccion...":"Creando Direccion..."}}</div>
      <div class="little-margin"><pv-progress-bar style="width: 24rem" mode="indeterminate"/></div>
    </div>
  </div>
  <div v-else-if="!isUserLogged">
    <notLoggedInComponent/>
  </div>
</template>

<style>

</style>