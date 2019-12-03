<template>
    <div v-if="selectedProject" class="flex float-right">
        <GButton class="mr-1" color="info"
            @click="showProjectSettings()"
        >Settings</GButton>
        <GButton class="mr-1" color="info"
            @click="refresh()"
        >Refresh</GButton>
        <GButton class="mr-1" color="success"
            @click="pull()"
        >Pull</GButton>
        <GButton class="mr-1" color="primary"
            @click="push()"
        >({{ selectedProject.getRepo().commitsAhead }}) Push</GButton>
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
