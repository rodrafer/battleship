import Boom from '@hapi/boom';
import { db } from '../database'

export const getUserPlayedGames = {
    method: 'GET',
    path: '/api/{uid}/played-games',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const { results } = await db.query(
            'SELECT * FROM played_games WHERE uid=?',
            [uid]
        );
        const userPlayedGames = results;
        if (!userPlayedGames) throw Boom.notFound(`There is no user with such id: ${uid}`);
        return userPlayedGames;
    }
}
