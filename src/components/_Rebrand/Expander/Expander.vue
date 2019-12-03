<template>
    <div class="flex w-full h-full">
        <div class="flex-1 h-full" v-show="!expanded||expanded&&direction!=='left'">
            <slot name="left"></slot>
        </div>
        <div class="bg-gray-800 text-gray-500 h-full p-1 cursor-pointer rounded"
            @click="expanded=!expanded">
            <span v-if="direction==='left'">
                <slot v-if="!expanded" name="icon-expand"></slot>
                <slot v-else name="icon-close"></slot>
            </span>
            <span v-else>
                <slot v-if="!expanded" name="icon-expand"></slot>
                <slot v-else name="icon-close"></slot>
            </span>
        </div>
        <div class="flex-1 h-full" v-show="!expanded||expanded&&direction!=='right'">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Expander extends Base {

    @Prop({ default: 'left' }) public readonly direction!: string;
    private expanded: boolean = false;

    public mounted(): void {
        //
    }

}
</script>

<style scoped lang="scss">
  
</style>
