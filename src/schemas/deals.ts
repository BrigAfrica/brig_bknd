import { z } from "zod";

const DealStatus = z.enum(['ACTIVE', 'EXPIRED', 'PENDING']);

export const createDealSchema = z.object({
  body: z.object({
    discountPercentage: z.number().int(),
    originalPrice: z.number().refine(value => Number.isFinite(value) && !Number.isInteger(value), {
      message: 'Value must be a floating-point number',
    }),
    discountedPrice: z.number().refine(value => Number.isFinite(value) && !Number.isInteger(value), {
      message: 'Value must be a floating-point number',
    }),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'), 
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
    availableQuantity: z.number().int(),
    status: DealStatus,
    priority: z.number().int(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    productId: z.number().int(),
  })
});

