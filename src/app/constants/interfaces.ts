export interface SavedGameData {
    uid: string;
    gid: string;
    startTime: number;
    turnsLeft: number;
    usedTurns: number;
    strikes: number;
    accuracy: string;
    difficulty: string;
}

export interface PlayedGameData {
    uid: string;
    gid: string;
    startTime: number;
    endTime: number;
    usedTurns: number;
    accuracy: string;
    status: string;
    difficulty: string;
}

export interface LoadedGameData {
    savedGameInfo: SavedGameData;
    shipPositions: BoardPoint[];
    clickedCellsIds: string[];
}

export interface StatusData {
    shipPositions: BoardPoint[];
    clickedCellsIds: string[];
}

export interface MultiplayerData {
    uid: string;
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
