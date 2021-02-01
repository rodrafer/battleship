import { getUserSavedGames } from './getUserSavedGames';
import { getUserPlayedGames } from './getUserPlayedGames';
import { registerSavedGame } from './registerSavedGame';
import { registerPlayedGame } from './registerPlayedGame';
import { getSavedGameStatus } from './getSavedGameStatus';
import { generateMultiplayerCode } from './generateMultiplayerCode';
import { checkSameMultiplayerCode } from './checkSameMultiplayerCode';
import { deleteMultiplayerCode } from './deleteMultiplayerCode';
import { updateSavedGame } from './updateSavedGame';
import { addClickedCellId } from './addClickedCellId';
import { addShipPosition } from './addShipPosition';
import { deleteSavedGame } from './deleteSavedGame';
import { deletePlayedGame } from './deletePlayedGame';

export default [
    getUserSavedGames,
    getUserPlayedGames,
    registerSavedGame,
    registerPlayedGame,
    getSavedGameStatus,
    generateMultiplayerCode,
    checkSameMultiplayerCode,
    deleteMultiplayerCode,
    updateSavedGame,
    addClickedCellId,
    addShipPosition,
    deleteSavedGame,
    deletePlayedGame
];
