<template>
  <v-app-bar color="rgb(47, 139, 201)">
    <v-row class="d-flex align-center justify-center pa-4">
      <v-col cols="4">
        <v-btn
          text="Dashboard"
          variant="text"
          :to="'/'"
        ></v-btn>
      </v-col>

      <v-col cols="4">
        <h1 class="d-flex justify-center align-center">Introba Tools</h1>
      </v-col>

      <v-col cols="3" class="d-flex justify-end">
        <v-responsive max-width="240">
          <v-text-field
            density="compact"
            flat
            hide-details
            label="Search"
            rounded="lg"
            single-line
            variant="solo-filled"
            class="mr-4"
          ></v-text-field>
        </v-responsive>
      </v-col>
      <v-col cols="1" class="d-flex justify-center align-center">
        
        <v-btn
          icon
          class="mr-4"
        >
          <v-icon>mdi-account</v-icon>
          
        </v-btn>
        <v-switch class="d-flex align-center"
          v-model="$vuetify.theme.dark"
          color="$vuetify.theme.dark ? 'grey' : 'white'"
        ></v-switch>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup>
const links = ['Schedules', 'Contact']
</script>

<style scoped>
.h1 {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
}
</style>