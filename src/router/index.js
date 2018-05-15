import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import {setTitle, logout} from '../tools/operation';

const Index = () => import('../containers/Index');
const Login = () => import('../containers/Login');
const Blank = () => import('../containers/Blank');
const Account = () => import('../containers/Account');
const Center = () => import('../containers/Center');
const Recharge = () => import('../containers/Recharge');
const RechargeResult = () => import('../containers/RechargeResult');

Vue.use(Router);
let routes = [
    {
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
            title: '金疙瘩'
        }
    },
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '金疙瘩'
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/blank',
        name: 'blank',
        component: Blank,
        meta: {
            title: '跳转中...'
        }
    },
    {
        path: '/recharge-result',
        name: 'recharge-result',
        component: RechargeResult,
        meta: {
            title: '充值结果'
        }
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {
            title: '账户充值',
            loginRequired: true
        },
        redirect: '/account/center',
        children: [{
            path: 'recharge',
            name: 'recharge',
            component: Recharge,
            meta: {
                title: '账户充值',
                loginRequired: true
            }
        },
            {
                path: 'center',
                name: 'center',
                component: Center,
                meta: {
                    title: '账户中心',
                    loginRequired: true
                }
            }]
    }
];
routes.push({
    path: '*',
    redirect: '/index'
});
let beforeEach = ((to, from, next) => {
    let {meta} = to;
    let {title} = meta;
    setTitle(title);
    if (store.state.userId) {
        next()
    } else {
        store.dispatch('getUserInfo')
            .then(data => {
                if (data.code == '401') {
                    logout();
                } else {
                    next()
                }
            });
    }
})
routes.map(route => {
    route.beforeEnter = (to, from, next) => {

        // 需要登录验证
        if (route.meta.loginRequired) {
            return beforeEach(to, from, next);
        } else {
            next();
        }


    };
    if (route.children) {
        route.children.map(child => {
            child.beforeEnter = (to, from, next) => {
                if (child.meta.loginRequired) {
                    return beforeEach(to, from, next);
                } else {
                    next();
                }


            };
        });
    }
});
export default new Router({
    mode: 'history',
    routes

})
