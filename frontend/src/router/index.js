import{createRouter,createWebHistory}from"vue-router";
import ProductsHomepage from"../views/ProductsHomepage.vue";
import Profile from"../views/profile.vue";
import Services from"../components/Services.vue";
import Login from '../views/Login.vue';
import Loggingout from '../views/Loggingout.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Checkout from "../views/Checkout.vue";
import AddToCartButton from "../components/AddToCartButton.vue";
import LoggedOut from "../views/LoggedOut.vue";
import Home from"../views/Home.vue";


const routes=[
    {
    path:"/",
    name:"ProductsHomepage",
    component:ProductsHomepage
    },
{
        path:"/profile",
        name:"Profile",
        component:Profile
    },
    {
        path:"/login",
        name:"Login",
        component:Login,
        meta: { hideHeader: true }
    },
      {
        path:"/logout",
        name:"Loggingout",
        component:Loggingout,
        meta: { hideHeader: true }
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        props: true
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {   
        path:"/services",
        name:"Services",
        component:Services
    },
    {   
        path:"/checkout",
        name:"Checkout",
        component:Checkout
    },
    {
            path: '/loggedout',
            name: 'LoggedOut',
            component: LoggedOut,
            meta: { hideHeader: true }
        },
    {
        path:"/addtocartbutton",
        name:"AddToCartButton",
        component:AddToCartButton   
    },
    {
        path:"/home",
        name:"Home",
        component:Home  
    }
   
        
   
    
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;