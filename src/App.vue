<script>
import { RouterLink, RouterView } from 'vue-router';
import navbarComponent from "@/public/components/navbar.component.vue";
import footerComponent from "@/public/components/footer.component.vue";
export default {
  components:{
    navbarComponent,
    footerComponent,
    RouterLink,
    RouterView,
  },
  data(){
    return{
      uwu: "",
    }
  },
  methods:{
    userClicked(){
      console.log("uwu");
    },

  }
}
</script>

<template>
    <header>
      <navbarComponent @user="userClicked"/>
    </header>
    <main>

      <RouterView />
    </main>
    <footer>

    </footer>


</template>

<style scoped>
main{
  margin: 10px;
}
</style>
