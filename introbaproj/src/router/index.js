import { createWebHistory, createRouter } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import CreateJob from '../components/CreateJob.vue'
import EditCableTray from '../components/EditCableTray.vue'
import EditConduit from '../components/EditConduit.vue'
import Schedules from '../components/Schedules.vue'
import Contact from '../components/Contact.vue'
import EditPanel from '../components/EditPanel.vue'
import TrayEditor from '../components/TrayEditor.vue'
import ViewSchedule from '../components/ViewLightingSchedule.vue'
import LightingScheduleAdd from '../components/AddLuminaire.vue'
import AddSchedule from '../components/AddSchedule.vue'
import LightingScheduleEdit from '../components/EditLuminaire.vue'
import CableConduitPanel from '../components/CableConduitPanel.vue'


const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/cablepanel',
        name: 'cableconduit',
        component: CableConduitPanel
    },
    {
        path: '/cablepanel/edit/:job_id',
        name: 'editpanel',
        component: EditPanel,
        props: true
    },
    {
        path: '/cablepanel/:job_id',
        name: 'trayeditor',
        component: TrayEditor,
        props: true
    },
    {
        path: '/schedules',
        name: 'schedules',
        component: Schedules
    },
    {
        path: '/schedules/lighting/:job_id',
        name: 'viewschedule',
        component: ViewSchedule,
        props: true
    },
    {
        path: '/schedules/addschedule',
        name: 'addschedule',
        component: AddSchedule
    },
    {
        path: '/schedules/lighting/:job_id/add',
        name: 'addlight',
        component: LightingScheduleAdd,
        props: true
    },
    {
        path: '/schedules/lighting/:job_id/:fixtureLabel',
        name: 'editlight',
        component: LightingScheduleEdit,
        props: true
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/createjob',
        name: 'createjob',
        component: CreateJob
    },
    {
        path: '/edittray/:tray_id',
        name: 'editcabletray',
        component: EditCableTray
    },
    {
        path: '/editconduit/:conduit_id',
        name: 'editconduit',
        component: EditConduit
    }
] 

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;