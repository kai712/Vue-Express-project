import Vue from 'vue'
import Router from 'vue-router'


const CMain = resolve => require(['../components/main/home'], resolve);
const MaterialClassification = resolve => require(['../components/main/MaterialClassification'], resolve);
const MaterielList = resolve => require(['../components/main/materielList'], resolve);
const OrderList = resolve => require(['../components/main/orderList'], resolve);
const PurchaseOrder = resolve => require(['../components/main/purchaseOrder'], resolve);
const SupplierClassification = resolve => require(['../components/main/supplierClassification'], resolve);
const SupplierList = resolve => require(['../components/main/supplierList'], resolve);
const TenderList = resolve => require(['../components/main/tenderList'], resolve);
const Register = resolve => require(['../components/register'], resolve);
const Login = resolve => require(['../components/login'], resolve);
const Main = resolve => require(['../components/main'], resolve);
const Miss = resolve => require(['../components/404'], resolve);

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
