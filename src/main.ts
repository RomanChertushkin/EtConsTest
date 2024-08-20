import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVueStyled from 'primevue/config';
import router from './router';

const app = createApp(App);

app.use(PrimeVueStyled);
app.use(router);

app.mount('#app');
