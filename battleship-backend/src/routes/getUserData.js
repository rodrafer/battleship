import { FAKE_DATA } from './fake-data';
import Boom from '@hapi/boom';

export const getUserData = {
    method: 'GET',
    path: '/api/user/{uid}',
    // eslint-disable-next-line
    handler: (req, h) => {
        const uid = req.params.uid;
        const userData = FAKE_DATA.find(userData => userData.uid === uid);
        if (!userData) throw Boom.notFound(`There is no user with such id: ${uid}`);
        return userData;
    }
}
