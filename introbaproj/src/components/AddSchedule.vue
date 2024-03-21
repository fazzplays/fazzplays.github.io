<template>
    <v-container>
        
        <v-text-field
        v-model="jobName"
        label="Job Name"
        >
            
        </v-text-field>
        <v-row class="d-flex justify-center">
            <v-btn color="green" @click="createJob()">Create Job</v-btn>
        </v-row>
        
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import db from '../firebase/init.js'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'



const router = useRouter();
const jobName = ref('');

const createJob = async () => {
    if (!jobName.value) {
        alert('Please enter a job name');
        return;
    }
    const docRef = doc(collection(db, "lightschedules"), jobName.value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        alert('Job name already exists');
        return;
    }

    await setDoc(docRef, {
        fixtures: [],
    });

    router.push({ name: 'schedules' });
};

</script>

<style>

</style>