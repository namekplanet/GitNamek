import * as simplegit from 'simple-git/promise';
const Git: any = simplegit();

export default class Repository {

    private isOpened: boolean = false;
    private repo: any;

    public remotes: string[] = [];
    public branchLocal: any[] = [];
    public branchRemote: any[] = [];
    public branchRemoteCurrent?: string;
    public branchRemoteTracking?: string;

    public stagedFiles: any[] = [];
    public unstagedFiles: any[] = [];

    public commitsAhead: number = 0;

    public logs: any[] = [];

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
        });
    }

    public loadData(): void {
        this.loadBranches();
        this.loadStatus();
        this.loadRemotes();
        this.loadLogs();
    }

    public loadBranches(): void {
        // get local branches
        Git.branchLocal().then((data: any) => {
            this.branchLocal.splice(0, this.branchLocal.length);
            data.all.forEach((name: string) => {
                this.branchLocal.push(data.branches[name]);
            });
        });

        // get remote branches
        Git.branch('--remotes').then((data: any) => {
            this.branchRemote.splice(0, this.branchRemote.length);
            data.all.forEach((name: string) => {
                this.branchRemote.push(data.branches[name]);
            });
        });
    }

    public loadRemotes(): void {
        Git.getRemotes().then((data: any) => {
            data.forEach((r: any) => this.remotes.push(r.name));
        });
    }

    public loadStatus(): void {
        Git.status().then((data: any) => {
            console.log('STATUS:', data);
            this.stagedFiles.splice(0, this.stagedFiles.length);
            this.unstagedFiles.splice(0, this.unstagedFiles.length);

            this.commitsAhead = data.ahead;
            this.branchRemoteCurrent = data.current;
            this.branchRemoteTracking = data.tracking;
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
        Git.add(file.path).then((data: any) => {
            this.loadStatus();
        });
    }

    public unstageFile(file: any): void {
        Git.reset([file.path]).then((data: any) => {
            this.loadStatus();
        });
    }

    public commit(message: string): void {
        Git.commit(message).then((data: any) => {
            this.loadStatus();
        });
    }

    public push(): void {
        if (this.branchRemoteTracking) {
            const rpb = this.branchRemoteTracking.split('/');
            Git.push(rpb[0], rpb[1]).then((data: any) => {
                this.loadData();
            });
        }
    }

    public pull(): void {
        Git.pull().then((data: any) => {
            console.log('PULL', data);
            // this.loadData();
        });
    }

    public loadLogs(): void {
        console.log('LOG');
        Git.log().then((data: any) => {
            console.log('LOG', data);
            this.logs.splice(0, this.logs.length);
            data.all.forEach((l: any) => {
                this.logs.push(l);
            });
        });
    }
}
