import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import store from './store/store'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: false
})
app.use(router)
app.use(store)

app.mount('#app')
