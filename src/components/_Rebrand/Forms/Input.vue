<template>
    <div>
        <textarea v-if="type=='textarea'"
            :value="value" @input="onInput"
            :placeholder="placeholder"
            class="w-full h-full p-1 bg-gray-700 shadow-md border border-gray-700 text-gray-500"></textarea>
        <input 
            v-else
            :type="type" :value="value" @input="onInput"  @change="onChange"
            :placeholder="placeholder"
            class="w-full p-1 bg-gray-700 shadow-md border border-gray-700 text-gray-500"
            :class="{'border-b border-b-red-700':hasError}" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Input extends Base {

    @Prop({ default: '' }) public readonly value!: string;
    @Prop({ default: 'text' }) public readonly type!: string;
    @Prop({ default: '' }) public readonly placeholder!: string;

    public mounted(): void {
        //
    }

    public onInput(evt: any): void {
        this.$emit('input', evt.target.value);
    }

    public onChange(evt: any): void {
        this.$emit('change', evt.target.value);
    }

}
</script>

<style scoped lang="scss">
  
</style>
