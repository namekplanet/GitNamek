<template>
    <div class="h-full relative"
         v-if="selectedProject.getRepo()">
         <div class="rounded bg-gray-200 p-1 mx-1">
            <div class="flex p-1 border-b border-gray-300">
                <div class="flex-1">
                    <span class="font-bold">Unstaged Files</span>
                </div>
                <div class="flex-initial text-right">
                    <Button color="success" @click="stageAll()">Stage all</Button>
                </div>
            </div>
            <div class="bg-white">
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().unstagedFiles"
                        @mouseover="visibleLine='u'+i" @mouseleave="visibleLine=''"
                        class="flex border-b border-gray-300 relative"
                        :class="{'bg-gray-100': visibleLine==='u'+i}">
                        <div>
                            <span class="text-white p-1 text-xs"
                            :class="getFileIcon(f).bgColor">
                            {{ getFileIcon(f).label }}
                        </span>
                        </div>
                        <div class="flex-1">
                            <span class="ml-1 text-sm"
                                @click="openFile(f)">
                                {{ f.path }}
                            </span>
                        </div>
                        <div class="absolute right-0 top-0 bottom-0" v-show="visibleLine==='u'+i">
                            <button
                                @click="stageFile(f)"
                                class="px-2 text-xs text-white bg-green-500 font-bold">
                                Stage
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
         </div>
         <div class="rounded bg-gray-200 p-1 m-1">
            <div class="flex p-1 border-b border-gray-300">
                <div class="flex-1">
                    <span class="font-bold">Staged Files</span>
                </div>
                <div class="flex-initial text-right">
                    <Button color="success" @click="unstageAll()">Unstage all</Button>
                </div>
            </div>
            <div class="bg-white">
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().stagedFiles"
                        @mouseover="visibleLine='s'+i" @mouseleave="visibleLine=''"
                        class="flex border-b border-gray-300 relative"
                        :class="{'bg-gray-100': visibleLine==='s'+i}">
                        <div>
                            <span class="text-white p-1 text-xs"
                            :class="getFileIcon(f).bgColor">
                            {{ getFileIcon(f).label }}
                        </span>
                        </div>
                        <div class="flex-1">
                            <span class="ml-1 text-sm"
                                @click="openFile(f)">
                                {{ f.path }}
                            </span>
                        </div>
                        <div class="absolute right-0 top-0 bottom-0" v-show="visibleLine==='s'+i">
                            <button
                                @click="unstageFile(f)"
                                class="px-2 text-xs text-white bg-orange-500 font-bold">
                                Unstage
                            </button>
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
                        <textarea class="p-1 w-full h-full bg-gray-700 font-bold" placeholder="Message:"
                            v-model="commitMessage"></textarea>
                    </div>
                    <div class="p-3">
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
            bgColor = 'bg-green-500';
        } else if (file.status === 'M') {
            bgColor = 'bg-orange-500';
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
