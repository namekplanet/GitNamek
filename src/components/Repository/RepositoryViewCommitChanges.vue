<template>
    <div v-if="selectedProject">
        <div class="">
            <div v-for="(l,i) in selectedProject.getRepo().logs" :key="i"
                class="flex flex-wrap" >
                <div class="w-32">
                    <div v-if="isRemoteHEAD(l)" class="bg-green-600 rounded shadow p-1">
                        <span class="text-gray-100 font-bold">{{ 'REMOTE' }}</span>
                    </div>
                    <div v-if="isLocalHEAD(l)&&!isRemoteHEAD(l)" class="bg-orange-600 rounded shadow p-1">
                        <span class="text-gray-100 font-bold">{{ 'LOCAL' }}</span>
                    </div>
                </div>
                <div class="flex-1 ml-2">
                    <div class="p-1 cursor-pointer rounded hover:bg-white hover:shadow">
                        <span class="text-gray-900">{{ l.message }}</span>
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
export default class RepositoryViewCommitChanges extends Vue {

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public isLocalHEAD(log: any): boolean {
        return log.refs.indexOf('HEAD ->') >= 0;
    }

    public isRemoteHEAD(log: any): boolean {
        return log.refs.indexOf(', ') >= 0;
    }

}
</script>

<style scoped lang="scss">
</style>
