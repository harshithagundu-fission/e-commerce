import{createRouter,createWebHistory}from"vue-router";
import Homepage from"../views/Homepage.vue";
import About from"../views/about.vue";
import Services from"../views/Services.vue";
import Pricing from"../views/Pricing.vue";
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
        path:"/services",
        name:"Services",
        component:Services
    },
    {
        path:"/pricing",
        name:"Pricing",
        component:Pricing
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;