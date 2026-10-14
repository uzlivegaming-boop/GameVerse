// backend/src/routes/game.routes.js

const express = require('express');
const router = express.Router();

const controller = require('../controllers/game.controller');
const validate = require('../middlewares/validate');

const {
  requireAuth,
} = require('../middlewares/auth.middleware');

const {
  createGameSchema,
  updateGameSchema,
} = require('../validations/game.validation');

// Barcha /games endpointlari login talab qiladi.
router.use(requireAuth);

// O'yinlarni olish
router.get('/', controller.getAll);

// Bitta o'yinni olish
router.get('/:id', controller.getById);

// Yangi o'yin qo'shish
router.post(
  '/',
  validate(createGameSchema),
  controller.create
);

// O'yinni tahrirlash
router.put(
  '/:id',
  validate(updateGameSchema),
  controller.update
);

// O'yinni o'chirish
router.delete('/:id', controller.remove);

module.exports = router;