<template>
    <div v-if="selectedProject">
        <div>
            <div v-for="(l,i) in selectedProject.getRepo().logs" :key="i"
                class="flex flex-wrap" >
                <div class="w-32 py-1">
                    <div v-if="isRemoteHEAD(l)"  class="border border-gray-400">
                        <span>{{ 'REMOTE' }}</span>
                    </div>
                    <div v-if="isLocalHEAD(l)&&!isRemoteHEAD(l)" class="border border-gray-400">
                        <span>{{ 'LOCAL' }}</span>
                    </div>
                </div>
                <div class="flex-1 py-1">
                    <span class="ml-1">{{ l.message }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class RepositoryTreeCommit extends Vue {

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
