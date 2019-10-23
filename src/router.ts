import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home.vue';
import Project from '@/pages/Project.vue';
import Styles from '@/pages/Styles.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/project', component: Project },
        { path: '/styles', component: Styles },
    ],
});
