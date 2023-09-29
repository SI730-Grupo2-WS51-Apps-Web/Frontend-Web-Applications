<script>
import backgroundComponent from "@/landing/components/background.component.vue";
import HomeComponent from "@/landing/components/home.component.vue";

export default {
    components:{
        backgroundComponent,
        HomeComponent
    }
}

</script>

<template>
    <HomeComponent/>
</template>

<style>
.background-div {
    background-image: url('@/landing/images/bg-seto-kaiba.svg');
      background-size: cover;
      background-repeat: no-repeat;
      padding: 0rem 0rem 0rem 0rem;/* Puedes ajustar otras propiedades aquí según tus preferencias */
      width: 100%; /* Ajusta el ancho del div según tus necesidades */
      height: 600px; /* Ajusta la altura del div según tus necesidades */
      background-position: center; /* Centra la imagen de fondo */
}

</style>