import { db } from '../database';

export const registerPlayedGame = {
    method: 'POST',
    path: '/api/{uid}/played-games',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        let payload;
        typeof req.payload === 'string' ? payload = JSON.parse(req.payload) : payload = req.payload;
        const { gid, startTime, endTime, usedTurns, accuracy, status, difficulty } = payload;
        await db.query(`
            INSERT INTO played_games (uid, gid, start_time, end_time, used_turns, accuracy, status, difficulty)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [uid, gid, startTime, endTime, usedTurns, accuracy, status, difficulty]
        );
        return { uid, gid, start_time: startTime, end_time: endTime, used_turns: usedTurns, accuracy, status, difficulty };
    }
}
