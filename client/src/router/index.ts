import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "首页"
        },
        // children: [
        //     {
        //         path: '/',
        //         redirect: '/bubble'
        //     },
        //     {
        //         path: "bubble",
        //         name: 'bubble',
        //         component: () => import("../view/children/Table.vue"),
        //         meta: {
        //             title: "气泡文案"
        //         }
        //     }
        // ]
    }, {
        path: '/login',
        name: 'login',
        component: () => import("../views/Login.vue"),
        meta: {
            title: "登录"
        },
    },
    {
		path: "/:pathMath(.*)",
		redirect: '/',
	},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return
    }
})

router.beforeEach((to, from, next) => {
    // if (localStorage.getItem("token")) {

    // }
    document.title = to.meta.title as string
    next()
})

export default router