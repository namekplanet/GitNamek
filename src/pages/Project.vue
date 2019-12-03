<template>
    <div class="absolute inset-0" v-if="$store.state.openedProject">
        <div class="relative h-full">
            <div class="absolute inset-0">
                <div class="flex h-full">
                    <div class="w-64 h-full">
                        <div class="h-full">
                            <RepositorySideBar/>
                        </div>
                    </div>
                    <GExpander direction="left">
                        <i slot="icon-expand" class="fas fa-arrow-alt-circle-left"></i>
                        <i slot="icon-close" class="fas fa-times-circle"></i>
                        <div v-if="$store.state.openedFile" slot="left" class="h-full">
                            <FileEditor/>
                        </div>
                        <div v-else slot="left" class="h-full">
                            <RepositoryTreeCommit/>
                        </div>
                        <RepositoryFilesStage slot="right"/>
                    </GExpander>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RepositoryTopBar from '@/components/Repository/RepositoryTopBar.vue';
import RepositoryFloatSideBar from '@/components/Repository/RepositoryFloatSideBar.vue';

@Component
export default class Project extends Vue {

    public toggleFullSidebar: boolean = false;

    public mounted(): void {
        if (!this.$store.state.openedProject) {
            this.$router.push('/');
            return;
        }
        this.$store.state.mainBarComponent = RepositoryTopBar;
    }

    public destroyed(): void {
        this.$store.state.mainBarComponent = null;
    }
}
</script>

<style lang="scss">
</style>
