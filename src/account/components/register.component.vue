<script>
export default {
  data(){
    return{

      loginCompleted: false,

      newUser: {
        id: Number.MAX_SAFE_INTEGER,
        image: 0,
        personal: {
          firstName: "",
          lastName: "",
          phone: 0,
        },
        login: {},
        email: "",
        password: ""
      },
    }
  }
}
</script>

<template>
  <div class="flex flex-col login gap-1" v-if="newUser.loginCompleted === false">
    <pv-input-text v-model="loginData.email" :class="{'p-invalid':emailFailed}" placeholder="correo"/>
    <pv-password v-model="password" :class="{'p-invalid':passwordFailed}"  placeholder="contraseña" toggleMask :feedback="false"/>
    <small class="p-error text" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
    <pv-button label="Iniciar Sesión" :severity="buttonStatus" size="large" rounded @click="tryLogin" :disabled="errorMessage"/>
  </div>

</template>

<style scoped>

</style>