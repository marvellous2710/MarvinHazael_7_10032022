const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRETKEY');
        const userId = decodedToken.idtableUser;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('User ID non valable !');
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifiée !'});
    }
};