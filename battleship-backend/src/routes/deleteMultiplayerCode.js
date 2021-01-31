import { db } from '../database'

export const deleteMultiplayerCode = {
    method: 'DELETE',
    path: '/api/{uid}/multiplayer/{code}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const code = req.params.code;
        await db.query(
            'DELETE FROM multiplayer WHERE uid=? AND mpcode=?',
            [uid, code]
        );
        return {message: 'Code deleted.'};
    }
}
