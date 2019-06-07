export interface LogState {
    showSilent: boolean,
    logs: Line[]
}

export interface Line {
    message: string;
    level: Level;
}

export enum Level {
    normal,
    silent,
    success,
    warning,
}