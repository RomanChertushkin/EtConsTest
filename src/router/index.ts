import { createRouter, createWebHistory } from 'vue-router'
import UrlInputView from '../views/UrlInputView.vue'
import TimePickerView from '../views/TimePickerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Url Input',
      component: UrlInputView
    },
    {
      path: '/timePicker',
      name: 'Time Piker',
      component: TimePickerView
    }
  ]
})

export default router
