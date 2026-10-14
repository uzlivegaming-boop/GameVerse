// backend/src/controllers/game.controller.js

const prisma = require('../prisma');

const getAll = async (req, res, next) => {
  try {
    const items = await prisma.games.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'ID noto‘g‘ri',
      });
    }

    const item = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'O‘yin topilmadi',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      category,
      platform,
      downloadUrl,
      rating,
      downloadCount,
    } = req.body;

    const item = await prisma.games.create({
      data: {
        name,
        description,
        image,
        category: category || 'Other',
        platform: platform || null,
        downloadUrl: downloadUrl || null,
        rating: rating ?? null,
        downloadCount: downloadCount ?? 0,

        // Egasi backend autentifikatsiyasidan olinadi.
        // Frontend yuborgan userId ga ishonilmaydi.
        userId: req.userId,
      },
    });

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'ID noto‘g‘ri',
      });
    }

    const existing = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'O‘yin topilmadi',
      });
    }

    const allowed = [
      'name',
      'description',
      'image',
      'category',
      'platform',
      'downloadUrl',
      'rating',
      'downloadCount',
    ];

    const data = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowed.includes(key)
      )
    );

    const item = await prisma.games.update({
      where: {
        id,
      },
      data,
    });

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        success: false,
        error: 'ID noto‘g‘ri',
      });
    }

    const existing = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'O‘yin topilmadi',
      });
    }

    await prisma.games.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};