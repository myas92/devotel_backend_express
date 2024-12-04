const express = require('express');
const { checkRole, verifyToken, } = require('../middlewares/authMiddleware');
const { getPosts, getPost, createNewPost, updateExistingPost, deletePostById } = require('../controllers/postsController');
const upload = require('../middlewares/uploadMiddleware');
const validateUUIDs = require('../middlewares/validateUUIDs');
const validator = require('../middlewares/joiValidatoriMiddleware');
const postSchema = require('../schemas/postSchema');

const router = express.Router();
router.post('/', checkRole(['admin']), upload.single('image'), validator(postSchema.posts, "body"), createNewPost);

router.get('/', verifyToken, getPosts);
router.get('/:id', verifyToken, validateUUIDs, getPost);
router.put('/:id', checkRole(['admin']), validateUUIDs, upload.single('image'), validator(postSchema.posts, "body"), updateExistingPost);
router.delete('/:id', checkRole(['admin']), validateUUIDs, deletePostById);

module.exports = router;
