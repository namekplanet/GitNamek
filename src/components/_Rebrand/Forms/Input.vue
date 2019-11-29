<template>
    <div>
        <textarea v-if="type=='textarea'"
            cols="30" rows="5" 
            :value="value" @input="onInput"
            class="w-full p-1 bg-gray-400 shadow-md border border-gray-500"></textarea>
        <input 
            v-else
            :type="type" :value="value" @input="onInput" 
            :placeholder="placeholder"
            class="w-full p-1 bg-gray-400 shadow-md border border-gray-500"
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

}
</script>

<style scoped lang="scss">
  
</style>
