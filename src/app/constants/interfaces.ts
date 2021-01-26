export interface SavedGameData {
    name: string;
    start_time: string;
    turns_left: number;
    accuracy: number;
}

export interface PlayedGameData {
    name: string;
    start_time: string;
    end_time: string;
    turns_used: number;
    accuracy: number;
    status: string;
}

export interface UserData {
    uid: string;
    saved_games: SavedGameData[];
    played_games: PlayedGameData[];
    multiplayer_code: string;
}

export interface MenuOptions {
    name: string;
    link: string;
    anchor_id: string;
    button_id: string;
}

export interface DifficultyOptions {
    name: string;
    buttonClass: string;
    anchor_id: string;
    button_id: string;
    textClass: string;
    description: string;
}

export interface Ship {
    name: string;
    length: number;
    amount: number;
}

export interface BoardPoint {
    x: string,
    y: number
}
