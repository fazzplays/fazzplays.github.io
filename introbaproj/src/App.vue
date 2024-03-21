<template>
  <v-app>
    <v-main>
      <NavBar />
      <v-btn class="ma-2" v-if="$route.path !== '/'" color="red" @click="goBack()">Back</v-btn>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import NavBar from './components/NavBar.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter();

  const goBack = () => {
    router.back();
  }
</script>

