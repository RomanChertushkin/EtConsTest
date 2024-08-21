import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: false
})
app.use(router)

app.mount('#app')
