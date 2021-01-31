import { db } from '../database';

export const addShipPosition = {
    method: 'POST',
    path: '/api/{uid}/ship-position/{gid}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const gid = req.params.gid;
        const payload = JSON.parse(req.payload);
        const { x, y } = payload;
        await db.query(`
            INSERT INTO ship_positions (uid, gid, x, y)
                VALUES (?, ?, ?, ?);
        `, [uid, gid, x, y]
        );
        return { uid, gid, x, y };
    }
}
