<script>
import stylesService from "@/shared/styles/styles.service";
import accountService from "@/account/services/account-cache.service";
import notLoggedInComponent from "@/account/components/not-logged-in.component.vue";
import {paymentMethods} from "@/account/models/user.model.js";
import {validatePaymentData} from "@/payment/services/payment-data-validator.service";
import {getWalletsData} from "@/payment/services/digital-wallets.service";

export default {
  components: {notLoggedInComponent, paymentMethods},
  methods: {
    getUserInfo(newUserInfo){
      if(newUserInfo !== undefined && newUserInfo !== null && newUserInfo){
        this.userInfo = newUserInfo;
        this.originalUserInfo = newUserInfo;
        if(!this.isUserLogged) this.isUserLogged=true;
        this.currentMode = stylesService.methods.getCurrentMode()
      }
      else{
        if(this.isUserLogged) this.isUserLogged=false;
      }
    },
    tryEditPaymentData(){
      this.errorMessage = true;
      let toBeSent = this.userInfo;
      toBeSent.payment.selectedMethod = paymentMethods[this.userInfo.payment.selectedMethod];
      console.log(toBeSent.payment.selectedMethod)
      toBeSent.payment.card.number=toBeSent.payment.card.number.replaceAll(" ", "").replaceAll("-", "  ")
      this.errorMessage = validatePaymentData(toBeSent);
      if(!this.errorMessage){
        accountService.methods.updatePaymentInformation(toBeSent)
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
      myPaymentMethods: Object.keys(paymentMethods),
      userInfo: null,
      originalUserInfo: null,
      isDarkMode: false,
      currentMode: "light",
      isUserLogged: false,
      errorMessage: "",
      walletsData: [],
    };
  },
  created() {
    this.userInfo = accountService.methods.watchUser(this.getUserInfo)
    this.originalUserInfo = this.userInfo;
    this.isUserLogged = !!this.userInfo;
    this.isDarkMode = stylesService.methods.watchDarkMode(this.getMode);
    this.currentMode = stylesService.methods.getCurrentMode();
  },
  watch: {
    "userInfo.payment.card.month": {
      handler(newv){
        if(newv > 12) this.userInfo.payment.card.month = null;
      },
      immediate: true,
    },
    "userInfo.payment.selectedMethod": {
      handler(newv){
        if(this.userInfo !== null) console.log(this.myPaymentMethods.indexOf(this.userInfo.payment.selectedMethod))

        if(paymentMethods[newv] === 2 && this.walletsData.length === 0){
          console.log("Cargando datos...")
          getWalletsData()
              .then((response)=>{
                this.walletsData = response;
                console.log(this.walletsData)
              })
              .catch((error)=>{
                console.log(error)
              })
        }
      },
      immediate: true,
    }
  }
}
</script>

<template>
    <div v-if="isUserLogged && (errorMessage !== true)">
        <div class="medium-margin flex flex-col align-center">
            <div class="text-10 little-margin">Editar Informacion de Pago</div>
        </div>
        <div class="flex align-center flex-col gap-1 little-margin">
            <div>Elije un Método de Pago</div>
            <pv-select-button v-model="userInfo.payment.selectedMethod" :options="myPaymentMethods"/>
        </div>
        <div class="flex align-center flex-col little-margin">
            <div class="flex flex-col gap-1" v-if="myPaymentMethods.indexOf(userInfo.payment.selectedMethod) === 0">
                <div class="flex flex-col card-owner gap-1">
                    <div>Nombre del Titular:</div>
                    <pv-input-text id="owner" v-model="userInfo.payment.card.name" placeholder="Titular de la Tarjeta"/>
                </div>
                <div class="flex flex-col card-number gap-1">
                    <div>Numero de la Tarjeta:</div>
                    <pv-input-mask id="card" v-model="userInfo.payment.card.number" mask="9999 - 9999 - 9999 - 9999" placeholder="Número de la Tarjeta" slot-char=" "/>
                </div>
                <div class="card-date flex gap-3 flex-row">
                    <div class="card-date flex gap-1 flex-col">
                        <div>Vencimiento:</div>
                        <div class="flex flex-row">
                            <pv-input-mask id="month" v-model="userInfo.payment.card.month" mask="99" placeholder="Mes" slot-char="-"/>
                            <pv-divider layout="vertical" style="margin:5px"/>
                            <pv-input-mask id="year" v-model="userInfo.payment.card.year" mask="99" placeholder="Año" slot-char="-"/>
                        </div>
                    </div>
                    <div class="card-cvv flex gap-1 flex-col">
                        <div>CVV:</div>
                        <pv-input-mask id="month" v-model="userInfo.payment.card.cvv" mask="999" placeholder="CVV" slot-char="-"/>
                    </div>
                </div>
                <small class="p-error text" id="text-error">{{ errorMessage || ' ' }}</small>
            </div>
            <div class="flex flex-col medium-margin" v-else-if="myPaymentMethods.indexOf(userInfo.payment.selectedMethod) === 1" >
                <pv-dropdown v-if="walletsData.length > 0"
                    id="walletSelector"
                    v-model="userInfo.payment.wallet.id"
                    :options="walletsData"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Elija una billetera digital"
                />
            </div>
            <div v-else class="flex flex-col medium-margin">
                <div>Selecciona un método de pago para continuar</div>
            </div>
            <div class="flex flex-row gap-2 medium-margin">
                <pv-button label="Cancelar" size="large" severity="secondary" outlined rounded @click="this.$emit('logged')"/>
                <pv-button :label="this.originalUserInfo.payment.card.number || this.originalUserInfo.payment.wallet.id?'Actualizar':'Guardar'" size="large" severity="secondary" rounded @click="tryEditPaymentData"/>
            </div>
        </div>
    </div>
    <div v-else-if="errorMessage === true">
        <div class="medium-margin flex flex-col align-center">
            <div class="text-10 little-margin">{{this.originalUserInfo.payment.card.number || this.originalUserInfo.payment.wallet.id?"Actualizando Direccion...":"Creando Direccion..."}}</div>
            <div class="little-margin"><pv-progress-bar style="width: 24rem" mode="indeterminate"/></div>
        </div>
    </div>
    <div v-else-if="!isUserLogged">
        <notLoggedInComponent/>
    </div>
</template>

<style>
.card-owner input{
  width: 18rem;
  align-content: center;
  align-items: center;
  text-align: center;
}
.card-number input{
  width: 18rem;
  align-content: center;
  align-items: center;
  text-align: center;
}
.card-date input{
  width: 4rem;
  align-content: center;
  align-items: center;
  text-align: center;
}
.card-cvv input{
  width: 8rem;
  align-content: center;
  align-items: center;
  text-align: center;
}
</style>