export interface SavedGameData {
    name: string,
    start_time: string,
    turns_left: number,
    accuracy: number
}

export interface PlayedGameData {
    name: string,
    start_time: string,
    end_time: string,
    turns_used: number,
    accuracy: number,
    status: string
}

export interface UserData {
    uid: string,
    saved_games: SavedGameData[],
    played_games: PlayedGameData[],
    multiplayer_code: string
}