import { z } from "zod";

export const repairDetailsSchema = z.object({
  body: z.object({
    firstname: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must not exceed 50 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters').max(50, 'Surname must not exceed 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{11}$/, 'Invalid phone number'), 
    deviceType: z.enum(['MobilePhone', 'Computer', 'Tablet', 'Laptop']),
    service: z.enum(['Mobile Phone Repair', 'Computer Repair', 'Tablet Repair', 'Laptop Repair']),
    dateAvailable: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
    timeAvailable: z.string(),
    fileSource: z.enum(['device', 'store']),
    fileUrl: z.string().url('Invalid file URL'),
    updates: z.boolean()
  })
});
