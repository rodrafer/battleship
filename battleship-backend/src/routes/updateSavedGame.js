import { db } from '../database';

export const updateSavedGame = {
    method: 'POST',
    path: '/api/{uid}/save-game/{gid}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const gid = req.params.gid;
        let payload;
        typeof req.payload === 'string' ? payload = JSON.parse(req.payload) : payload = req.payload;
        const { startTime, turnsLeft, usedTurns, strikes, accuracy, difficulty } = payload;
        await db.query(`
            UPDATE saved_games
                SET turns_left=?, used_turns=?, strikes=?, accuracy=?
                WHERE uid=? AND gid=?;
        `, [turnsLeft, usedTurns, strikes, accuracy, uid, gid]
        );
        return { uid, gid, start_time: startTime, turns_left: turnsLeft, used_turns: usedTurns, strikes, accuracy, difficulty };
    }
}
