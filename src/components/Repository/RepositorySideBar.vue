<template>
    <div class="h-full"
         v-if="selectedProject.getRepo()">
        <ul>
        	<li class="bg-white rounded p-1 mx-1">
                <div class="p-1">
                    <div class="flex">
                        <div class="flex-1">
                            <span class="font-bold">LOCAL</span>
                        </div>
                        <div class="">
                            <Dropdown label="+" @click="onDropdownAction">
                                <DropdownItem label="Create New" :value="1"></DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <ul class="bg-gray-200">
                    <li v-for="(r,i) in selectedProject.getRepo().branchLocal" :key="i">
                        <div class="flex">
                            <div class="flex-1 cursor-pointer hover:bg-gray-600 hover:text-white py-1 px-3">
                                <span>{{ r.name }}</span>
                            </div>
                            <div class="">
                            </div>
                        </div>
                    </li>
                    <li v-if="showNewBranchLocal">
                        <div class="flex p-1">
                            <div class="flex-1">
                                <input type="text" class="w-full p-1" v-model="branchNameLocal">
                            </div>
                            <div class="">
                                <Button v-if="branchNameLocal==''" @click="showNewBranchLocal=false" color="warning">C</Button>
                                <Button v-else @click="createNewBranchLocal" color="primary">+</Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="bg-white rounded p-1 m-1">
                <div class="p-1">
                    <span class="font-bold">REMOTE</span>
                </div>
                <ul class="bg-gray-200">
                    <li v-for="(r,i) in selectedProject.getRepo().branchRemote">
                        <div class="flex">
                            <div class="flex-1 cursor-pointer hover:bg-gray-600 hover:text-white py-1 px-3">
                                <span>{{ r.name }}</span>
                            </div>
                            <div class="">
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="bg-white rounded p-1 m-1">
                <div class="p-1">
                    <span class="font-bold">TAGS</span>
                </div>
                <ul class="bg-gray-200">
                    <li v-for="(t,i) in selectedProject.getRepo().tags">{{ t }}</li>
                </ul>
            </li>
        </ul>
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
