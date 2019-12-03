<template>
    <div v-if="selectedProject" class="relative h-full mb-5 mx-1">
        <GCard title="Last Commits" class="absolute inset-0 mb-5">
            <GList class="h-screen max-h-full">
                <GListOption v-for="(l,i) in selectedProject.getRepo().logs" :key="i">
                    <!-- <span slot="left" class="px-1 mr-2">X</span> -->
                    <span>{{ l.message }}
                        <GBadge class="ml-1" v-if="isRemoteHEAD(l)" color="success">Remote</GBadge>
                        <GBadge class="ml-1" v-if="isLocalHEAD(l)" color="primary">Local</GBadge>
                    </span>
                </GListOption>
            </GList>
        </GCard>
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
