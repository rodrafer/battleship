import Boom from '@hapi/boom';
import { db } from '../database'

export const checkSameMultiplayerCode = {
    method: 'GET',
    path: '/api/multiplayer/{code}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const code = req.params.code;
        const { results } = await db.query(
            'SELECT * FROM multiplayer WHERE mpcode=?',
            [code]
        );
        const matchedUser = results;
        if (!matchedUser) throw Boom.notFound(`There is no user with such multiplayer code: ${code}`);
        return matchedUser;
    }
}
