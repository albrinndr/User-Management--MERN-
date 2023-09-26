import express from 'express';
import {
    addUsers, authAdmin, deleteUsers, getUserProfile,
    getUsers, logoutAdmin, updateUserProfile
} from '../controllers/adminController.js';
import { protect } from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.post('/auth', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/users', protect, getUsers);
router.post('/users/add', protect, addUsers);
router.
    route('/users/update')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.delete('/users/delete', protect, deleteUsers);

export default router;