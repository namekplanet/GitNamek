<template>
    <div class="flex w-full h-full">
        <div class="w-64 h-full border-r" v-show="collapsedLeft">
            <slot name="left"></slot>
        </div>
        <div class="flex-1 h-full">
            <slot></slot>
        </div>
        <div class="w-64 h-full border-l" v-show="collapsedRight">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class LayoutAsideExpander extends Vue {

    @Prop({default: false}) public readonly left!: boolean;
    @Prop({default: false}) public readonly right!: boolean;
    public collapsedLeft: boolean = false;
    public collapsedRight: boolean = false;

    public mounted(): void {
        //
    }

    @Watch('left')
    public onCollapseLeft(val: boolean, oldVal: boolean) {
        this.collapsedLeft = val;
    }

    @Watch('right')
    public onCollapseRight(val: boolean, oldVal: boolean) {
        this.collapsedRight = val;
    }

}
</script>

<style scoped lang="scss">
</style>
