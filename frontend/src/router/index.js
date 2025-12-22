import{createRouter,createWebHistory}from"vue-router";
import Homepage from"../views/Homepage.vue";
import About from"../views/about.vue";
import Services from"../views/Services.vue";
import Pricing from"../views/Pricing.vue";
import Contacts from '../views/Contacts.vue';
import Login from '../views/Login.vue';
import Loggingout from '../views/Loggingout.vue';
import 'flowbite';
 


const routes=[
    {
    path:"/",
    name:"Homepage",
    // Show Services on the root so main page displays products
    component:Services
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
        path:"/logout",
        name:"Loggingout",
        component:Loggingout
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
    
    
   
    
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;