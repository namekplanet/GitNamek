<template>
    <div class="overflow-scroll">
        <div v-if="title&&title!=''" class="px-1 border-b border-gray-400" :class="{'border-gray-800':isDark}">
            <span class="text-xs font-bold text-gray-500 uppercase" :class="{'text-gray-200':isDark}">{{ title }}</span>
        </div>
        <ul class="">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class List extends Base {

    @Prop({ default: '' }) public readonly title!: string;

    public mounted(): void {
        this.loadParentTheme();
    }

}
</script>

<style scoped lang="scss">
  
</style>
