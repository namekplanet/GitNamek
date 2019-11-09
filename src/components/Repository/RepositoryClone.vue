<template>
    <div>
        <span class="text-gray-800 font-bold">Clone a Repository</span>
        <div>
            <div class="my-1">
                <label>URL</label>
                <input type="text"
                    class="w-full p-1 bg-white font-bold border border-gray-300 rounded"
                    @change="onURLChange"
                    v-model="cloneURL">
            </div>
            <div class="my-1">
                <label>Destination Path</label>
                <div class="relative">
                    <input type="text"
                        class="w-full p-1 bg-white font-bold border border-gray-300 rounded"
                        v-model="cloneDestination">
                    <Button class="absolute right-0" @click="openDestinationPath">...</Button>
                </div>
            </div>
            <div class="my-1">
                <label>Name</label>
                <input type="text"
                    class="w-full p-1 bg-white font-bold border border-gray-300 rounded"
                    v-model="cloneName">
            </div>
            <div class="my-3">
                <Button @click="onClone" class="float-left">
                    <i class="fas fa-download"></i>
                    <span class="ml-2">Clone</span>
                </Button>
                <Loader v-if="showLoader" class="ml-3" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
import { remote } from 'electron';
import * as fs from 'fs';
const Git: any = require('simple-git/promise');

@Component
export default class RepositoryTopBar extends Vue {

    private cloneURL: string = 'https://github.com/editor-js/code.git';
    private cloneDestination: string = '/usr/local/var/www/teste';
    private cloneName: string = '';
    private showLoader: boolean = false;

    public mounted(): void {
        //
    }

    public onClone(): void {
        this.showLoader = true;
        const request: any = async (remoteUri: string, localPath: string) => {
            return await Git().clone(remoteUri, localPath);
        };
        request(this.cloneURL, this.cloneDestination).then((data: any) => {
            this.$store.commit('addProject', new Project(this.cloneName, this.cloneDestination));
            this.cloneURL = '';
            this.cloneDestination = '';
            this.cloneName = '';
            this.showLoader = false;
        });

    }

    public onURLChange(): void {
        const data: string[] = this.cloneURL.split('/');
        this.cloneName = data[data.length - 1];
    }

    public openDestinationPath(): void {
        remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then((result: any) => {
            if (!result.canceled && result.filePaths[0]) {
                const path: string = result.filePaths[0];
                if (this.cloneName != '') {
                    this.cloneDestination = path/* + '/' + this.cloneName*/;
                } else {
                    this.cloneDestination = path;
                }
            }
        });
    }
}
</script>

<style scoped lang="scss">
</style>
