const prisma = require('../prisma');


// GET /games
const getAll = async (req, res, next) => {
  try {
    const items = await prisma.games.findMany({
      where: {
        userId: req.userId
      },

      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: items
    });
  } catch (err) {
    next(err);
  }
};


// GET /games/:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid id'
      });
    }

    const item = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "O'yin topilmadi"
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};


// POST /games
const create = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      downloadCount
    } = req.body;

    const item = await prisma.games.create({
      data: {
        name,
        description,
        image,
        downloadCount,
        userId: req.userId
      }
    });

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};


// PUT /games/:id
const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid id'
      });
    }

    const existing = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "O'yin topilmadi"
      });
    }

    const item = await prisma.games.update({
      where: {
        id
      },
      data: req.body
    });

    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};


// DELETE /games/:id
const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid id'
      });
    }

    const existing = await prisma.games.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "O'yin topilmadi"
      });
    }

    await prisma.games.delete({
      where: {
        id
      }
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};