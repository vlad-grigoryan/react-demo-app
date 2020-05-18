import * as jwt from 'jsonwebtoken';

const Config = {
    apiHost: 'https://pacific-bayou-96777.herokuapp.com',
}
export const user = jwt.sign({ userName: 'test', password: 'test' }, 'key');



export default Config;

