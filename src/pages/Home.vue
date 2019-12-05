<template>
    <div class="absolute inset-0">
        <div class="relative h-full p-3">
            <div class="h-12">
                <GButton @click="openLocalRepository()" >
                    Open Local Repository
                </GButton>
            </div>

            <div class="flex">
                <div class="w-64">
                    <GCard title="List of projects">
                        <GList>
                            <GListOption v-for="(p,i) in projectsList" :key="i">
                                <div @click="onpenGitRepository(p)">{{ p.name }}</div>
                                <button slot="right" @click="removeLocalRepository(p)">Remove</button>
                            </GListOption>
                        </GList>
                    </GCard>
                </div>
                <div class="flex-1 min-w-xs max-w-lg px-2">
                    <RepositoryClone />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
import { remote } from 'electron';
import * as fs from 'fs';

@Component
export default class Home extends Vue {

    get projectsList(): Project[] {
        return this.$store.state.projects;
    }

    public mounted(): void {
        this.$store.commit('loadProjects');
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
                        this.$store.commit('addProject', new Project(pathSplit[pathSplit.length - 1], path));
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
