<template>
    <div class="flex h-10" v-if="$store.state.mainBarComponent">
        <div class="flex-1 h-full">
        </div>

        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1 mr-1">
                    <component v-bind:is="$store.state.mainBarComponent"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainBar extends Vue {

    private isDevelopment: boolean = false;

    get getSelectedMenuIndex(): number {
        return this.$store.state.menuIndex;
    }

    public mounted(): void {
        this.isDevelopment = process.env.NODE_ENV === 'development';
    }
}
</script>

<style scoped lang="scss">
</style>
