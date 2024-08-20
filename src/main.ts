import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVueStyled from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

const app = createApp(App)

app.use(PrimeVueStyled, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
})
app.use(router)

app.mount('#app')
