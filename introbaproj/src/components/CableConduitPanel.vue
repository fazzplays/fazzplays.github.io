<template>
    <v-container>
        <v-row v-for="(item, i) in jobList" :key="i">
            <v-card
            class="mx-auto my-2"
            :title="item.id"
            style="min-width: 600px;"
            >
                <v-card-text>
                    <v-row>
                        <v-col md="6">
                            <v-list-item>
                                    <v-list-item-title class="headline mb-1">Description</v-list-item-title>
                                    <!-- <v-list-item-subtitle>{{ item.cableTrays }}</v-list-item-subtitle> -->
                                    <v-list-item-subtitle>Testing 123</v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="goToEdit(item.id)">Edit</v-btn>
                    <v-btn text color="primary" @click="deleteEntry(item.id)">Delete</v-btn>
                    <v-btn text color="primary" @click="goToTrayDesign()">Assign Cable Tray Runs</v-btn>
                </v-card-actions
            >
            </v-card>
        </v-row>
        <v-row>
        <v-col color="red" class="d-flex justify-center">
            <v-btn @click="$router.push('createjob')">Create Job</v-btn>
        </v-col>
    </v-row>
    </v-container>
    
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import db from '../firebase/init.js'
import { collection, addDoc, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore'

const router = useRouter();
const jobList = ref([]);
const jobName = ref('');

const deleteEntry = async (id) => {
    await deleteDoc(doc(db, 'jobs', id))
    const index = jobList.value.findIndex(job => job.id === id);
    if (index !== -1) {
        jobList.value.splice(index, 1);
    }
    console.log(id)
};

const goToTrayDesign = (jobName, data) => {
    router.push({ name: 'trayeditor', params: { job_id: jobName } })
};

const goToEdit = (jobName, data) => {
    router.push({ name: 'editpanel', params: { job_id: jobName } })
};

const createUser = async () => {
    const colRef = collection(db, 'users')

    const dataObj = {
        name: 'John Doe',
        email: 'blank@email.com'
    }

    const docRef = await addDoc(colRef, dataObj)

    console.log('Document written with ID: ', docRef.id)
};


onBeforeMount(async () => {
    const colRef = collection(db, 'jobs')
    const jobData = await getDocs(colRef)
    jobData.forEach((doc) => {
        jobList.value.push(doc)
    })
});

</script>