
import { z } from 'zod'
export const phoneE164 = z.string().regex(/^\+?[1-9]\d{1,14}$/,'Invalid phone (E.164)')
export const bookingSchema = z.object({
  name: z.string().min(2),
  phone: phoneE164,
  partySize: z.coerce.number().int().min(1).max(20),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, { errorMap:() => ({ message:'Consent required'})})
})
export const orderItemSchema = z.object({
  menuItemId: z.string(),
  qty: z.number().int().min(1).max(20),
  notes: z.string().max(300).optional(),
})
export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  phone: phoneE164.optional(),
})
