import Repository from './Repository';

export default class Project {

    public name: string;
    public path: string;
    public uri: string;
    public repo: Repository;

    constructor(name: string, path: string, uri: string) {
        this.name = name;
        this.path = path;
        this.uri = uri;
        this.repo = new Repository(path);
    }

    /**
     * Open repository
     */
    public openRepo(): Promise<boolean> {
        const self = this;
        return new Promise<boolean>((resolve: any, reject: any) => {
            if (!self.repo || !self.path) {
                resolve(false);
                return false;
            }
            self.repo.openRepository(self.path).then((response: boolean) => {
                resolve(response);
            });
        });
    }

    public getRepo(): any {
        return this.repo;
    }

}
