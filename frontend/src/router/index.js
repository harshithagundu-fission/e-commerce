import{createRouter,createWebHistory}from"vue-router";
import Homepage from"../views/Homepage.vue";
import About from"../views/about.vue";
import Services from"../components/Services.vue";
import Login from '../views/Login.vue';
import Loggingout from '../views/Loggingout.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import bag from '../views/Products/bag.vue';
import BuyNow from "../views/BuyNow.vue";
import AddToCartButton from "../components/AddToCartButton.vue";
import LoggedOut from "../views/LoggedOut.vue";



const routes=[
    {
    path:"/",
    name:"Homepage",
    component:Homepage
    },
{
        path:"/about",
        name:"About",
        component:About
    },
    {
        path:"/login",
        name:"Login",
        component:Login,
        meta: { hideHeader: true }
    },
    {
        path: "/bag",
        name: "bag",
        component: bag
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
        path:"/buynow",
        name:"BuyNow",
        component:BuyNow
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
   
        
   
    
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;