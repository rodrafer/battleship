import { UserData } from "./interfaces";

export const FAKE_DATA: UserData = {
    uid: '12345',
    saved_games: [{
        name: 'Vuelta de obligado',
        start_time: '11-20-1845 18:02',
        turns_left: 35,
        accuracy: 0.75
    }],
    played_games: [{
        name: 'Batalla de Trafalgar',
        start_time: '10-21-1805 09:00',
        end_time: '10-22-1805 17:00',
        turns_used: 25,
        accuracy: 0.66,
        status: 'Lost'
    }],
    multiplayer_code: ''
}