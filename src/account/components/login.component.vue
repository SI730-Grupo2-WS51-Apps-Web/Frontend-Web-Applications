<script>
import accountService from "@/account/services/account-cache.service";
import {isLoginWrong} from "@/account/services/login-validator.service";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailFailed: false,
      passwordFailed: false,
      errorMessage: "",
      buttonStatus: "secondary",
    }
  },
  methods:{
    tryLogin() {
      accountService.methods.logIn(this.email, this.password)
          .then((response)=>{
            if(response === false){
              this.passwordFailed = true;
              this.emailFailed = true;
              this.errorMessage = "El usuario o la contraseña son incorrectos";
            }
            else{
              this.$emit("logged")
            }
          })
          .catch((error)=>{
            this.passwordFailed = true;
            this.emailFailed = true;
            this.errorMessage = "El usuario o la contraseña son incorrectos";
          })
    }
  },
  watch:{
    email:{
      handler(newEmail,oldEmail){
        this.passwordFailed = false;
        this.errorMessage = isLoginWrong(newEmail, this.password);
        if(newEmail && this.password && this.errorMessage){
          this.emailFailed = true;
        }
        else{
          this.emailFailed = false;
          if(!newEmail && !this.password) this.errorMessage = "";
        }
      },
      immediate: true,
    },
    password:{
      handler(newPassword,oldPassword){
        this.errorMessage = isLoginWrong(this.email, newPassword);
        if(!this.email && !newPassword) this.errorMessage = "";
      },
      immediate: true,
    }
  }
}
</script>

<template>
  <div class="flex flex-col login gap-1">
      <div class="text-10 medium-margin">Iniciar Sesión</div>
      <pv-input-text ref="emailInput" v-model="email" :class="{'p-invalid':emailFailed}" placeholder="correo" @keydown.enter="tryLogin"/>
      <pv-password ref="passwordInput" v-model="password" :class="{'p-invalid':passwordFailed}"  placeholder="contraseña" toggleMask :feedback="false" @keydown.enter="tryLogin"/>
      <router-link to="/register" id="link">¿No tienes una cuenta?</router-link>
      <small class="p-error text" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      <pv-button label="Iniciar Sesión" :severity="buttonStatus" size="large" rounded @click="tryLogin" :disabled="errorMessage"/>
  </div>
</template>

<style>

</style>