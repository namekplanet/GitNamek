<template>
    <div v-if="selectedProject">
        <div>
            <button class="bg-green-500 text-white rounded px-1"
                @click="push()"
            >({{ selectedProject.getRepo().commitsAhead }})Push</button>
        </div>
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

}
</script>

<style scoped lang="scss">
</style>
