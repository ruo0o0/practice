import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'
import AddressMemo from '../views/AddressMemo.vue'
import CreateLabel from '../components/CreateLabel.vue'
import LabelList from '../views/LabelList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addresses/:label_id?',
    name: 'addresses',
    component: Addresses,
  },
  {
    path: '/addresses/:address_id?/edit',
    name: 'address_edit',
    component: AddressForm,
  },
  {
    path: '/addresses/:address_id/memo',
    name: 'address_memo',
    component: AddressMemo,
  },
  {
    path: '/addresses/create_label',
    name: 'create_label',
    component: CreateLabel,
  },
  {
    path: '/addresses/:address_id/attach',
    name: 'label_attach',
    component: LabelList,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
