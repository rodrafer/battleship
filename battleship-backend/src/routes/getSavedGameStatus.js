import Boom from '@hapi/boom';
import { db } from '../database';

export const getSavedGameStatus = {
    method: 'GET',
    path: '/api/{uid}/saved-game-status/{gid}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const gid = req.params.gid;
        const shipsStatus = await db.query(
            'SELECT * FROM ship_positions WHERE uid=? AND gid=?',
            [uid, gid]
        );
        const shipPositions = shipsStatus.results;
        const cellsStatus = await db.query(
            'SELECT * FROM cell_ids WHERE uid=? AND gid=?',
            [uid, gid]
        );
        const clickedCellIds = cellsStatus.results;
        if (!shipPositions) throw Boom.notFound(`Unable to get ship positions status for user id ${uid} and game id ${gid}`);
        if (!clickedCellIds) throw Boom.notFound(`Unable to get clicked cell ids status for user id ${uid} and game id ${gid}`);
        return { shipPositions, clickedCellIds };
    }
}
