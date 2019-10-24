<template>
    <div v-if="selectedProject">
        <div>
            <div v-for="(l,i) in selectedProject.getRepo().logs" :key="i"
                class="flex flex-wrap" >
                <div class="w-32">
                    <div v-if="isRemoteHEAD(l)" class="bg-green-900 p-1">
                        <span>{{ 'REMOTE' }}</span>
                    </div>
                    <div v-if="isLocalHEAD(l)&&!isRemoteHEAD(l)" class="bg-green-900 p-1">
                        <span>{{ 'LOCAL' }}</span>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="p-1 cursor-pointer hover:bg-gray-800">{{ l.message }}</div>
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
