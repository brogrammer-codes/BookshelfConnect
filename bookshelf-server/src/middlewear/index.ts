import express from 'express';
import { merge, get } from 'lodash'
import { getUserBySessionToken } from '../db/users'

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['BOOKSHELF-AUTH']
        if (!sessionToken) return res.sendStatus(403)
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!sessionToken) res.sendStatus(403)
        merge(req, { identity: existingUser })
        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const { id: bodyId } = req.body;
        const currentUserId = get(req, 'identity._id') as string;
        console.log(id, bodyId, currentUserId);
        
        if (!currentUserId) {
            return res.sendStatus(400);
          }
          if (id || bodyId) {
            const targetUserId = id || bodyId;
            if (currentUserId.toString() !== targetUserId) {
              return res.sendStatus(403);
            }
          }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}