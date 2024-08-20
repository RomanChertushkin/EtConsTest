import { createRouter, createWebHistory } from 'vue-router'
import UrlInputView from '../views/UrlInputView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'urlInput',
      component: UrlInputView
    }
  ]
})

export default router
