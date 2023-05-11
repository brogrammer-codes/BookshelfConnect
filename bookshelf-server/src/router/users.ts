import express from 'express'

import { getAllUsers, deleteUser, getUser, addBookToUserLibrary, updateUser } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewear'

export default (router: express.Router) => {
    router.get('/user/all', isAuthenticated, getAllUsers)
    router.get('/user/:id', isAuthenticated, getUser)
    router.post('/user/book', isAuthenticated, isOwner, addBookToUserLibrary)
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser)
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser)
}