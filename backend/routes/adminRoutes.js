import express from 'express';
import {
    addUsers, authAdmin, deleteUsers, getUserProfile,
    getUsers, logoutAdmin, updateUserProfile
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/auth', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/users', getUsers);
router.post('/users/add', addUsers);
router.
    route('/users/update')
    .get(getUserProfile)
    .put(updateUserProfile);
router.delete('/users/delete', deleteUsers);

export default router;