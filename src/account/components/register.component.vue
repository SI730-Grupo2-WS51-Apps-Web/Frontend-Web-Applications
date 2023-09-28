<script>
import {genres, userTemplate, validateNewEmailAndPassword, validatePersonalInformation} from "@/account/services/register-validator.service";
import accountCacheService from "@/account/services/account-cache.service";
export default {
  data(){
    return{
      registerData: userTemplate,
      errorMessage: "",
      completedPhases: [false, false],
      completedPercentage: 0,
      repeatedPassword: "",
      progressBarMode: 'determinate',
      genres: genres,
    }
  },
  methods:{
    indeterminateProgressbar(){
      this.progressBarMode = 'indeterminate';
    },
    determinateProgressbar(){
      this.progressBarMode = 'determinate';
    },
    tryContinue(){
      let i = 0;
      for (;i < this.completedPhases.length; i++){
        if(!this.completedPhases[i]) {
          break;
        }
      }
      this.indeterminateProgressbar();
      switch (i){
        case 0:
          validateNewEmailAndPassword(this.registerData, this.repeatedPassword)
              .then((response)=>{
                this.errorMessage = response;
                if(!this.errorMessage) this.completedPhases[i] = true;
                this.determinateProgressbar();
                this.updateProgress();
              });
          break;
        case 1:
          validatePersonalInformation(this.registerData)
              .then((response)=>{
                this.errorMessage = response;
                if(!this.errorMessage) this.completedPhases[i] = true;
                this.determinateProgressbar();
                this.updateProgress();
              });
          break;
      }
    },
    updateProgress(){
      let completed = 0;
      for (let i = 0; i < this.completedPhases.length; i++){
        if(this.completedPhases[i]) completed++;
      }
      this.completedPercentage = completed*100/this.completedPhases.length;
      //Reviso 99 y no 100 por la precision que puede tener float
      if(completed === this.completedPhases.length){
        this.indeterminateProgressbar();
        accountCacheService.methods.register(this.registerData)
            .then((response)=>{
              console.log(response)
              this.$emit("register_success");
            })
            .catch((error)=>{
              this.tryBack();
              console.log(error)
              this.$emit("register_error",error);
            })

      }
    },
    tryBack(){

      for (let i = (this.completedPhases.length - 1); 0<=i; i--){
        if(this.completedPhases[i]) {
          this.completedPhases[i] = false;
          break;
        }
      }
      this.updateProgress();
    }

  },
  watch: {
    "registerData.personal.genre":{
      handle(newValue, oldValue){
        console.log(this.registerData.personal.genre);
      },
      immediate: true,
    }
  }
}
</script>

<template>
  <div class="medium-margin flex flex-col align-center">
    <div class="text-10 little-margin">{{(completedPercentage === 100)?"Registrando...":"Regístrate"}}</div>
    <pv-progress-bar :value="completedPercentage" style="width: 24rem" :mode="progressBarMode">
      &nbsp;
    </pv-progress-bar>
  </div>
  <div class="flex align-center flex-col">
      <div class="flex flex-col login gap-1" v-if="completedPhases[0] === false">
        <pv-input-text v-model="registerData.login.email" placeholder="correo"/>
        <pv-password v-model="registerData.login.password" placeholder="contraseña" toggleMask :feedback="false"/>
        <pv-password v-model="repeatedPassword" placeholder="repita la contraseña" toggleMask :feedback="false"/>
        <small class="p-error text" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>
      <div class="flex flex-col login gap-1" v-else-if="completedPhases[1] === false">
        <pv-input-text v-model="registerData.personal.firstName" placeholder="nombres"/>
        <pv-input-text v-model="registerData.personal.lastName" placeholder="apellidos"/>
        <pv-input-number v-model="registerData.personal.phone" inputMode="numeric" mode="decimal" :min="900000000" :max="999999999" placeholder="telefono" :use-grouping="false"/>
        <pv-dropdown v-model="registerData.personal.genre" :options="genres" optionLabel="name" option-value="value" placeholder="Elija su sexo"></pv-dropdown>
        <small class="p-error text" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>
      <div class="flex flex-row login gap-2" v-if="completedPercentage < 100" style="padding-top:0.5rem">
        <pv-button v-if="completedPercentage !== 0" label="Volver" size="large" severity="secondary" outlined rounded @click="tryBack"/>
        <pv-button label="Continuar" size="large" severity="secondary" rounded @click="tryContinue"/>
      </div>
  </div>
</template>

<style>

</style>