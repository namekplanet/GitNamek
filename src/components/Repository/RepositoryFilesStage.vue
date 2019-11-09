<template>
    <div class="h-full relative"
         v-if="selectedProject.getRepo()">
         <div class="rounded bg-gray-200 p-1 mx-1">
            <div class="flex p-1 border-b border-gray-300">
                <div class="flex-1 pt-1">
                    <span class="font-bold">Unstaged Files</span>
                </div>
                <div class="flex-initial text-right">
                    <Button color="secondary" @click="stageAll()" class="text-xs">Stage all</Button>
                </div>
            </div>
            <div class="bg-white h-40 overflow-scroll">
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().unstagedFiles"
                        @mouseover="visibleLine='u'+i" @mouseleave="visibleLine=''"
                        class="flex border-b border-gray-300 relative py-1"
                        :class="{'bg-gray-100': visibleLine==='u'+i}">
                        <div class="flex-1">
                            <div class="ml-5">
                                <span class="ml-3 text-sm"
                                    @click="openFile(f)">
                                    {{ f.path }}
                                </span>
                            </div>
                        </div>
                        <div class="absolute inset-y-0 py-1 px-1 rounded"
                            :class="getFileIcon(f).bgColor">
                            <span class="text-white p-1 text-xs">
                                {{ getFileIcon(f).label }}
                            </span>
                        </div>
                        <div class="absolute inset-y-0 right-0" v-show="visibleLine==='u'+i">
                            <Button
                                color="success"
                                @click="stageFile(f)"
                                class="text-xs">
                                Stage
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
         </div>
         <div class="rounded bg-gray-200 p-1 m-1">
            <div class="flex p-1 border-b border-gray-300">
                <div class="flex-1 pt-1">
                    <span class="font-bold">Staged Files</span>
                </div>
                <div class="flex-initial text-right">
                    <Button color="secondary" @click="unstageAll()" class="text-xs">Unstage all</Button>
                </div>
            </div>
            <div class="bg-white h-40 overflow-scroll">
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().stagedFiles"
                        @mouseover="visibleLine='s'+i" @mouseleave="visibleLine=''"
                        class="flex border-b border-gray-300 relative py-1"
                        :class="{'bg-gray-100': visibleLine==='s'+i}">
                        <div class="flex-1">
                            <div class="ml-5">
                                <span class="ml-3 text-sm"
                                    @click="openFile(f)">
                                    {{ f.path }}
                                </span>
                            </div>
                        </div>
                        <div class="absolute inset-y-0 py-1 px-1 rounded"
                            :class="getFileIcon(f).bgColor">
                            <span class="text-white p-1 text-xs">
                                {{ getFileIcon(f).label }}
                            </span>
                        </div>
                        <div class="absolute inset-y-0 right-0" v-show="visibleLine==='s'+i">
                            <Button
                                color="warning"
                                @click="unstageFile(f)"
                                class="text-xs">
                                Unstage
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="absolute bottom-0 inset-x-0 ">
            <div class="rounded bg-gray-200 p-1 m-1">
                <div class="flex p-1 border-b border-gray-300">
                    <span class="font-bold">Commit Message</span>
                </div>
                <div>
                    <div class="h-32">
                        <textarea class="p-1 w-full h-full bg-white font-bold" placeholder="Message:"
                            v-model="commitMessage"></textarea>
                    </div>
                    <div class="mt-1">
                        <Button class="w-full py-3"
                            :disabled="commitMessage===''"
                            @click="commit()">Commit</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class RepositoryFilesStage extends Vue {

    public visibleLine: string = '';
    public commitMessage: string = '';

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public stageFile(file: any): void {
        this.selectedProject.getRepo().stageFile(file);
    }

    public stageAll(): void {
        this.selectedProject.getRepo().stageAll();
    }

    public unstageFile(file: any): void {
        this.selectedProject.getRepo().unstageFile(file);
    }

    public unstageAll(): void {
        this.selectedProject.getRepo().unstageAll();
    }

    public commit(): void {
        const request = async () => {
            return await this.selectedProject.getRepo().commit(this.commitMessage);
        };
        request().then(() => {
            this.commitMessage = '';
        });
    }

    public getFileIcon(file: any): any {
        let label: string = file.status;
        let bgColor: string = 'bg-black';
        if (file.status === '?' || file.status === 'A') {
            label = 'N';
            bgColor = 'bg-green-800';
        } else if (file.status === 'M') {
            bgColor = 'bg-orange-600';
        } else if (file.status === 'D') {
            bgColor = 'bg-red-700';
        }
        return { label, bgColor };
    }

    public openFile(file: any): void {
        this.$store.state.openedFile = file;
    }

}
</script>

<style scoped lang="scss">
</style>
