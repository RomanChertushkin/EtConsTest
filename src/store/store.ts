import { createStore } from 'vuex'
import { LogsService, type LogEntry } from '../services/logsService'
import { ProductService, type Product } from '@/services/productService'

interface State {
  logs: LogEntry
  products: Product[]
}

const store = createStore<State>({
  state: {
    logs: 0,
    products: []
  },
  mutations: {
    setLogs(state: any) {
      const logsService = new LogsService()
      state.logs = logsService.getLogEntries()
    },

    setProducts(state: any) {
      const productsService = new ProductService()
      productsService.getProducts().then((products: Product[]) => {
        state.products = products
      })
    }
  },
  actions: {
    commitLogs({ commit }: any) {
      commit('setLogs')
    },

    commitProducts({ commit }: any) {
      commit('setProducts')
    }
  },
  getters: {
    getLogs(state: any): number {
      return state.logs
    },

    getProducts:
      (state: any) =>
      (searchParams: Partial<any>, searchTerm: string = ''): Product[] => {
        console.log(2)
        return state.products.filter((product: Product) => {
          return searchParams.some((param: any) => {
            if (param.checked) {
              const productValue = product[param.name as keyof Product]

              return String(productValue).toLowerCase().includes(searchTerm.toLowerCase())
            }

            return false
          })
        })
      }
  }
})

export default store
