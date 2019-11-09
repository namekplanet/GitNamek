<template>
    <div class="flex h-10">
        <div class="flex-1 h-full">
            <div class="flex content-center flex-wrap h-full">
                <div class="flex-1 pl-3">
                    <Button @click="$router.push('/')">
                        <i class="fas fa-home"></i>
                        <span class="ml-2 font-bold">Home</span>
                    </Button>
                </div>
            </div>
        </div>

        <div class="flex-1 h-full" v-if="$store.state.mainBarComponent">
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
