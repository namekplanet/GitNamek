<template>
    <div>
        <input type="text" name="CommandInputName" class="border w-full rounded p-1 px-2"
            v-model="inputCommand"
            v-on:keyup.enter="onKeyEnter">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
const fs = require('fs');

@Component
export default class TerminalInput extends Vue {

    private inputCommand: string = 'open C:\\REDCATS\\DEVS\\JupiterOne';

    public onKeyEnter(evt: any): void {
        const args: string[] = this.inputCommand.split(' ');
        const command: string = args.length >= 1 ? args[0] : null;

        if (command) {
            const path: string = args.length >= 2 ? args[1] : null;
            if (command.toLowerCase() == 'open') {
                this.cmdOpen(path);
            }
        }
    }

    public cmdOpen(path: string): void {
        console.log('path', path);
        const self = this;
        fs.stat(path, function(err: any, stats: any) {
            if (stats && stats.isDirectory()) {
                console.log(stats.isDirectory());
                self.isRepository(path).then((response: boolean) => {
                    if(response) {
                        self.openGitProject(path);
                    }
                });
            } else {
                console.error(err);
            }
        });
	}

    public isRepository(path: string): Promise<boolean> {
        const self = this;
        return new Promise<boolean>((resolve: any, reject: any) => {
            fs.stat(path + '\\.git', function(err: any, stats: any) {
                if (stats && stats.isDirectory()) {
                    console.log('IS GIT REPO');
                    resolve(true);
                } else {
                    console.error(err);
                    resolve(false);
                }
            });
        });
    }

    public openGitProject(path: string): void {
        console.log('openGitProject');
        this.$store.commit('addProject', {
            name: 'Bla Bla',
            path: path 
        });
    }
}
</script>

<style scoped lang="scss">
</style>
