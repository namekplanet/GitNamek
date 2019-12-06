import Vue from 'vue';
import Vuex from 'vuex';

import { Project } from '@/models';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        projects: [] as Project[],
        openedProject: null,
        menuIndex: 0 as number,
        openedFile: null,
        mainBarComponentLeft: null,
        mainBarComponentRight: null,
    },
    mutations: {
        loadProjects(state: any): void {
            const data: any = localStorage.getItem('JUPON_PROJECTS');
            if (data) {
                const projects: any = JSON.parse(data);
                state.projects.splice(0, state.projects.length);
                projects.forEach((p: any) => {
                    state.projects.push(new Project(p.name, p.path, p.uri));
                });
            }
        },
        addProject(state: any, project: Project): void {
            state.projects.push(project);
            localStorage.setItem('JUPON_PROJECTS', JSON.stringify(state.projects));
        },
        removeProject(state: any, project: Project): void {
            const index: number = state.projects.indexOf(project);
            if (index >= 0) {
                state.projects.splice(index, 1);
            }
            localStorage.setItem('JUPON_PROJECTS', JSON.stringify(state.projects));
        },
        openProject(state: any, project: Project): void {
            state.openedProject = project;
            state.openedProject.openRepo();
            state.menuIndex = 1;
        },
    },
    actions: {
        //
    },
    modules: {
        //
    },
});
