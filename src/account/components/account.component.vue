<script>
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
  <div class="account flex flex-col">
    <pv-avatar :image="`public/images/profile/${userInfo.image}.png`" class="mr-2" alt="Usuario.png" id="mini-profile-avatar"/>
  </div>
</template>

<style scoped>

</style>