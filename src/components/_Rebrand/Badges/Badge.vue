<template>
    <span class="px-1 mr-1 rounded bg-gray-700 text-gray-400 font-thin text-xs" :class="colorClasses">
        <slot/>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Badge extends Base {

    @Prop({ default: 'md' }) public readonly size!: string;
    private xsStyle: string = 'px-1 py-0 rounded-sm';
    private mdStyle: string = 'p-1 px-2 rounded-sm';

    get classStyle(): string {
        let style: string = this.colorClasses + ' ';
        switch (this.size) {
            case 'xs': {
                style += this.xsStyle;
                break;
            }
            case 'md': {
                style += this.mdStyle;
                break;
            }
        }
        return style;
    }

    public mounted(): void {
        //
    }

}
</script>

<style scoped lang="scss">
  
</style>
