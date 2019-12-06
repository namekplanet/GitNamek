<template>
    <GLayoutAsideExpander :left="showLeftAside">
        <div slot="left">
            <GList title="List of projects">
                <GButton slot="right" size="xs" @click="openLocalRepository()" color="primary" class="px-1">
                    <i class="fas fa-plus"></i>
                </GButton>
                <GListOption v-for="(p,i) in projectsList" :key="i">
                    <div @click="onpenGitRepository(p)">{{ p.name }}</div>
                    <button slot="right" @click="removeLocalRepository(p)">Remove</button>
                </GListOption>
            </GList>
        </div>
        <RepositoryClone/>
    </GLayoutAsideExpander>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
import { remote } from 'electron';
import * as fs from 'fs';

@Component
export default class Home extends Vue {

    private showLeftAside: boolean = false;

    get projectsList(): Project[] {
        return this.$store.state.projects;
    }

    public mounted(): void {
        this.$store.commit('loadProjects');
        setTimeout(() => {
            this.showLeftAside = true;
        }, 0);
    }

    /**
     * Open local repository if has a valid repository
     */
    public openLocalRepository(): void {
        remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then((result: any) => {
            if (!result.canceled && result.filePaths[0]) {
                const path: string = result.filePaths[0];
                this.isValidRepo(path).then((isValid: boolean) => {
                    if (isValid) {
                        // add to list of repos
                        const pathSplit: string[] = path.split('/');
                        this.$store.commit('addProject', new Project(pathSplit[pathSplit.length - 1], path, ''));
                    }
                });
            }
        });
    }

    /**
     * Open Git Repository
     *
     * @param {Project} project
     */
    public onpenGitRepository(project: Project): void {
        this.$store.commit('openProject', project);
        this.$router.push('/project');
    }

    /**
     * Remove list of local repositories
     *
     * @param {Project} project
     */
    public removeLocalRepository(project: Project): void {
        this.$store.commit('removeProject', project);
    }

    /**
     * Validate if selected path is a git repository
     *
     * @param  {string} path
     * @return {Promise<boolean>}
     */
    private isValidRepo(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            fs.stat(path + '/.git', (err: any, stats: any) => {
                resolve(stats && stats.isDirectory());
            });
        });
    }
}
</script>

<style lang="scss">
</style>
