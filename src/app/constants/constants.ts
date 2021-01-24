import { UserData, MenuOptions } from './interfaces';

export const MENU_OPTIONS: MenuOptions[] = [
    {
        name: 'Play',
        link: '/difficulty',
        anchor_id: 'play-button-anchor',
        button_id: 'play-button'
    }, {
        name: 'Load Game',
        link: '/saved-games',
        anchor_id: 'load-button-anchor',
        button_id: 'load-button'
    }, {
        name: 'Played Games',
        link: '/played-games',
        anchor_id: 'played-games-button-anchor',
        button_id: 'played-games-button'
    }, {
        name: 'Multiplayer',
        link: '/multiplayer',
        anchor_id: 'multiplayer-button-anchor',
        button_id: 'multiplayer-button'
    }
];

export const FAKE_DATA: UserData[] = [{
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
}];
