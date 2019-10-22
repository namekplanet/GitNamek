import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home';
import Project from '@/pages/Project';
import Styles from '@/pages/Styles';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/project', component: Project },
        { path: '/styles', component: Styles }
    ]
});
