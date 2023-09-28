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
import ProgressBar from "primevue/progressbar";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import ToastService  from "primevue/toastservice";
import FocusTrap from "primevue/focustrap";



createApp(App)
    .use(PrimeVue, {ripple:true})
    .component('pv-dialog', Dialog)
    .component('pv-button', Button)
    .component('pv-toolbar', Toolbar)
    .component('pv-divider', Divider)
    .component('pv-input-text',InputText)
    .component('pv-input-number',InputNumber)
    .component('pv-password',Password)
    .component('pv-image', Image)
    .component('pv-autocomplete',AutoComplete)
    .component('pv-tree',Tree)
    .component('pv-card',Card)
    .component('pv-avatar', Avatar)
    .component('pv-scroll-top',ScrollTop)
    .component('pv-progress-bar',ProgressBar)
    .component('pv-dropdown',Dropdown)
    .use(ToastService)
    .use(router)
    .directive('pv-focus-trap', FocusTrap)
    .mount('#app')

