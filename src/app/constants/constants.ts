import { MultiplayerData, MenuOptions, DifficultyOptions, Ship, SavedGameData, PlayedGameData } from './interfaces';

export const MENU_OPTIONS: MenuOptions[] = [
    {
        name: 'Play',
        link: '/difficulty',
        anchorId: 'play-button-anchor',
        buttonId: 'play-button'
    }, {
        name: 'Load Game',
        link: '/saved-games/saved',
        anchorId: 'load-button-anchor',
        buttonId: 'load-button'
    }, {
        name: 'Played Games',
        link: '/played-games/played',
        anchorId: 'played-games-button-anchor',
        buttonId: 'played-games-button'
    }, {
        name: 'Multiplayer',
        link: '/multiplayer',
        anchorId: 'multiplayer-button-anchor',
        buttonId: 'multiplayer-button'
    }
];

export const DIFFICULTY_OPTIONS: DifficultyOptions[] = [
    {
        name: 'Cadet',
        buttonClass: 'btn-success',
        anchorId: 'easy-button-anchor',
        buttonId: 'easy-button',
        textClass: 'text-success',
        description: 'Easy. You\'ll get unlimited turns to sink the enemy fleet.',
    }, {
        name: 'Lieutenant',
        buttonClass: 'btn-warning',
        anchorId: 'medium-button-anchor',
        buttonId: 'medium-button',
        textClass: 'text-warning',
        description: 'Medium. You\'ll get 100 turns to sink the enemy fleet.',
    }, {
        name: 'Almirant',
        buttonClass: 'btn-danger',
        anchorId: 'hardcore-games-button-anchor',
        buttonId: 'hardcore-games-button',
        textClass: 'text-danger',
        description: 'Hardcore. You\'ll get 50 turns to sink the enemy fleet.',
    }
];

export const FLEET: Ship[] = [
    {
      name: 'carrier',
      length: 4,
      amount: 1
    },
    {
      name: 'destroyer',
      length: 3,
      amount: 2
    },
    {
      name: 'submarine',
      length: 2,
      amount: 3
    },
    {
      name: 'patrol-boat',
      length: 1,
      amount: 4
    }
  ];

export const SAVED_GAMES: SavedGameData[] = [
    {
        uid: '12345',
        gid: '1',
        startTime: 654615341651,
        turnsLeft: 35,
        usedTurns: 25,
        strikes: 10,
        accuracy: '75',
        difficulty: 'Cadet'
    }, {
        uid: '12345',
        gid: '2',
        startTime: 654615341651,
        turnsLeft: 35,
        usedTurns: 15,
        strikes: 10,
        accuracy: '75',
        difficulty: 'Almirant'
    }, {
        uid: '67890',
        gid: '1',
        startTime: 654615341651,
        turnsLeft: 35,
        usedTurns: 25,
        strikes: 10,
        accuracy: '75',
        difficulty: 'Cadet'
    }, {
        uid: '67890',
        gid: '2',
        startTime: 654615341651,
        turnsLeft: 35,
        usedTurns: 15,
        strikes: 10,
        accuracy: '75',
        difficulty: 'Almirant'
    }
];

export const PLAYED_GAMES: PlayedGameData[] = [
    {
        uid: '12345',
        gid: '1',
        startTime: 10684684026824,
        endTime: 10684704027564,
        usedTurns: 25,
        accuracy: '66',
        status: 'Lost',
        difficulty: 'Cadet'
    }, {
        uid: '12345',
        gid: '2',
        startTime: 10684684026824,
        endTime: 10684704027564,
        usedTurns: 25,
        accuracy: '66',
        status: 'Lost',
        difficulty: 'Cadet'
    }, {
        uid: '67890',
        gid: '1',
        startTime: 10684684026824,
        endTime: 10684704027564,
        usedTurns: 25,
        accuracy: '66',
        status: 'Lost',
        difficulty: 'Cadet'
    }, {
        uid: '67890',
        gid: '2',
        startTime: 10684684026824,
        endTime: 10684704027564,
        usedTurns: 25,
        accuracy: '66',
        status: 'Lost',
        difficulty: 'Cadet'
    }
];

export const MULTIPLAYER_DATA: MultiplayerData[] = [{
    uid: '12345',
    multiplayerCode: 's5sd6f65'
}];
