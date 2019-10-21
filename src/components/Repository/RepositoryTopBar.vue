<template>
    <div v-if="selectedProject" class="float-right">
        <ul>
            <li class="float-left mr-2">
                <button class="bg-blue-400 text-gray-100 rounded px-1"
                    @click="refresh()"
                >Refresh</button>
            </li>
            <li class="float-left mr-2">
                <button class="bg-blue-500 text-gray-100 rounded px-1"
                    @click="pull()"
                >Pull</button>
            </li>
            <li class="float-left mr-2">
                <button class="bg-green-500 text-gray-100 rounded px-1"
                    @click="push()"
                >({{ selectedProject.getRepo().commitsAhead }}) Push</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
var Git = require('nodegit');

@Component
export default class RepositoryTopBar extends Vue {

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    mounted() {
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

}
</script>

<style scoped lang="scss">
</style>
