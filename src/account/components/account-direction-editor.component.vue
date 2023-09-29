<script>
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import notLoggedInComponent from "@/account/components/not-logged-in.component.vue";
import {validateDirection} from "@/account/services/account-direction-validator.service";
import {getDepartmentsData, getProvincesData, getDistrictsData } from "@/account/services/regional-information.service"

export default {
  components: {notLoggedInComponent},
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
    getMode(newDarkMode){
      this.isDarkMode = newDarkMode;
      this.currentMode = stylesService.methods.getCurrentMode();
    },
    tryEditDirection(){
      this.errorMessage = true;
      this.errorMessage = validateDirection(this.newAddress, this.selectedDepartment, this.selectedProvince, this.selectedDistrict);
      if(!this.errorMessage){
        accountService.methods.updateDirection(this.newAddress, this.selectedDepartment, this.selectedProvince, this.selectedDistrict)
            .then((response)=>{
              this.$emit("logged")
            })
      }
    },
    getDepartments(){
      this.departments = []
      getDepartmentsData()
          .then((response)=>{
            this.departments = response;
          })
          .catch((error)=>{
            console.log(error)
          })
    },
    getProvinces(){
      this.provinces = []
      getProvincesData(this.selectedDepartment)
          .then((response)=>{
            this.provinces = response;
          })
          .catch((error)=>{
            console.log(error)
          })
    },
    getDistricts(){
      this.districts = []
      getDistrictsData(this.selectedProvince)
          .then((response)=>{
            this.districts = response;
          })
          .catch((error)=>{
            console.log(error)
          })
    },
  },
  data() {
    return {
      departments: [],
      selectedDepartment: null,
      provinces: [],
      selectedProvince: null,
      districts: [],
      selectedDistrict: null,
      newAddress: null,

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
    this.getDepartments();
  },
}
</script>

<template>

  <div v-if="isUserLogged && errorMessage !== true">
    <div class="medium-margin flex flex-col align-center">
      <div class="text-10 little-margin">{{this.userInfo.shipping.district?"Actualizar Direccion":"Crear Direccion"}}</div>
    </div>
    <div class="flex align-center flex-col">
      <div class="flex flex-col login gap-1">
        <pv-input-text v-model="newAddress" placeholder="Direccion"/>
        <pv-dropdown v-model="selectedDepartment" :options="departments" optionLabel="name" option-value="id" placeholder="Elija su departamento" @change="getProvinces"></pv-dropdown>
        <pv-dropdown v-model="selectedProvince" :disabled="provinces.length === 0" :options="provinces" optionLabel="name" option-value="id" placeholder="Elija su provincia"  @change="getDistricts"></pv-dropdown>
        <pv-dropdown v-model="selectedDistrict" :disabled="districts.length === 0" :options="districts" optionLabel="name" option-value="id" placeholder="Elija su distrito"></pv-dropdown>
        <small class="p-error text" id="text-error">{{ errorMessage || ' ' }}</small>

      </div>
      <div class="flex flex-row login gap-2 medium-margin">
        <pv-button label="Cancelar" size="large" severity="secondary" outlined rounded @click="this.$emit('logged')"/>
        <pv-button :label="this.userInfo.shipping.district?'Actualizar':'Registrar'" size="large" severity="secondary" rounded @click="tryEditDirection"/>
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