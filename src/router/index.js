import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'categories-list',
    component: () =>
      import(
        /* webpackChunkName: "categories-list" */ '../views/CategoriesList.vue'
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/subcategories-list/:id',
    name: 'subcategories-list',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SubCategoriesList.vue'),
    props: true,
    beforeEnter(to, from, next) {
      store.dispatch('category/fetchCategory', to.params.id).then(category => {
        to.params.category = category
        next()
      })
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/book-list',
    name: 'book-list',
    component: () => import('../views/BookList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login.vue')
  },
  {
    path: '/change-password/:uid/:token',
    name: 'change-password',
    component: () => import('../views/Auth/ChangePassword.vue')
  },
  {
    path: '/email-confirm/:uid/:token',
    name: 'email-confirm',
    component: () => import('../views/Auth/EmailConfirm.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Auth/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', { name: 'email-confirm' }]
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('access')
//
//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('authUser')
    if (loggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
