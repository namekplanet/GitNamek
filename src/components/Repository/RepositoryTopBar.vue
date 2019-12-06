<template>
    <div v-if="selectedProject" class="flex float-right">
        <GButton class="mr-1" color="info"
            @click="showProjectSettings()"
            >
            <i class="fas fa-cog"></i>
        </GButton>
        <GButton class="mr-1" color="info"
            @click="refresh()"
            >
            <i class="fas fa-sync"></i>
        </GButton>
        <GButton class="mr-1" color="success"
            @click="pull()"
            >
            <i class="fas fa-chevron-down"></i>
        </GButton>
        <GButton class="mr-1" color="primary"
            @click="push()"
            >
            <i class="fas fa-chevron-up"></i>
            {{ selectedProject.getRepo().commitsAhead > 0 ? selectedProject.getRepo().commitsAhead : '' }}
        </GButton>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class RepositoryTopBar extends Vue {

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public push(): void {
        this.selectedProject.getRepo().push();
    }

    public pull(): void {
        this.selectedProject.getRepo().pull();
    }

    public refresh(): void {
        this.selectedProject.getRepo().refresh();
    }

    public showProjectSettings(): void {
        this.$router.push('/project/settings');
    }

}
</script>

<style scoped lang="scss">
</style>
