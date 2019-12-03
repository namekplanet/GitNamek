<template>
    <div :class="{'my-2':!noMargin}">
        <div v-if="!titleAsPlaceholder&&title&&title!==''" class="px-1">
            <span class="text-sm font-bolder" :class="{'text-gray-200':isDark}" >{{ title }}</span>
        </div>
        <div>
            <GInput :type="type" :value="value" @input="onInput" 
                :placeholder="titleAsPlaceholder?title:''"
                :has-error="hasError" />
        </div>
        <div v-if="message&&message!=''" class="pt-1 px-2">
            <span class="text-xs text-gray-600 italic">{{ message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class FormInput extends Base {

    @Prop({ default: '' }) public readonly value!: string;
    @Prop({ default: 'type' }) public readonly type!: string;
    @Prop({ default: '' }) public readonly title!: string;
    @Prop({ default: '' }) public readonly message!: string;
    @Prop({ default: false }) public readonly titleAsPlaceholder!: string;

    public mounted(): void {
        this.loadParentTheme();
    }

    public onInput(evt: any): void {
        this.$emit('input', evt.target.value);
    }

}
</script>

<style scoped lang="scss">
  
</style>
