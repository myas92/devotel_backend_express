const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../models/postModel');
const uuid = require('uuid');
const fs = require('fs');

async function getPosts(req, res, next) {
    try {
        const { page, limit, sortBy, sortOrder } = req.query;
        const result = await getAllPosts({ page, limit, sortBy, sortOrder });
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getPost(req, res, next) {
    try {
        const { id } = req.params;
        const result = await getPostById(id);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ data: result });
    } catch (error) {
        next(error);
    }
}

async function createNewPost(req, res, next) {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.path : null;
        if (!title || !content || !image) {
            return res.status(400).json({ error: 'Title, content, and image are required' });
        }
        const newPost = await createPost({ title, content, image });
        return res.status(201).json({ data: newPost });
    } catch (error) {
        next(error);
    }
}

async function updateExistingPost(req, res, next) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const image = req.file ? req.file.path : null;
        const updatedPost = await updatePost(id, title, content, image);
        res.json({ data: updatedPost });
    } catch (error) {
        next(error);
    }
}

async function deletePostById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await getPostById(id);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (result.image && result.image !== "") {
            fs.unlinkSync(result.image);
        }
        await deletePost(id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getPosts, getPost, createNewPost, updateExistingPost, deletePostById };
