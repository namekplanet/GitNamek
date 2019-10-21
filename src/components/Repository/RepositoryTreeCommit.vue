<template>
    <div v-if="selectedProject">
        <div>
            <div v-for="(l,i) in selectedProject.getRepo().logs" :key="i"
                class="flex flex-wrap" >
                <div class="py-1">
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

}
</script>

<style scoped lang="scss">
</style>
