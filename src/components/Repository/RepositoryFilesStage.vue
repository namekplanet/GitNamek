<template>
    <div v-if="selectedProject.getRepo()" class="flex flex-col h-full mx-1">
        <div class="h-full mb-1">
            <GCard title="Unstaged Files" class="h-full pb-6">
                <GButton slot="action" size="xs" @click="stageAll()">Stage all</GButton>
                <GList class="h-full mt-1 mb-5">
                    <GListOption v-for="(f,i) in selectedProject.getRepo().unstagedFiles" :key="i">
                        <span slot="left" class="px-1 mr-1" :class="getFileIcon(f).bgColor">{{ getFileIcon(f).label }}</span>
                        <span @click="openFile(f)">{{ f.path }}</span>
                        <GButton
                            slot="right"
                            color="success"
                            size="xs"
                            @click="stageFile(f)">
                            Stage
                        </GButton>
                    </GListOption>
                </GList>
            </GCard>
        </div>
        <div class="h-full mb-1">
            <GCard title="Staged Files" class="h-full pb-6">
                <GButton slot="action" size="xs" @click="unstageAll()">Unstage all</GButton>
                <GList class="h-full mt-1 mb-5">
                    <GListOption v-for="(f,i) in selectedProject.getRepo().stagedFiles" :key="i">
                        <span slot="left" class="px-1 mr-1" :class="getFileIcon(f).bgColor">{{ getFileIcon(f).label }}</span>
                        <span @click="openFile(f)">{{ f.path }}</span>
                        <GButton
                            slot="right"
                            color="warning"
                            size="xs"
                            @click="unstageFile(f)">
                            Unstage
                        </GButton>
                    </GListOption>
                </GList>
            </GCard>
        </div>
        <div class="h-60">
            <GCard title="Commit message" class="h-60">
                <GInput type="textarea" placeholder="Message:" v-model="commitMessage"
                    class="h-32"/>
                <GButton slot="footer" class="w-full mx-1"
                            :disabled="commitMessage===''"
                            @click="commit()">Commit</GButton>
            </GCard>
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
        let bgColor: string = 'text-black';
        if (file.status === '?' || file.status === 'A') {
            label = 'N';
            bgColor = 'text-green-800';
        } else if (file.status === 'M') {
            bgColor = 'text-orange-600';
        } else if (file.status === 'D') {
            bgColor = 'text-red-700';
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
