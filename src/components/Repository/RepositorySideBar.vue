<template>
    <div class="h-full" v-if="selectedProject.getRepo()">
        <div class="flex flex-col px-1">
            <GCard title="Local" class="mb-1">
                <GList>
                    <GListOption v-for="(r,i) in selectedProject.getRepo().branchLocal" :key="i">{{ r.name }}</GListOption>
                </GList>
            </GCard>
            <GCard title="Remote" class="mb-1">
                <GList>
                    <GListOption v-for="(r,i) in selectedProject.getRepo().branchRemote" :key="i">{{ r.name }}</GListOption>
                </GList>
            </GCard>
            <GCard title="Tags" class="mb-1">
                <GList>
                    <GListOption v-for="(r,i) in selectedProject.getRepo().tags" :key="i">{{ r.name }}</GListOption>
                </GList>
            </GCard>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class RepositorySideBar extends Vue {

    public listRepositories: string[] = [];
    public showNewBranchLocal: boolean = false;
    public branchNameLocal: string = '';

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public onDropdownAction(value: any): void {
        if (value === 1) {
            this.showNewBranchLocal = true;
        }
    }

    public createNewBranchLocal(): void {
        this.selectedProject.getRepo().createLocalBranch(this.branchNameLocal);
        this.branchNameLocal = '';
        this.showNewBranchLocal = false;
    }
}
</script>

<style scoped lang="scss">
</style>
