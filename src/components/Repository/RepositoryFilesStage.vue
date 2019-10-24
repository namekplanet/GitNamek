<template>
    <div class="h-full"
         v-if="selectedProject.getRepo()">
         <div>
            <div class="flex bg-gray-800 p-1 border-b border-gray-600">
                <div class="flex-1">
                    <span class="">Unstaged Files</span>
                </div>
                <div class="flex-initial text-right">
                    <Button color="success" @click="stageAll()">Stage all</Button>
                </div>
            </div>
            <div>
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().unstagedFiles"
                        @mouseover="visibleLine='u'+i" @mouseleave="visibleLine=''"
                        class="border-b border-gray-800 relative"
                        :class="{'bg-gray-100': visibleLine==='u'+i}">
                        <span class="text-white p-1 text-xs"
                            :class="getFileIcon(f).bgColor">
                            {{ getFileIcon(f).label }}
                        </span>
                        <span class="ml-1 text-sm">{{ f.path }}</span>
                        <button v-show="visibleLine==='u'+i"
                            @click="stageFile(f)"
                            class="px-2 text-xs absolute top-0 bottom-0 right-0 text-white bg-green-500 font-bold"
                            >Stage</button>
                    </li>
                </ul>
            </div>
         </div>
         <div>
            <div class="bg-gray-800 p-1 border-b border-gray-600">Staged Files</div>
            <div>
                <ul class="w-full cursor-pointer">
                    <li v-for="(f,i) in selectedProject.getRepo().stagedFiles"
                        @mouseover="visibleLine='s'+i" @mouseleave="visibleLine=''"
                        class="border-b border-gray-800 relative"
                        :class="{'bg-gray-100': visibleLine==='s'+i}">
                        <span class="text-white p-1 text-xs"
                            :class="getFileIcon(f).bgColor">
                            {{ getFileIcon(f).label }}
                        </span>
                        <span class="ml-1 text-sm">{{ f.path }}</span>
                        <button v-show="visibleLine==='s'+i"
                            @click="unstageFile(f)"
                            class="px-2 text-xs absolute top-0 bottom-0 right-0 text-white bg-orange-500 font-bold">Untage</button>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <div class="bg-gray-800 p-1 border-b border-gray-600">Commit</div>
            <div>
                <div>
                    <textarea class="w-full border" placeholder="Message:"
                        v-model="commitMessage"></textarea>
                </div>
                <div>
                    <button class="bg-blue-600 text-white p-2 w-full rounded"
                        :disabled="commitMessage===''"
                        @click="commit()">Commit</button>
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

    public commit(): void {
        this.selectedProject.getRepo().commit(this.commitMessage);
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

}
</script>

<style scoped lang="scss">
</style>
