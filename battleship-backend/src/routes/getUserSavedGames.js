import Boom from '@hapi/boom';
import { db } from '../database'

export const getUserSavedGames = {
    method: 'GET',
    path: '/api/{uid}/saved-games',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const { results } = await db.query(
            'SELECT * FROM saved_games WHERE uid=?',
            [uid]
        );
        const userSavedGames = results;
        if (!userSavedGames) throw Boom.notFound(`There is no user with such id: ${uid}`);
        return userSavedGames;
    }
}
