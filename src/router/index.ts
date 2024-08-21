import { createRouter, createWebHistory } from 'vue-router'
import UrlInputView from '../views/UrlInputView.vue'
import TimePickerView from '../views/TimePickerView.vue'
import MultiSelectComponent from '@/components/MultiSelectComponent.vue'
import TableComponent from '@/components/TableComponent.vue'

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
    },
    {
      path: '/multiSelect',
      name: 'Multi Select',
      component: MultiSelectComponent
    },
    {
      path: '/tableComponent',
      name: 'Table Component',
      component: TableComponent
    }
  ]
})

export default router
