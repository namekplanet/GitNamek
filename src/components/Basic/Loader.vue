<template>
    <span class="py-1">
        <span class="text-gray-900 font-bolder">&#8226</span>
        <span v-if="maxDots>1" class="text-gray-900 font-bolder">&#8226</span>
        <span v-if="maxDots>2" class="text-gray-900 font-bolder">&#8226</span>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {

    public maxDots: number = 1;
    public inverval: any;

    public mounted(): void {
        this.inverval = setInterval(() => {
            this.maxDots = this.maxDots > 2 ? 1 : this.maxDots + 1;
        }, 600);
    }

    public destroyed(): void {
        if (this.inverval)
            clearInterval(this.inverval);
    }

}
</script>
