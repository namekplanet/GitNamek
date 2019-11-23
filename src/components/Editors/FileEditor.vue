<template>
    <div class="flex flex-col h-full" v-if="getFilePath">
        <div class="flex items-center h-8 bg-gray-200 rounded px-2">
            <div class="flex-1">
                <span class="font-bold">{{ getFilePath }}</span>
            </div>
            <div class=""
                v-if="closable">
                <button @click="closeFile">Close</button>
            </div>
        </div>
        <div class="editable-container h-full w-full overflow-scroll">
            <div v-for="(l,i) in fileContent" :key="i" >
                <pre class="border-b border-gray-200 text-xs" v-text="l"
                    :contenteditable="editable"
                    @input="onChangeLine($event, i)"></pre>
            </div>
        </div>
        <div class="text-right" v-if="editable">
            <Button color="success" @click="onSave">
                <i class="fas fa-save"></i>
                <span class="ml-2">Save</span>
            </Button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const readline = require('readline');
import * as fs from 'fs';

@Component
export default class FileEditor extends Vue {

    @Prop({ default: true }) public readonly closable!: boolean;
    @Prop({ default: false }) public readonly editable!: boolean;
    @Prop({ default: '' }) public path!: string;
    public fileContent: string[] = [];

    get getFilePath(): string {
        if (this.path) {
            return this.path;
        } else if (this.$store.state.openedFile) {
            this.path = this.$store.state.openedFile.path;
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

    public onSave(): void {
        fs.exists(this.getFilePath, (exists: boolean) => {
            if (exists) {
                const stream = fs.createWriteStream(this.getFilePath);
                stream.once('open', (fd: any) => {
                    for (let i = 0; i < this.fileContent.length; i++) {
                        stream.write(this.fileContent[i]);
                        if (i < this.fileContent.length) {
                            stream.write('\n');
                        }
                    }
                    stream.end();
                });
            }
        });
    }

    public onChangeLine(evt: any, index: number): void {
        this.fileContent[index] = evt.target.textContent;
    }
}
</script>

<style scoped lang="scss">
.editable-container > div {
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
}
</style>
