<template>
    <div class="bg-gray-100 overflow-hidden">
        <div class="border-b border-gray-400">
            <div class="flex">
                <div class="flex-1">
                    <span class="font-bold text-sm">{{ title }}</span>
                </div>
                <div>
                    <slot name="action"></slot>
                </div>
            </div>
            <slot v-if="!!$slots['header']" name="header"></slot>
        </div>
        <div class="h-full">
            <slot></slot>
        </div>
        <div v-if="!!$slots['footer']" 
            class="border-t border-gray-400">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Card extends Base {

    @Prop({ default: '' }) public readonly title!: string;

    public mounted(): void {
        this.loadParentTheme();
    }

}
</script>

<style scoped lang="scss">
  
</style>
