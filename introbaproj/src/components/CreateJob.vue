<template>
    <v-container>
        <v-form ref="form">
            <v-text-field
            label="Job Name"
            v-model="jobName"
            type="text"
            variant="outlined"
            width="100%"
            >
            </v-text-field>


            <v-file-input 
                accept=".csv"
                label="Import CSV"
                v-model="csvFile"
                @change="onFileChange(csvFile)"
                prepend-icon="mdi-file-import"
            ></v-file-input>

            <v-data-table :items="filteredCsvData" class="elevation-4"></v-data-table>
            <v-btn class="mt-4" @click="createJob(cableTrays, conduits)" to="/">Submit</v-btn>
            
        </v-form>
    </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import db from '../firebase/init.js'
import { collection, addDoc, setDoc, doc, getDoc, query, where } from 'firebase/firestore'
import { parse } from 'papaparse'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const jobName = ref('');
const cableTrays = ref([]);
const conduits = ref([]);
const csvFile = ref(null);
const csvData = ref([]);

const createJob = async () => {
    if (!jobName.value) {
        alert('Please enter a job name');
        return;
    }
    const docRef = doc(collection(db, "jobs"), jobName.value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        alert('Job name already exists');
        return;
    }

    await setDoc(docRef, {
        jobName: jobName.value,
        cableTrays: cableTrays.value,
        conduits: conduits.value,
        csvData: csvData.value,
        // add other data fields as needed
    });
};

async function onFileChange(e) {
    const file = e[0];
    if (file) {
        parse(file, {
        header: true,
        complete: (results) => {
            this.csvData = results.data;
            console.log(results.data);
        },
        });
    }
}

const filteredCsvData = computed(() => {
    const fields = ['From', 'To', 'Cable Code', 'Cable Size', 'Neutral Size', 'Earth Size', 'Insulation'];
    return csvData.value
        .filter(row => Object.values(row).some(value => value.trim().length > 0)) // Filter out completely empty rows
        .map(row => {
            return Object.keys(row).reduce((obj, key) => {
                if (fields.some(field => key.includes(field)) && row[key]) {
                    obj[key] = row[key];
                }
                return obj;
            }, {});
        })
        .filter(row => Object.values(row).every(value => value && value.trim().length > 0)) // Filter out rows with any empty fields
        .slice(1); // Exclude the first row
});
</script>

<!-- <script>

import db from '../firebase/init.js'
import { collection, addDoc, setDoc, doc, getDoc, query, where } from 'firebase/firestore'
import { parse } from 'papaparse'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
// TODO: I need: From, To, Cable Code, Cable Size, Neutral Size, Earth Size, Flat/Trefoil, PVC/XLPE/FIRE, Diameter (1D/2D), Tracks

export default {
    icons: {
        values: {
            mdi: mdi,
        },
    },
    components: {
        
    },
    data: function() {
        return {
            jobName: '',
            cableTrays: [],
            conduits: [],
            csvFile: null,
            csvData: [],
            headers: [
                { text: 'From', value: 'From' },
                { text: 'To', value: 'To' },
                { text: 'Cable Code', value: 'Cable Code' },
                { text: 'Cable Size', value: 'Cable Size' },
                { text: 'Neutral Size', value: 'Neutral Size' },
                { text: 'Earth Size', value: 'Earth Size' },
                { text: 'Insulation', value: 'Insulation' },
            ],
        }
    },
    methods: {
        async createJob() {
            if (!this.jobName) {
                alert('Please enter a job name');
                return;
            }
            const docRef = doc(collection(db, "jobs"), this.jobName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                alert('Job name already exists');
                return;
            }

            await setDoc(docRef, {
                jobName: this.jobName,
                cableTrays: this.cableTrays,
                conduits: this.conduits,
                csvData: this.csvData,
                // add other data fields as needed
            });
        },
        onFileChange(e) {
        const file = e[0];
        if (file) {
            parse(file, {
            header: true,
            complete: (results) => {
                this.csvData = results.data;
                console.log(results.data);
            },
            });
        }
        },
    },
    computed: {
        filteredCsvData() {
            const fields = ['From', 'To', 'Cable Code', 'Cable Size', 'Neutral Size', 'Earth Size', 'Insulation'];
            return this.csvData
                .filter(row => Object.values(row).some(value => value.trim().length > 0)) // Filter out completely empty rows
                .map(row => {
                    return Object.keys(row).reduce((obj, key) => {
                        if (fields.some(field => key.includes(field)) && row[key]) {
                            obj[key] = row[key];
                        }
                        return obj;
                    }, {});
                })
                .filter(row => Object.values(row).every(value => value && value.trim().length > 0)) // Filter out rows with any empty fields
                .slice(1); // Exclude the first row
        },
    },
}
</script> -->