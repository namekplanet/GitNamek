import simplegit, { SimpleGit } from 'simple-git/promise';

export default class Repository {

    public remotes: string[] = [];
    public branchLocal: any[] = [];
    public branchRemote: any[] = [];
    public tags: any[] = [];
    public branchRemoteCurrent?: string;
    public branchRemoteTracking?: string;
    public stagedFiles: any[] = [];
    public unstagedFiles: any[] = [];
    public commitsAhead: number = 0;
    public logs: any[] = [];
    private isOpened: boolean = false;
    private repo: any;
    private Git: SimpleGit;


    constructor() {
        this.Git = simplegit();
    }

    public openRepository(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            this.Git.cwd(path).then((data: any) => {
                this.isOpened = true;
                this.refresh();
                resolve(true);
            });
        });
    }

    public refresh(): void {
        this.loadBranches();
        this.loadTags();
        this.loadStatus();
        this.loadRemotes();
        this.loadLogs();
    }

    public loadBranches(): void {
        // get local branches
        this.Git.branchLocal().then((data: any) => {
            this.branchLocal.splice(0, this.branchLocal.length);
            data.all.forEach((name: string) => {
                this.branchLocal.push(data.branches[name]);
            });
        });

        // get remote branches
        this.Git.branch(['--remotes']).then((data: any) => {
            this.branchRemote.splice(0, this.branchRemote.length);
            data.all.forEach((name: string) => {
                this.branchRemote.push(data.branches[name]);
            });
        });
    }

    public loadTags(): void {
        this.Git.tags().then((data: any) => {
            this.tags.splice(0, this.tags.length);
            data.all.forEach((name: string) => {
                this.tags.push(name);
            });
        });
    }

    public loadRemotes(): void {
        this.Git.getRemotes(true).then((data: any) => {
            data.forEach((r: any) => this.remotes.push(r.name));
        });
    }

    public loadStatus(): void {
        this.Git.status().then((data: any) => {
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
        this.Git.add(file.path).then((data: any) => {
            this.loadStatus();
        });
    }

    public stageAll(): void {
        const listUnstagePaths: string[] = this.unstagedFiles.map((f: any) => f.path);
        this.Git.add(listUnstagePaths).then((data: any) => {
            this.loadStatus();
        });
    }

    public unstageFile(file: any): void {
        this.Git.reset([file.path]).then((data: any) => {
            this.loadStatus();
        });
    }

    public unstageAll(): void {
        const listStagePaths: string[] = this.stagedFiles.map((f: any) => f.path);
        this.Git.reset(listStagePaths).then((data: any) => {
            this.loadStatus();
        });
    }

    public commit(message: string): void {
        this.Git.commit(message).then((data: any) => {
            this.refresh();
        });
    }

    public push(): void {
        if (this.branchRemoteTracking) {
            const rpb = this.branchRemoteTracking.split('/');
            this.Git.push(rpb[0], rpb[1]).then((data: any) => {
                this.refresh();
            });
        }
    }

    public pull(): void {
        this.Git.pull().then((data: any) => {
            this.refresh();
        });
    }

    public loadLogs(): void {
        this.Git.log().then((data: any) => {
            this.logs.splice(0, this.logs.length);
            data.all.forEach((l: any) => {
                this.logs.push(l);
            });
        });
    }

    public createLocalBranch(name: string): void {
        this.Git.raw(['branch', name]).then((data: any) => {
            this.refresh();
        });
    }
}
