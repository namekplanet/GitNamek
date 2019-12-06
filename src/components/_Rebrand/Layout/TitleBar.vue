<template>
    <div class="titlebar py-1">
        <div class="flex">
            <div class="w-20">
            </div>
            <div>
                <GButton @click="goBack()" color="primary" v-if="this.$route.name!=='home'">
                    <i class="fas fa-chevron-left"></i>
                </GButton>
                <component v-bind:is="$store.state.mainBarComponentLeft"></component>
            </div>
            <div class="flex-1 text-center">
                <span>{{ title }}</span>
                <span v-if="selectedProject"> - {{ selectedProject.name }}</span>
            </div>
            <div>
                <component v-bind:is="$store.state.mainBarComponentRight"></component>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';
import { Project } from '@/models';

@Component
export default class TitleBar extends Vue {

    @Prop({ default: '' }) public title!: string;

    get selectedProject(): Project {
        return this.$store.state.openedProject;
    }

    public mounted(): void {
        //
    }

    public goBack() {
        this.$router.back();
    }

}
</script>

<style scoped lang="scss">
.titlebar {
    background-color: var(--background-color);
    border-bottom: 1px solid var(--box-color);
    -webkit-user-select: none;
    -webkit-app-region: drag;
}
</style>
