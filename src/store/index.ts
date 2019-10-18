import Vue from 'vue';
import Vuex from 'vuex';

import { Project } from '@/models';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        projects: [] as Project[],
        openedProject: null,
    },
    mutations: {
        addProject(state: any, args: any): void {
            console.log('addProject');
            state.openedProject = new Project(args['name'], args['path']);
            state.projects.push(state.openedProject);
        }
    },
    actions: {
        //
    },
    modules: {
        //
    },
});
