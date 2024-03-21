<template>
    <v-row class="d-flex justify-center">
        <v-col cols="12" md="8">
            <v-form ref="form">
                <div>
                    <v-text-field
                    label="Job Name"
                    readonly
                    v-model="job_id"
                    >

                    </v-text-field>
                </div>
                <div v-for="(item, index) in lightData" :key="index">
                    <v-text-field
                        :label="item.label"
                        v-model="lightData[index].value"
                        type="text"
                        variant="outlined"
                    >
                    </v-text-field>
                </div>
            </v-form>
        </v-col>
    </v-row>
    <v-row class="d-flex justify-center mb-4">
        <v-btn color="green" @click="SaveData">
            Save
        </v-btn>
    </v-row>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import db from '../firebase/init.js'
import {  getDoc, setDoc, doc, updateDoc } from 'firebase/firestore'

const router = useRouter();
const route = useRoute();

const job_id = ref(route.params.job_id);

const props = defineProps({
    job_id: {
        type: String,
        required: true
    },
    fixtureLabel: {
        type: String,
        required: true
    }
});

let lightData = reactive(
        {
            fixtureLabel: { label: 'Fixture Label', value: '', required: true },
            useArea: { label: 'Use Area', value: '', required: true },
            fixtureImage: { label: 'Fixture Image', value: '', required: true },
            lightSource: { label: 'Light Source', value: '', required: true },
            power: { label: 'Power (W)', value: '', required: true },
            lumens: { label: 'Lumens (lm)', value: '', required: true },
            lampColourTemp: { label: 'Lamp Colour Temp (K)', value: '', required: true },
            lampCRI: { label: 'Lamp CRI', value: '', required: true },
            driver: { label: 'Driver', value: '', required: true },
            diffuser: { label: 'Diffuser', value: '', required: true },
            bodyConstruction: { label: 'Body Construction', value: '', required: true },
            ipRating: { label: 'IP Rating', value: '', required: true },
            mounting: { label: 'Mounting', value: '', required: true },
            bodyColour: { label: 'Colour', value: '', required: true },
            distributor: { label: 'Distributor', value: '', required: true },
            rangeProductCode: { label: 'Range / Product Code', value: '', required: true },
            lifeHours: { label: 'Life Hours', value: '', required: true },
            other: { label: 'Other', value: '', required: true },
        }
);

onMounted(async () => {
    lightData.fixtureLabel.value = props.fixtureLabel;
});


let lightDatabaseData = {};

const SaveData = async () => {
    console.log(lightData)
    console.log(job_id.value)

    // Map only the value component of lightData to lightDatabaseData
    for (let key in lightData) {
        lightDatabaseData[key] = lightData[key].value;
    }

    const docRef = doc(db, 'lightschedules', job_id.value);

    // Fetch the current document
    const docSnap = await getDoc(docRef);

    // If the document exists and it has a fixtures property
    if (docSnap.exists() && docSnap.data().fixtures) {
        // Get the current fixtures
        const fixtures = docSnap.data().fixtures;

        // Add lightData to the next available index
        fixtures.push(lightDatabaseData);
        
        // Update the document with the new fixtures
        await updateDoc(docRef, { fixtures });
    } else {
        // If the document doesn't exist or it doesn't have a fixtures property,
        // create a new fixtures array with lightData as the first item
        await setDoc(docRef, { fixtures: [lightDatabaseData] });
    }
    router.push({ name: 'viewschedule', params: { job_id: job_id.value } });
};


</script>
