<template>
    <div class="absolute inset-0">
        <div class="relative h-full p-3">
            <div class="h-12">
                <Button @click="openLocalRepository()" >Open Local Repository
                </Button>
            </div>

            <div>
                <span>List of projects</span>
                <div>
                    <ul>
                        <li v-for="(p,i) in projectsList" :key="i">
                            <div class="bg-gray-700 cursor-pointer p-2"
                                @click="onpenGitRepository(p)">
                                <span>{{ p.name }}</span>
                            </div>
                        </li>
                    </ul>
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
