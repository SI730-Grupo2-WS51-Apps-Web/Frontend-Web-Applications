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
  },
  data() {
    return {
      editDialogOpened: false,
      userInfo: null,
      isDarkMode: false,
      currentMode: "light",
      isUserLogged: false,
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
  <div class="account flex flex-col" v-if="this.isUserLogged">
    <pv-image :src="`/images/account-actions/${this.currentMode}/edit.svg`" alt="Edit" id="edit-logo" @click="editDialogOpened = true"/>
    <pv-avatar :image="`/images/profile/${userInfo.imageName}`" class="mr-2" alt="Foto de Perfil" id="main-profile-avatar"/>
    <div class="flex flex-row welcome-content text">
      <div id="accountWelcomeText">{{this.userInfo.personal.genre?"Bienvenido":"Bienvenida"}},</div>
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
                <RouterLink id="link" to="/edit/directions">Registrar su dirección</RouterLink>
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
  <pv-dialog v-model:visible="editDialogOpened" modal header="Editar Datos">
    <div class="flex flex-col gap-2">
      <RouterLink to="/edit/personal">
        <pv-button label="Editar Datos Personales" icon="pi pi-user" v-tooltip="{ value:`<div class='flex flex-row'>
            <div class='pi pi-exclamation-triangle'/> Advertencia <div class='pi pi-exclamation-triangle'/>:
            </div>
            <p style='font-size: 0.8rem'>Este cambio se aplicara a todos los pedidos que ya hallan sido realizados
            Los pedidos solo podrán ser recibidos por la persona que tenga el nombre que ha insertado
            Al entregar el pedido, se llamará al nuevo número de telefono que registre
            </p>`,
            escape: true, class:'custom-error'}"
        />
      </RouterLink>
      <RouterLink to="/edit/directions">
        <pv-button label="Editar Dirección Actual" icon="pi pi-building" v-tooltip="{ value:`<div class='flex flex-row'>
            <div class='pi pi-exclamation-triangle'/> Advertencia <div class='pi pi-exclamation-triangle'/>:
            </div>
            <p style='font-size: 0.8rem'>Este cambio se aplicara solo a los futuros pedidos que hagas
            Los pedidos que ya hallas realizado no cambiarán su dirección de envío
            Los próximos pedidos que hagas tendrán como dirección de envío esta nueva dirección
            </p>`,
            escape: true, class:'custom-error'}"
        />
      </RouterLink>
      <RouterLink to="/edit/payment">
        <pv-button label="Editar Metodo de Pago" icon="pi pi-credit-card" v-tooltip="{ value:`<div class='flex flex-row'>
            <div class='pi pi-exclamation-triangle'/> Advertencia <div class='pi pi-exclamation-triangle'/>:
            </div>
            <p style='font-size: 0.8rem'>Este cambio se aplicara solo a los futuros pedidos que hagas
            Los pedidos que ya hallas realizado no cambiarán su dirección de envío
            Los próximos pedidos que hagas tendrán como dirección de envío esta nueva dirección
            </p>`,
            escape: true, class:'custom-error'}"
        />
      </RouterLink>
    </div>
  </pv-dialog>
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
#edit-logo{
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: 5rem;
  top: 11.5rem;
}
</style>