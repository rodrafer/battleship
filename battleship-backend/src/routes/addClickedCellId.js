import { db } from '../database';

export const addClickedCellId = {
    method: 'POST',
    path: '/api/{uid}/cell-id/{gid}',
    // eslint-disable-next-line
    handler: async (req, h) => {
        const uid = req.params.uid;
        const gid = req.params.gid;
        const payload = JSON.parse(req.payload);
        const { cellId } = payload;
        await db.query(`
            INSERT INTO cell_ids (uid, gid, cell)
                VALUES (?, ?, ?);
        `, [uid, gid, cellId]
        );
        return { uid, gid, cellId };
    }
}
