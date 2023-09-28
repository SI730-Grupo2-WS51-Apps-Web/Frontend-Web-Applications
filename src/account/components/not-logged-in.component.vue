<script>
export default {

}
</script>

<template>
  <div class="account flex flex-col text">
    <pv-avatar image="/images/characters/astronaut_not_here.png" class="mr-2" alt="No deberías estar aquí..." id="not-logged-avatar"/>
    <div>Hmp... Parece que no deberías estar aquí todavía...</div>
    <div>Quizá deberías tratar de <router-link to="/login" id="link">iniciar sesión</router-link> primero</div>
  </div>
</template>
<style>
#not-logged-avatar {
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
#not-logged-avatar img{
  height: 20rem;
  width: 20rem;
  border-radius: 2rem;
}
</style>