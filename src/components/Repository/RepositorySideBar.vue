<template>
    <div class="bg-red-900 h-full">
    	sidebar
        <ul>
        	<li></li>
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
