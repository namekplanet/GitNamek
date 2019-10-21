<template>
    <div v-if="selectedProject">
        <div>
            <div v-for="(l,i) in selectedProject.getRepo().logs" :key="i"
                class="flex flex-wrap" >
                <div class="py-1 w-full" :class="{'border border-gray-400': isLogHEAD(l)}">
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

    mounted() {
    }

    public isLogHEAD(log: any): boolean {
        return log.refs.indexOf('HEAD ->') >= 0;
    }

}
</script>

<style scoped lang="scss">
</style>
