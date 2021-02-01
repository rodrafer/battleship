import { db } from '../database';

export const registerSavedGame = {
    method: 'POST',
    path: '/api/{uid}/saved-games',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        let payload;
        typeof req.payload === 'string' ? payload = JSON.parse(req.payload) : payload = req.payload;
        const { gid, startTime, turnsLeft, usedTurns, strikes, accuracy, difficulty } = payload;
        await db.query(`
            INSERT INTO saved_games (uid, gid, start_time, turns_left, used_turns, strikes, accuracy, difficulty)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [uid, gid, startTime, turnsLeft, usedTurns, strikes, accuracy, difficulty]
        );
        return { uid, gid, start_time: startTime, turns_left: turnsLeft, used_turns: usedTurns, strikes, accuracy, difficulty };
    }
}
