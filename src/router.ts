import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home.vue';
import Project from '@/pages/Project.vue';
import ProjectSettings from '@/pages/ProjectSettings.vue';
import Settings from '@/pages/Settings.vue';
import Styles from '@/pages/Styles.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { name: 'home', path: '/', component: Home },
        { name: 'project', path: '/project', component: Project },
        { name: 'project-settings', path: '/project/settings', component: ProjectSettings },
        { name: 'settings', path: '/settings', component: Settings },
        { name: 'styles', path: '/styles', component: Styles },
    ],
});
