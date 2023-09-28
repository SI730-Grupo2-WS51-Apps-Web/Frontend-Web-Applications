<script >
export default {

}
</script>

<template>
  <div class="account flex flex-col text">
    <pv-avatar image="/images/characters/astronaut_not_here.png" class="mr-2" alt="No deberías estar aquí..." id="not-found"/>
    <div>Lo sentimos, la página que ha solicitado</div>
    <div> no existe o no está disponible. Si deseas,</div>
    <div>podemos llevarte a la <router-link to="/" id="link">página principal</router-link></div>

  </div>
</template>

<style>
  #not-found{
    height: 16rem;
    width: 16rem;
    border-radius: 4rem;
  }
  #not-found img{
    height: 16rem;
    width: 16rem;
    border-radius: 4rem;
  }
</style>