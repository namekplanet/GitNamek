<template>
    <div class="absolute inset-0">
        <div class="relative h-full p-3">
            <div class="h-12">
                <Button @click="openLocalRepository()" >Open Local Repository
                </Button>

                <router-link to="/styles">Styles</router-link>
            </div>

            <div>
                <span>List of projects</span>
                <div>
                    <ul>
                        <li v-for="(p,i) in projectsList" :key="i">
                            <span>{{ p.name}}</span>
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
const { dialog } = require('electron').remote;
const fs = require('fs');

@Component
export default class Home extends Vue {

    get projectsList(): Project[] {
        return this.$store.state.projects;
    }

    /**
     * Open local repository if has a valid repository
     */
    public openLocalRepository(): void {
        dialog.showOpenDialog({ properties: ['openDirectory'] }).then((result: any) => {
            if (!result.canceled && result.filePaths[0]) {
                const path: string = result.filePaths[0];
                this.isValidRepo(path).then((isValid: boolean) => {
                    if (isValid) {
                        // add to list of repos
                        this.projectsList.push(new Project('PROJ NAME', path));
                    }
                });
            }
        });
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
