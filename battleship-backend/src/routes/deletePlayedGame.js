import { db } from '../database'

export const deletePlayedGame = {
    method: 'DELETE',
    path: '/api/{uid}/played-game/{gid}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const gid = req.params.gid;
        await db.query(
            'DELETE FROM played_games WHERE uid=? AND gid=?',
            [uid, gid]
        );
        return {message: 'Game deleted.'};
    }
}
