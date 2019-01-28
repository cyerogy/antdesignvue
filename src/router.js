import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

function lazyLoadView(AsyncView) {
    let AsyncHandler = () => ({
        component: AsyncView,
        loading: require('./components/loading.vue'),
        delay: 200,
        timeout: 10000
    });
    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            return h(AsyncHandler, data, children);
        }
    });
}



const about = () => lazyLoadView(import('./views/About.vue'))

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                keepAlive: false //需要被缓存的组件
            },
        },
        {
            path: '/about',
            name: 'about',
            component: about
        }
    ]
})