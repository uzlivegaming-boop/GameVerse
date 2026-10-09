const express = require('express');

const router = express.Router();

const controller =
  require('../controllers/game.controller');

const validate =
  require('../middlewares/validate');

const {
  requireAuth
} = require('../middlewares/auth.middleware');

const {
  createGameSchema,
  updateGameSchema
} = require('../validations/game.validation');


// Barcha /games endpointlari authentication talab qiladi
router.use(requireAuth);


// 1. GET
router.get(
  '/',
  controller.getAll
);


// 2. GET BY ID
router.get(
  '/:id',
  controller.getById
);


// 3. POST
router.post(
  '/',
  validate(createGameSchema),
  controller.create
);


// 4. PUT
router.put(
  '/:id',
  validate(updateGameSchema),
  controller.update
);


// 5. DELETE
router.delete(
  '/:id',
  controller.remove
);


module.exports = router;