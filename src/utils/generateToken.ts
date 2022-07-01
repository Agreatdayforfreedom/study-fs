import jwt from 'jsonwebtoken';

const generateToken = (payload: any) => {
    return jwt.sign(payload, 'secret', { expiresIn: '24h'});
}

const validateToken = (token: string): any => {
    if (token) {
        const verify = jwt.verify(token, 'secret', (err, data) => {
            if (data) {
                return {
                    data: data
                };
            }
            if (err) {
                return {
                    err: err
                };
            }
        });
        console.log(verify, token);
        return verify;
    }
}

export { generateToken, validateToken };