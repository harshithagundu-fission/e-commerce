import{createRouter,createWebHistory}from"vue-router";
import Homepage from"../views/Homepage.vue";
import About from"../views/about.vue";
import Services from"../components/Services.vue";
import Pricing from"../views/Pricing.vue";
import Contacts from '../views/Contacts.vue';
import Login from '../views/Login.vue';
import Loggingout from '../views/Loggingout.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import 'flowbite';
import bag from '../views/Products/bag.vue';
import BuyNow from "../views/BuyNow.vue";
import AddToCartButton from "../components/AddToCartButton.vue";

 


const routes=[
    {
    path:"/",
    name:"Homepage",
    // Show Services on the root so main page displays products
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
        component:Login
    },
    {
        path: "/bag",
        name: "bag",
        component: bag
    },
    {
        path:"/logout",
        name:"Loggingout",
        component:Loggingout
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
        path:"/pricing",
        name:"Pricing",
        component:Pricing
    },
    {
        path:"/contacts",
        name:"Contacts",
        component:Contacts
    },
    {   
        path:"/buynow",
        name:"BuyNow",
        component:BuyNow
    },
    {
        path:"/addtocartbutton",
        name:"AddToCartButton",
        component:AddToCartButton   
    }
        
   
    
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;