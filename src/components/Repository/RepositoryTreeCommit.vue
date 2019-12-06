<template>
    <div v-if="selectedProject" class="relative h-full mb-5 mx-1">
        <GCard title="Last Commits" class="absolute inset-0 mb-5">
            <GList class="h-screen max-h-full">
                <GListOption v-for="(l,i) in processedLogs.reverse()" :key="i">
                    <div slot="left" class="treelinefork px-1 mr-2" :style="'margin-left: '+(l.forkLevel-1)*20+'px;'">
                        <div class="treelinefork-dot" :class="levelColors[l.forkLevel-1]"></div>
                        <div class="treelinefork-line" :class="levelColors[l.forkLevel-1]"></div>
                    </div>
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

    private levelColors: string[] = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500'];

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    get processedLogs(): any {
        console.log('Logs', this.selectedProject.getRepo().logs);
        
        const forks: any[] = [];
        const forksLevels: any[] = [];
        const logs: any[] = [];
        const clone: any[] = this.selectedProject.getRepo().logs.map((a: any) => Object.assign({}, a));
        while (clone.length > 0) {
            const elem: any = clone.pop();
            elem.isFork = false;

            // Find new forks
            if (elem.parents.length === 1 && forks[elem.parent] === undefined) {
                forks[elem.parent] = {
                    childs: [],
                };
            }
            // add new childs
            if (elem.parents.length === 1 && forks[elem.parent] !== undefined) {
                if (forks[elem.parent].childs[elem.hash] === undefined) {
                    forks[elem.parent].childs.push(elem.hash);
                    forksLevels[elem.hash] = forks[elem.parent].childs.length;
                    elem.isFork = true;
                }
                // Add fork Levels
                if (forksLevels[elem.parent] > forksLevels[elem.hash]) {
                    forksLevels[elem.hash] = forksLevels[elem.parent];
                }
            }

            // find merges
            elem.isMerge = elem.parents.length > 1;
            // set fork level
            elem.forkLevel = forksLevels[elem.hash] !== undefined && forksLevels[elem.hash] > 1 ? forksLevels[elem.hash] : 1;
            logs.push(elem);
        }
        return logs;
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
.treelinefork {
    position: relative;
    &-line {
        position: absolute;
        left: 4px;
        height: 150%;
        width: 2px;
    }

    &-dot {
        position: absolute;
        top: 5px;
        left: 2px;
        border-radius: 50%;
        padding: 3px;
    }
}
</style>
