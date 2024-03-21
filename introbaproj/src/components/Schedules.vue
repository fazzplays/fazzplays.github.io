<template>
    <v-container>
        <v-form ref="form">
            
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-btn class="mr-3" @click="createLightingSchedule">Create Schedule</v-btn>
                </v-col>
            </v-row>
                  
        </v-form>
    </v-container>
    <v-container>
        <v-row v-for="(item, i) in scheduleList" :key="i">
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
                    <v-btn text color="primary" @click="goToView(item.id)">View</v-btn>
                    <v-btn text color="primary" @click="deleteEntry(item.id)">Delete</v-btn>
                </v-card-actions
            >
            </v-card>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import db from '../firebase/init.js'
import { collection, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'



const router = useRouter();
const scheduleList = ref([]);

onBeforeMount(async () => {
    const colRef = collection(db, 'lightschedules')
    const jobData = await getDocs(colRef)
    jobData.forEach((doc) => {
        scheduleList.value.push(doc)
    })
    console.log(scheduleList.value)
    console.log("Hi")
});

const goToView = (jobName, data) => {
    console.log(jobName)
    router.push({ name: 'viewschedule', params: { job_id: jobName } })
};

const deleteEntry = async (id) => {
    if (confirm('Are you sure you want to delete this schedule?') == true) {
        await deleteDoc(doc(db, 'lightschedules', id))
        const index = scheduleList.value.findIndex(job => job.id === id);
        if (index !== -1) {
            scheduleList.value.splice(index, 1);
        }
        console.log(id)
    }
};

const createLightingSchedule = async () => {
    router.push({ name: 'addschedule' })
};



</script>