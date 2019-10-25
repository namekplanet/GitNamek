const Git: any = require('simple-git/promise');

export default class Repository {

    public repoPath: string;
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


    constructor(repoPath: string) {
        this.repoPath = repoPath;
    }

    public async openRepository(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            Git(path).checkIsRepo().then((data: any) => {
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
        Git(this.repoPath).branch([], (data: any) => {
            this.branchLocal.splice(0, this.branchLocal.length);
            data.all.forEach((name: string) => {
                this.branchLocal.push(data.branches[name]);
            });
        });

        // get remote branches
        Git(this.repoPath).branch(['--remotes'], (data: any) => {
            this.branchRemote.splice(0, this.branchRemote.length);
            data.all.forEach((name: string) => {
                this.branchRemote.push(data.branches[name]);
            });
        });
    }

    public loadTags(): void {
        Git(this.repoPath).tags([], (data: any) => {
            this.tags.splice(0, this.tags.length);
            data.all.forEach((name: string) => {
                this.tags.push(name);
            });
        });
    }

    public loadRemotes(): void {
        Git(this.repoPath).getRemotes(true, (data: any) => {
            data.forEach((r: any) => this.remotes.push(r.name));
        });
    }

    public loadStatus(): void {
        Git(this.repoPath).status((err: any, data: any) => {
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
        Git(this.repoPath).add(file.path, (data: any) => {
            this.loadStatus();
        });
    }

    public stageAll(): void {
        const listUnstagePaths: string[] = this.unstagedFiles.map((f: any) => f.path);
        Git(this.repoPath).add(listUnstagePaths, (data: any) => {
            this.loadStatus();
        });
    }

    public unstageFile(file: any): void {
        console.log('unstageFile()');
        this._raw(['reset', file.path]).then((data: any) => {
            this.loadStatus();
        });
    }

    public unstageAll(): void {
        const listStagePaths: string[] = this.stagedFiles.map((f: any) => f.path);
        listStagePaths.unshift('reset');
        this._raw(listStagePaths).then((data: any) => {
            this.loadStatus();
        });
    }

    public commit(message: string): void {
        Git(this.repoPath).commit(message, null, [], (data: any) => {
            this.refresh();
        });
    }

    public push(): void {
        if (this.branchRemoteTracking) {
            const rpb = this.branchRemoteTracking.split('/');
            Git(this.repoPath).push(rpb[0], rpb[1], (data: any) => {
                this.refresh();
            });
        }
    }

    public pull(): void {
        Git(this.repoPath).pull(null, null, (data: any) => {
            this.refresh();
        });
    }

    public loadLogs(): void {
        Git(this.repoPath).log().then((data: any) => {
            this.logs.splice(0, this.logs.length);
            data.all.forEach((l: any) => {
                this.logs.push(l);
            });
        });
    }

    public createLocalBranch(name: string): void {
        Git(this.repoPath).raw(['branch', name], (data: any) => {
            this.refresh();
        });
    }

    private async _raw(data: any) {
        return await Git(this.repoPath).raw(data);
    }
}
