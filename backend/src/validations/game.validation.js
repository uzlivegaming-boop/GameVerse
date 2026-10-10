
const { z } = require('zod');

const optionalUrl = z
  .union([z.string().url(), z.literal('')])
  .optional();

const createGameSchema = z.object({
  name: z.string().trim().min(
    2,
    'O‘yin nomi kamida 2 ta belgidan iborat bo‘lsin'
  ),
  description: z.string().trim().min(
    3,
    'Tavsif kamida 3 ta belgidan iborat bo‘lsin'
  ),
  image: z.string().trim().min(
    1,
    'Rasm manzili kiritilishi kerak'
  ),
  category: z.string().trim().min(2).optional(),
  platform: z.string().trim().optional().nullable(),
  downloadUrl: optionalUrl,
  rating: z.number().min(0).max(5).optional().nullable(),
  downloadCount: z.number().int().min(0).optional().default(0)
});

const updateGameSchema = z.object({
  name: z.string().trim().min(2).optional(),
  description: z.string().trim().min(3).optional(),
  image: z.string().trim().min(1).optional(),
  category: z.string().trim().min(2).optional(),
  platform: z.string().trim().optional().nullable(),
  downloadUrl: optionalUrl,
  rating: z.number().min(0).max(5).optional().nullable(),
  downloadCount: z.number().int().min(0).optional()
}).refine(
  value => Object.keys(value).length > 0,
  'Kamida bitta maydon yuboring'
);

module.exports = {
  createGameSchema,
  updateGameSchema
};
