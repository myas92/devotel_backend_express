const db = require('../config/db');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getAllPosts({ page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' }) {
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));
    const skip = (page - 1) * limit;
    const take = limit;

    const order = sortOrder === 'desc' ? 'desc' : 'asc';
    const [posts, totalCount] = await Promise.all([
        prisma.posts.findMany({
            skip,
            take,
            orderBy: {
                [sortBy]: order,
            },
        }),
        prisma.posts.count(),
    ]);
    return {
        meta: {
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
        },
        data: posts,
    };
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
