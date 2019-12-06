<template>
    <div class="p-2">
        <span class="text-gray-800 font-bold">Clone a Repository</span>
        <div>
            <GFormInput title="URL" @change="onURLChange" v-model="cloneURL"></GFormInput>
            <div class="relative">
                <GFormInput title="Destination Path" v-model="cloneDestination"></GFormInput>
                <GButton class="absolute top-0 mt-5 pb-2 px-3 right-0" @click="openDestinationPath">...</GButton>
            </div>

            <GFormInput title="Name" v-model="cloneName"></GFormInput>
            
            <div class="my-3">
                <GButton @click="onClone" class="float-left">
                    <i class="fas fa-download"></i>
                    <span class="ml-2">Clone</span>
                </GButton>
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
// @ts-ignore
const Git: any = require('simple-git/promise');

@Component
export default class RepositoryTopBar extends Vue {

    private cloneURL: string = '';
    private cloneDestination: string = '';
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
            this.$store.commit('addProject', new Project(this.cloneName, this.cloneDestination, this.cloneURL));
            this.cloneURL = '';
            this.cloneDestination = '';
            this.cloneName = '';
            this.showLoader = false;
        });

    }

    public onURLChange(): void {
        const data: string[] = this.cloneURL.split('/');
        this.cloneName = data[data.length - 1];
        this.cloneName = this.cloneName.charAt(0).toUpperCase() 
            + this.cloneName.slice(1).replace('.git', '');
    }

    public openDestinationPath(): void {
        remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then((result: any) => {
            if (!result.canceled && result.filePaths[0]) {
                const path: string = result.filePaths[0];
                if (this.cloneName !== '') {
                    this.cloneDestination = path + '/' + this.cloneName;
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
