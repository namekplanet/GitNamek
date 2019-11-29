<template>
    <button class="p-1 px-2 rounded shadow-md font-bold"
        :class="colorClasses"
        @click="onClick()">
        <slot/>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Base from '../Base';

@Component
export default class Button extends Base {
    
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
