<template>
    <li class="px-2 py-1 hover:bg-gray-300 cursor-pointer" :class="{'hover:bg-gray-800':isDark}"
        @click="onClick">
        <div class="flex text-normal" :class="{'text-gray-200':isDark}">
            <slot name="left"></slot>
            <div class="flex-1">
                <slot></slot>
            </div>
            <slot name="right" class=""></slot>
        </div>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class ListOption extends Base {

    @Prop({ default: '' }) public readonly title!: string;

    public mounted(): void {
        this.loadParentTheme();
    }

    public onClick(): void {
        this.$emit('click');
    }

}
</script>

<style scoped lang="scss">
  
</style>
