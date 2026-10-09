const { z } = require('zod');

const createGameSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "O'yin nomi kamida 2 ta belgidan iborat bo'lishi kerak"
    ),

  description: z
    .string()
    .min(
      3,
      "Tavsif kamida 3 ta belgidan iborat bo'lishi kerak"
    ),

  image: z
    .string()
    .min(
      1,
      "Rasm manzili bo'sh bo'lishi mumkin emas"
    ),

  downloadCount: z
    .number()
    .int()
    .min(0)
    .default(0)
});


const updateGameSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "O'yin nomi kamida 2 ta belgidan iborat bo'lishi kerak"
    )
    .optional(),

  description: z
    .string()
    .min(
      3,
      "Tavsif kamida 3 ta belgidan iborat bo'lishi kerak"
    )
    .optional(),

  image: z
    .string()
    .min(
      1,
      "Rasm manzili bo'sh bo'lishi mumkin emas"
    )
    .optional(),

  downloadCount: z
    .number()
    .int()
    .min(0)
    .optional()
});


module.exports = {
  createGameSchema,
  updateGameSchema
};