import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
    {
        path:'/login',
        name:'login',
        component:() => import('./components/auth/Login'),
        meta: { 
            hideNavigation: true
        }
    },
    {
        path:'/',
        name:'profile',
        component:() => import('./components/profile/Profile'),
        meta: { requiresAuth:true}
    },
    {
        path:'/club-members',
        name:'club-members',
        component:() => import('./components/profile/ClubMembers'),
        meta: { requiresAuth:true }
    },
    {
        path:'/change-password',
        name:'change-password',
        component:() => import('./components/profile/ChangePassword'),
        meta: { requiresAuth:true }
    },
    {
        path:'/club-income',
        name:'club-income',
        component:() => import('./components/wallet/ClubIncome'),
        meta: { requiresAuth:true }
    },
    {
        path:'/withdraw-request',
        name:'withdraw-request',
        component:() => import('./components/wallet/WithdrawRequest'),
        meta: { requiresAuth:true }
    },
    {
        path:'/withdraw-details',
        name:'withdraw-details',
        component:() => import('./components/wallet/WithdrawDetails'),
        meta: { requiresAuth:true }
    },
    {
        path: '*',
        component: () => import('./components/NotFoundPage'),
        meta: { hideNavigation: true }
    }
];

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    hashbang: false,
    routes
})
  
router.beforeEach((to, from, next) => {  
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
      next();
    }
})
