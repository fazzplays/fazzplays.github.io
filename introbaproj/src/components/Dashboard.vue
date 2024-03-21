<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card
                :variant="elevated"
                @click="$router.push('cablepanel')"
                class="mx-auto mb-4"
                width="100vh"
                color="primary"
                >
                    <v-card-item>
                        <div>
                            <v-card-title class="headline mb-0">Cable Schedules</v-card-title>
                            <v-card-subtitle>Here you can manage your cable trays or conduits</v-card-subtitle>
                        </div>
                    </v-card-item>
                </v-card>
                <v-card
                :variant="elevated"
                @click="$router.push('schedules')"
                class="mx-auto"
                width="100vh"
                color="indigo"
                >
                    <v-card-item>
                        <div>
                            <v-card-title class="headline mb-0">Luminaire Schedules</v-card-title>
                            <v-card-subtitle>Manage luminaire schedules</v-card-subtitle>
                        </div>
                    </v-card-item>
                </v-card>
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
