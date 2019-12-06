<template>
    <button class="shadow-md font-bold cursor-pointer"
        :class="classStyle"
        @click="onClick()">
        <slot/>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Button extends Base {

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

    public onClick(): void {
        this.$emit('click');
    }

}
</script>

<style scoped lang="scss">
  
</style>
