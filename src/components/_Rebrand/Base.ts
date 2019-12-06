import { Vue, Prop } from 'vue-property-decorator';

export default class Base extends Vue {

    @Prop({ default: '' }) protected readonly color!: string;
    @Prop({ default: false }) protected readonly noMargin!: boolean;
    @Prop({ default: false }) protected readonly hasError!: boolean;
    protected themeDark: boolean = false;

    get isDark(): boolean {
        return this.themeDark;
    }

    protected get colorClasses(): string {
        if (this.color === 'primary') {
            return this.getPrimary();
        } else if (this.color === 'secondary') {
            return this.getSecondary();
        } else if (this.color === 'success') {
            return this.getSuccess();
        } else if (this.color === 'info') {
            return this.getInfo();
        } else if (this.color === 'warning') {
            return this.getWarning();
        }
        return this.getDefault();
    }

    protected loadParentTheme(): void {
        let level = 0;
        let parent = this.$parent;
        while (parent != null && !parent.$refs.hasOwnProperty('ref-panel') && level < 10) {
            level++;
            parent = parent.$parent;
        }
        if (parent) {
            // @ts-ignore
            this.themeDark = parent.dark;
        }
    }

    private getDefault(): string {
        return 'border border-gray-200';
    }

    private getPrimary(): string {
        return 'bg-blue-800 text-gray-100';
    }

    private getSecondary(): string {
        return 'bg-gray-800 text-gray-100';
    }

    private getSuccess(): string {
        return 'bg-green-800 text-gray-100';
    }

    private getInfo(): string {
        return 'bg-blue-500 text-gray-100';
    }

    private getWarning(): string {
        return 'bg-yellow-600 text-gray-100';
    }

}
