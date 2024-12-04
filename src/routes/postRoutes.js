const express = require('express');
const multer = require('multer');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const { getPosts, getPost, createNewPost, updateExistingPost, deletePostById } = require('../controllers/postsController');
const upload = require('../middlewares/uploadMiddleware');
const validateUUIDs = require('../middlewares/validateUUIDs');

const router = express.Router();
router.post('/', verifyToken, upload.single('image'), createNewPost);

router.get('/', verifyToken, getPosts);
router.get('/:id', verifyToken, validateUUIDs, getPost);
router.put('/:id', verifyToken, validateUUIDs, upload.single('image'), updateExistingPost);
router.delete('/:id', verifyToken, deletePostById);

module.exports = router;
