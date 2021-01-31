import { db } from '../database';

export const generateMultiplayerCode = {
    method: 'POST',
    path: '/api/{uid}/multiplayer',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const payload = JSON.parse(req.payload);
        const { code } = payload;
        await db.query(`
            INSERT INTO multiplayer (uid, mpcode)
                VALUES (?, ?);
        `, [uid, code]
        );
        return { uid, mpcode: code };
    }
}
