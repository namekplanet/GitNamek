// var Git = require('simple-git');
import * as simplegit from 'simple-git/promise';
const Git: any = simplegit();

export default class Repository {

    private isOpened: boolean = false;
    private repo: any;

    public refsLocal: any[] = [];
    public refsRemote: any[] = [];

    public stagedFiles: any[] = [];
    public unstagedFiles: any[] = [];

    constructor() {
        // refresh every 5 seconds
        // setInterval(() => {
        //     console.log('refresh');
        //     if (this.isOpened) {
        //         this.loadData();
        //     }
        // }, 5000);
    }

    public openRepository(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            Git.cwd(path).then((path: any) => {
                this.isOpened = true;
                this.loadData();
                resolve(true);
            });
            // Git.Repository.open(path).then((repository: any) => {
            //     this.isOpened = true;
            //     this.repo = repository;
            //     this.loadData();
            //     resolve(true);
            // });
        });
    }

    public loadData(): void {
        this.loadBranches();
        this.loadStatus();
    }

    public loadBranches(): void {
        console.log('loadBranches()');
        // get local branches
        Git.branchLocal().then((data: any) => {
            this.refsLocal.splice(0, this.refsLocal.length);
            data.all.forEach((name: string) => {
                this.refsLocal.push(data.branches[name]);
            });
        });

        // get remote branches
        Git.branch('--remotes').then((data: any) => {
            console.log('BRANCHES: ', data);
            this.refsRemote.splice(0, this.refsRemote.length);
            data.all.forEach((name: string) => {
                this.refsRemote.push(data.branches[name]);
            });
        });
    }

    public loadStatus(): void {
        console.log('loadStatus()');
        Git.status().then((data: any) => {
            console.log('status:', data);
            this.stagedFiles.splice(0, this.stagedFiles.length);
            this.unstagedFiles.splice(0, this.unstagedFiles.length);

            data.files.forEach((file: any) => {
                if (file.index !== ' ' && file.index !== '?') {
                    this.stagedFiles.push({
                        status: file.index,
                        path: file.path,
                    });
                } else {
                    this.unstagedFiles.push({
                        status: file.working_dir,
                        path: file.path,
                    });
                }
            });
        });
    }

    public stageFile(file: any): void {
        console.log('stageFile()', file);
        // new Promise<any>((resolve: any, reject: any) => {
            Git.add(file.path).then((data: any) => {
                console.log('data', data);
                this.loadStatus();
            });
        // });
        // this.repo.refreshIndex().then((index: any) => {
        //     index.addByPath(file.path()).then((result: any) => {
        //         // Use result
        //         index.write().then((result: any) => {
        //             index.writeTree();
        //             this.loadStatus();
        //         });
        //     });
        // });
    }

    public unstageFile(file: any): void {
        Git.reset([file.path]).then((data: any) => {
            console.log('data', data);
            this.loadStatus();
        });
    }
}
