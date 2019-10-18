var Git = require('nodegit');

export default class Repository {
    
    private isOpened: boolean = false;
    private repo: any;

    public openRepository(path: string): Promise<boolean> {
        const self = this;
        return new Promise<boolean>((resolve: any, reject: any) => {
            Git.Repository.open(path).then((repository: any) => {
                self.isOpened = true;
                self.repo = repository;
                resolve(true);
            });
        });
    }
}