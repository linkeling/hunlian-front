import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false});

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/Login'},
    {path: '/Login', component: () => import('@/views/Login.vue')},
    //单位端管理
    {
        path: '/Home',
        component: () => import('@/views/Home.vue'),
        children: [
            // 单位管理端-首页
            {path: 'index', title: '首页', component: () => import('@/views/Index.vue')},
            {path: 'customInfoPage', title: '首页', component: () => import('@/views/custom/customInfoPage.vue')},
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 路由守卫
router.beforeEach((to, form, next) => {
    NProgress.start();
    if (to.path === '/Login') {
        return next();
    };
    const token = window.sessionStorage.getItem('token');
    const falgLogin = window.sessionStorage.getItem('loginType');
    if (token) {
        next();
    } else {
    	if (falgLogin === '1' || !falgLogin){
			next('/Login');
		}
       if (falgLogin === '2') {
       	next('/networkPortLogin')
	   }
    }
});
router.afterEach((to, form, next) => {
    NProgress.done();
});
// 解决重复点击二级菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

export default router
