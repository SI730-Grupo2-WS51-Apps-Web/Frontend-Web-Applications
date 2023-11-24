import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import "@/shared/styles/styles.scss"
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Image from "primevue/image";
import AutoComplete from "primevue/autocomplete";
import Tree from "primevue/tree";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import ScrollTop from "primevue/scrolltop";
import Password from "primevue/password";


createApp(App)
    .use(PrimeVue, {ripple:true})
    .component('pv-dialog', Dialog)
    .component('pv-button', Button)
    .component('pv-toolbar', Toolbar)
    .component('pv-divider', Divider)
    .component('pv-input-text',InputText)
    .component('pv-image', Image)
    .component('pv-autocomplete',AutoComplete)
    .component('pv-tree',Tree)
    .component('pv-card',Card)
    .component('pv-avatar', Avatar)
    .component('pv-password',Password)
    .component('pv-scroll-top',ScrollTop)
    .use(router)
    .mount('#app')

