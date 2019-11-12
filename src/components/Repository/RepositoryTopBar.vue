<template>
    <div v-if="selectedProject" class="float-right">
        <ul>
            <li class="float-left mr-1">
                <Button color="info"
                    @click="showProjectSettings()"
                >Settings</Button>
            </li>
            <li class="float-left mr-1">
                <Button color="info"
                    @click="refresh()"
                >Refresh</Button>
            </li>
            <li class="float-left mr-1">
                <Button color="success"
                    @click="pull()"
                >Pull</Button>
            </li>
            <li class="float-left mr-1">
                <Button color="primary"
                    @click="push()"
                >({{ selectedProject.getRepo().commitsAhead }}) Push</Button>
            </li>
        </ul>
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
