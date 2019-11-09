<template>
    <div class="h-full" v-if="getFilePath">
        <div class="flex items-center h-8 bg-gray-200 rounded px-2">
            <div class="flex-1">
                <span class="font-bold">{{ getFilePath }}</span>
            </div>
            <div class="">
                <button @click="closeFile">Close</button>
            </div>
        </div>
        <div class="editable-container h-full overflow-y-scroll" contenteditable="false">
            <div v-for="(l,i) in fileContent" :key="i" >
                <pre class="border-b border-gray-200 text-xs" v-text="l"></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const readline = require('readline');
import * as fs from 'fs';

@Component
export default class FileEditor extends Vue {

    public fileContent: string[] = [];

    get getFilePath(): string {
        if (this.$store.state.openedFile) {
            return this.$store.state.openedFile.path;
        }
        return '';
    }

    public mounted(): void {
        this.readLocalFile();
    }

    @Watch('getFilePath')
    public readLocalFile(): void {
        if (!this.getFilePath) {
            return;
        }
        this.fileContent.splice(0, this.fileContent.length);
        const readInterface = readline.createInterface({
            input: fs.createReadStream(this.getFilePath),
            output: process.stdout,
            console: false,
        });
        readInterface.on('line', (line: any) => {
            this.fileContent.push(line);
        });
    }

    public closeFile(): void {
        this.$store.state.openedFile = null;
    }
}
</script>

<style scoped lang="scss">
.editable-container > div {
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
}
</style>
