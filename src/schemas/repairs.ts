import { z } from "zod";

// export const repairSchema = z.object({
//   body: z.object({
//     firstname: z.string().min(2, "Firstame must be at least 2 characters").max(50, "Firstame must not exceed 50 characters"), 
//     surname: z.string().min(2, "Surname must be at least 2 characters").max(50, "Surname must not exceed 50 characters"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().regex(/^\d{10}$/, "Invalid phone number"), // Assumes 10-digit phone number format
//     deviceType: z.enum(["Mobile Phone", "Computer", "Tablet", "Laptop"]),
//     service: z.enum(["Mobile Phone Repair", "Computer Repair", "Tablet Repair", "Laptop Repair"]),
//     //deviceType: z.string(),
//     //service: z.string(),
//     dateavailable: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
//     timeavailable: z.string().nullish(),
//     file: z
//     .object({
//       source: z.enum(["device", "store"]),
//       url: z.string().url("Invalid file URL"),
//     })
//     .refine((value) => value.source === "device" || value.source === "store", {
//       message: "Invalid file source",
//       path: ["source"],
//     }),
//     updates: z.boolean(),
//   })
// })

export const repairDetailsSchema = z.object({
  body: z.object({
    firstname: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must not exceed 50 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters').max(50, 'Surname must not exceed 50 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'), // Assumes 10-digit phone number format
    devicetype: z.enum(["Mobile Phone", "Computer", "Tablet", "Laptop"]),
    service: z.enum(['Mobile Phone Repair', 'Computer Repair', 'Tablet Repair', 'Laptop Repair']),
    dateAvailable: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
    timeAvailable: z.string(),
    fileSource: z.enum(['device', 'store']),
    fileUrl: z.string().url('Invalid file URL'),
    updates: z.boolean()
  })
});
