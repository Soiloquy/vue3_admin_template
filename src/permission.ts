// 路由鉴权，项目中路由能不能访问的权限设置
import router from "./router";
// @ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css"
// 获取用户相关的小仓库内部token 判断是否登录成功
import pinia from "./store";
import useUserStore from "./store/modules/user";

let userStore=useUserStore(pinia);
nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false })
// 全局前置守卫
router.beforeEach(async(to,_from,next)=>{
    // to:将要访问的路由
    // from：你从哪个路由来
    // next：路由的放行函数
    
    nprogress.start();
    if (userStore.token) {
        if (to.path=='/login') {
            next({path:'/'})
        } else {
            if (userStore.username) {
                next()
            } else {
                try {
                    await userStore.userInfo();
                    next({...to})
                } catch (error) {
                    await userStore.userLogout();
                    next({path:'/login'})
                }
            }
        }
    }else{
        if (to.path=='/login') {
            next()
        } else {
            next({path:'/login'})
        }
    }
})

// 全局后置守卫
router.afterEach((to, _from) => {
    // to and from are both route objects.
    document.title='Vue3项目-'+to.meta.title
    nprogress.done();
})