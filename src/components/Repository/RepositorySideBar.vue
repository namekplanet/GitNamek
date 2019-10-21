<template>
    <div class="h-full"
         v-if="selectedProject.getRepo()">
        <ul>
        	<li>
                <div class="shadow">LOCAL</div>
                <ul class="ml-4">
                    <li v-for="(r,i) in selectedProject.getRepo().refsLocal">{{ r.name }}</li>
                </ul>
            </li>
            <li>
                <div class="shadow">REMOTE</div>
                <ul class="ml-4">
                    <li v-for="(r,i) in selectedProject.getRepo().refsRemote">{{ r.name }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Project } from '@/models';
var Git = require('nodegit');

@Component
export default class RepositorySideBar extends Vue {

    public listRepositories: string[] = [];

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }


    mounted() {
        this.openGitRepo();
    }

    public openGitRepo(): void {
        console.log('GIT: ', this.selectedProject);

        this.selectedProject.openRepo().then((response: any) => {
            console.log('is opened: ' + response);
        });

    }

}
</script>

<style scoped lang="scss">
</style>
