import Vue from 'vue'
import Router from 'vue-router'
import CMain from '@/components/main/home'
import MaterialClassification from '@/components/main/MaterialClassification'
import MaterielList from '@/components/main/materielList'
import OrderList from '@/components/main/orderList'
import PurchaseOrder from '@/components/main/purchaseOrder'
import SupplierClassification from '@/components/main/supplierClassification'
import SupplierList from '@/components/main/supplierList'
import TenderList from '@/components/main/tenderList'
import Register from '@/components/register'
import Login from '@/components/login'
import Main from '@/components/main'
import Miss from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      redirect:'/main/cMain',
      children: [
        {
          //首页
          path: 'cMain',
          name: 'cMain',
          component: CMain
        },
        {
          //物料分类
          path: 'MaterialClassification',
          name: 'MaterialClassification',
          component: MaterialClassification
        },    {
          //物料列表
          path: 'materielList',
          name: 'materielList',
          component: MaterielList
        },    {
          //订单列表
          path: 'orderList',
          name: 'orderList',
          component: OrderList
        },    {
          //采购单列表
          path: 'purchaseOrder',
          name: 'purchaseOrder',
          component: PurchaseOrder
        },    {
          //供应商分类
          path: 'supplierClassification',
          name: 'supplierClassification',
          component: SupplierClassification
        },    {
          //供应商列表
          path: 'supplierList',
          name: 'supplierList',
          component: SupplierList
        },    {
          //招标列表
          path: 'tenderList',
          name: 'tenderList',
          component: TenderList
        }
      ]
    },    {
      //注册
      path: '/register',
      name: 'register',
      component: Register
    },    {
      //登录
      path: '/',
      name: 'login',
      component: Login
    },   {
      //404
      path: '*',
      name: 'Miss',
      component: Miss
    }
  ]
})
