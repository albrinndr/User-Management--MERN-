import express from 'express';
import multer from 'multer';
import {
    authUser, registerUser, logoutUser, getUserProfile, updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { userImage } from "../config/multer.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 } });

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.
    route('/profile')
    .get(protect, getUserProfile)
    .put(protect, userImage.single("file"), updateUserProfile);

export default router;
