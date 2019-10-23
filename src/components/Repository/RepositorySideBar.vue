<template>
    <div class="h-full"
         v-if="selectedProject.getRepo()">
        <ul>
        	<li>
                <div class="bg-gray-800 p-1 border-b border-gray-600">LOCAL</div>
                <ul class="ml-4">
                    <li v-for="(r,i) in selectedProject.getRepo().refsLocal">{{ r.name }}</li>
                </ul>
            </li>
            <li>
                <div class="bg-gray-800 p-1 border-b border-gray-600">REMOTE</div>
                <ul class="ml-4">
                    <li v-for="(r,i) in selectedProject.getRepo().refsRemote">{{ r.name }}</li>
                </ul>
            </li>
            <li>
                <div class="bg-gray-800 p-1 border-b border-gray-600">TAGS</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';

@Component
export default class RepositorySideBar extends Vue {

    public listRepositories: string[] = [];

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }
}
</script>

<style scoped lang="scss">
</style>
