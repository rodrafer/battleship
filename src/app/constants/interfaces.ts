export interface SavedGameData {
    gid: number;
    startTime: number;
    turnsLeft: number;
    usedTurns: number;
    numberOfStrikes: number;
    accuracy: string;
    difficulty: string;
    shipPositions: BoardPoint[];
    clickedCellIds: string[];
}

export interface PlayedGameData {
    gid: number;
    startTime: number;
    endTime: number;
    usedTurns: number;
    accuracy: string;
    status: string;
    difficulty: string;
}

export interface UserData {
    uid: string;
    savedGames: SavedGameData[];
    playedGames: PlayedGameData[];
    multiplayerCode: string;
}

export interface MenuOptions {
    name: string;
    link: string;
    anchorId: string;
    buttonId: string;
}

export interface DifficultyOptions {
    name: string;
    buttonClass: string;
    anchorId: string;
    buttonId: string;
    textClass: string;
    description: string;
}

export interface Ship {
    name: string;
    length: number;
    amount: number;
}

export interface BoardPoint {
    x: string;
    y: number;
}
