<template>
    <v-container>
        <v-form ref="form">
            <v-text-field
            label="Job Name"
            v-model="jobName"
            type="text"
            variant="outlined"
            >
            </v-text-field>
            
            <v-row v-for="(item, index) in slicedJobData" :key="index">
                <v-col cols="4"></v-col>
                <v-col cols="4" class="d-flex align-center justify-center">
                    <v-btn>{{ item['From'] }} to {{ item['To'] }} Cable Size: {{ item['Cable Size (mm�)'] }}</v-btn>
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
            
        </v-form>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import db from '../firebase/init.js'
import { collection, addDoc, setDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useRoute } from 'vue-router'

const route = useRoute();

const jobName = ref('');
const jobList = ref([]);
const job_name = ref('');
const jobData = ref([]);
const cableTrays = ref('');

const deleteEntry = (id) => {
    console.log(id)
};

const createUser = async () => {
    const colRef = collection(db, 'users')

    const dataObj = {
        name: 'John Doe',
        email: 'blank@email.com'
    }

    const docRef = await addDoc(colRef, dataObj)
};

const createJob = async (jobName, cableTrays, conduits) => {
    await setDoc(doc(db, 'jobs'), {
        jobName: jobName.value,
        cableTrays: cableTrays.value,
        conduits: conduits,
    })

    console.log('Document written with ID: ', docRef.id)
};

const slicedJobData = computed(() => {
    if (jobData.value.length > 0 && jobData.value[0].csvData) {
        return jobData.value[0].csvData.slice(2, jobData.value[0].csvData.length - 1);
    }
    return [];
});

const readJobs = async () => {
    const colRef = collection(db, 'jobs');
    const jobQuery = query(colRef, where('jobName', '==', route.params.job_id));
    const querySnapshot = await getDocs(jobQuery);
    const jobDataVal = querySnapshot.docs.map(doc => doc.data());
    
    if (jobDataVal.length > 0 && jobDataVal[0].csvData) {
        console.log(jobDataVal[0].csvData[1].From)
        console.log(jobDataVal)
        jobData.value = jobDataVal;
    }
    return jobDataVal;
};

onMounted(async () => {
    jobData.value = await readJobs()
    if (jobData.value.length > 0 ) {
        jobName.value = jobData.value[0].jobName
        console.log(jobName.value)
    }
});
</script>