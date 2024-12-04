const db = require('../config/db');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getAllPosts() {
    return prisma.posts.findMany({});
}

async function getPostById(id) {
    return prisma.posts.findFirst({
        where: {
            id: id
        }
    });
}

async function createPost({ title, content, image }) {
    return prisma.posts.create({
        data: {
            title, content, image
        }
    });
}

async function updatePost(id, title, content, image) {
    return prisma.posts.update({
        where: {
            id: id
        },
        data: {
            title, content, image
        }
    });
}

async function deletePost(id) {
    return prisma.posts.delete({
        where: {
            id: id
        }
    });
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
