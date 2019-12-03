<template>
    <div class="rounded-sm bg-gray-200 border border-gray-200 overflow-hidden" :class="{'bg-gray-900 border-gray-800':isDark}">
        <div class="px-2 pt-2 border-b border-gray-400" :class="{'bg-gray-800 border-gray-800':isDark}">
            <div class="flex">
                <div class="flex-1">
                    <span class="font-bold text-sm" :class="{'text-gray-500':isDark}">{{ title }}</span>
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
            class="pb-2 pt-1 border-t border-gray-400" :class="{'bg-gray-800 border-gray-800 text-gray-200':isDark}">
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
