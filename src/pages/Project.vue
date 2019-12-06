<template>
    <GLayoutAsideExpander :left="showLeftAside" :right="trushowRightAside" v-if="$store.state.openedProject">
        <RepositorySideBar slot="left"/>
        <FileEditor v-if="$store.state.openedFile" />
        <RepositoryTreeCommit v-else/>
        <RepositoryFilesStage slot="right"/>
    </GLayoutAsideExpander>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RepositoryTopBar from '@/components/Repository/RepositoryTopBar.vue';
import RepositoryFloatSideBar from '@/components/Repository/RepositoryFloatSideBar.vue';

@Component
export default class Project extends Vue {

    public toggleFullSidebar: boolean = false;
    private showLeftAside: boolean = false;
    private trushowRightAside: boolean = false;

    public mounted(): void {
        if (!this.$store.state.openedProject) {
            this.$router.push('/');
            return;
        }
        this.$store.state.mainBarComponentRight = RepositoryTopBar;
        setTimeout(() => {
            this.showLeftAside = true;
            this.trushowRightAside = true;
        }, 0);
    }

    public destroyed(): void {
        this.$store.state.mainBarComponentRight = null;
    }
}
</script>

<style lang="scss">
</style>
