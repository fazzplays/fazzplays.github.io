<template>
    <v-row class="d-flex justify-center">
        <v-col>
            <v-card class="mx-auto mt-4" max-width="600" v-for="(fixture, i) in lightData.fixtures">
                <v-img height="200px" :src="fixture.fixtureImage" cover></v-img>
                <v-card-title>{{ fixture.fixtureLabel }} </v-card-title>
                <v-card-subtitle>{{ fixture.useArea }}</v-card-subtitle>
                <v-card-actions>
                    <v-btn color="orange-lighten-2" variant="text" @click="goToEditLuminaire(fixture.fixtureLabel)">Edit</v-btn>

                    <v-spacer></v-spacer>

                    <v-btn :icon="fixture.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="fixture.show = !fixture.show"></v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="fixture.show">
                        <v-divider></v-divider>
                        <v-card-text><strong>Light Source:</strong> {{ fixture.lightSource }}</v-card-text>
                        <v-card-text><strong>Power (W):</strong> {{ fixture.power }}</v-card-text>
                        <v-card-text><strong>Lumens:</strong> {{ fixture.lumens }}</v-card-text>
                        <v-card-text><strong>Lamp Colour Temp and CRI:</strong> {{ fixture.lampColourTemp }}, {{ fixture.lampCRI }}</v-card-text>
                        <v-card-text><strong>Driver:</strong> {{ fixture.driver }}</v-card-text>
                        <v-card-text><strong>Diffuser:</strong> {{ fixture.diffuser }}</v-card-text>
                        <v-card-text><strong>Body Construction:</strong> {{ fixture.bodyConstruction }}</v-card-text>
                        <v-card-text><strong>IP Rating:</strong> {{ fixture.ipRating }}</v-card-text>
                        <v-card-text><strong>Mounting:</strong> {{ fixture.mountng }}</v-card-text>
                        <v-card-text><strong>Colour:</strong> {{ fixture.colour }}</v-card-text>
                        <v-card-text><strong>Distributor:</strong> {{ fixture.distributor }}</v-card-text>
                        <v-card-text><strong>Range / Product Code:</strong> {{ fixture.rangeProductCode }}</v-card-text>
                        <v-card-text><strong>Life (hours) L80 / F10:</strong> {{ fixture.lifeHours }}</v-card-text>
                        <v-card-text><strong>Other:</strong> {{ fixture.other }}</v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-col>
        <!-- <v-col cols="" sm="9" md="10" lg="11">
            <v-card
                class="mx-auto pa-2 my-2 d-flex justify-center align-center"
                max-width="1500"
                max-height="1000"
                :title="fixture.fixtureLabel"
                :subtitle="fixture.useArea"
                link
                v-for="(fixture, i) in lightData.fixtures"
            >
            <v-img :src="fixture.fixtureImage" min-width="150" max-width="150"></v-img>
            <div>
                <v-card-text><strong>Light Source:</strong> {{ fixture.lightSource }}</v-card-text>
                <v-card-text><strong>Power (W):</strong> {{ fixture.power }}</v-card-text>
                <v-card-text><strong>Lumens:</strong> {{ fixture.lumens }}</v-card-text>
                <v-card-text><strong>Lamp Colour Temp and CRI:</strong> {{ fixture.lampColourTemp }}, {{ fixture.lampCRI }}</v-card-text>
            </div>
            <div>
                <v-card-text><strong>Driver:</strong> {{ fixture.driver }}</v-card-text>
                <v-card-text><strong>Diffuser:</strong> {{ fixture.diffuser }}</v-card-text>
                <v-card-text><strong>Body Construction:</strong> {{ fixture.bodyConstruction }}</v-card-text>
                <v-card-text><strong>IP Rating:</strong> {{ fixture.ipRating }}</v-card-text>
            </div>
            <div>
                <v-card-text><strong>Mounting:</strong> {{ fixture.mountng }}</v-card-text>
                <v-card-text><strong>Colour:</strong> {{ fixture.colour }}</v-card-text>
                <v-card-text><strong>Distributor:</strong> {{ fixture.distributor }}</v-card-text>
                <v-card-text><strong>Range / Product Code:</strong> {{ fixture.rangeProductCode }}</v-card-text>
            </div>
            <div>
                <v-card-text><strong>Life (hours) L80 / F10:</strong> {{ fixture.lifeHours }}</v-card-text>
                <v-card-text><strong>Other:</strong> {{ fixture.other }}</v-card-text>
            </div>
            <v-btn color="red">Delete</v-btn>

            </v-card>
        </v-col> -->
    </v-row>
    <v-row class="d-flex justify-center pa-2">
        <v-btn @click="goToAddLuminaire()">
            Add Luminaire
        </v-btn>
        <v-btn @click="printFixtures">
            Print!
        </v-btn>
    </v-row>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js'
import {  doc, getDoc } from 'firebase/firestore'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

const router = useRouter();
const route = useRoute();

const job_id = ref(route.params.job_id);
const lightData = ref([]);
const fixtures = ref([]);
let show = false;

const props = defineProps({
    job_id: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    if (Array.isArray(lightData.fixtures)) {
        lightData.fixtures.forEach(fixture => {
            fixture.show = false;
        });
    }
});


const goToAddLuminaire = () => {
    router.push({ name: 'addlight', params: { job_id: job_id.value } })
};

const goToEditLuminaire = (fixtureLabel) => {
    router.push({ name: 'editlight', params: { job_id: job_id.value, fixtureLabel: fixtureLabel } })
};

const printFixtures = () => {
    console.log(fixtures.value)
    console.log(job_id.value)
};

onMounted(async () => {
    console.log(job_id.value)
});

onMounted(async () => {
    const docRef = doc(db, 'lightschedules', job_id.value);
    const docSnap = await getDoc(docRef);
    

    if (docSnap.exists()) {
        lightData.value = docSnap.data();
    } else {
        console.log("No such document!");
    }
});

</script>

<style scoped>

</style>