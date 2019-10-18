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
        //
    },
    actions: {
        addProject(state: any, args: any): void {
            state.openedProject = new Project('Bla Bla Bla', '/');
        }
    },
    modules: {
        //
    },
});
