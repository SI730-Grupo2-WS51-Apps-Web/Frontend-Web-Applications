import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import "@/public/styles/styles.scss"
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Toolbar from "primevue/toolbar";
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Image from "primevue/image";
import AutoComplete from "primevue/autocomplete";
import Tree from "primevue/tree";
import Card from "primevue/card";


createApp(App)
    .use(PrimeVue, {ripple:true})
    .component('pv-dialog', Dialog)
    .component('pv-button', Button)
    .component('pv-split-button', SplitButton)
    .component('pv-toolbar', Toolbar)
    .component('pv-divider', Divider)
    .component('pv-input-text',InputText)
    .component('pv-image', Image)
    .component('pv-autocomplete',AutoComplete)
    .component('pv-tree',Tree)
    .component('pv-card',Card)
    .use(router)
    .mount('#app')

