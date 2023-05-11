import express from 'express';
import uuid4 from "uuid4";
import { deleteUserById, getUsers, getUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        
        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}

export const addBookToUserLibrary = async (req: express.Request, res: express.Response) => {
    try {
        const { id, book } = req.body;
        const user = await getUserById(id);
        if(!user) return res.sendStatus(404)

        const newBook = {id: uuid4(), ...book}
        user.library = [...user?.library, newBook]
        await user.save();
        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error)
        return res.sendStatus(400)
    }
}