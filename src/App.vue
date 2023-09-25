<script setup>
import { RouterLink, RouterView } from 'vue-router';
import navbarComponent from "@/public/components/navbar.component.vue";
</script>

<template>
    <header>
      <navbarComponent/>
    </header>
    <main>
      <div class="wrapper">

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
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
