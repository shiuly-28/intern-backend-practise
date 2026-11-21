import z from "zod";


const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .email({ error: 'Invalid email format' }), // z.string().email() still works, or top-level z.email() in v4
    password: z
      .string({ error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
      
  }),
});

//   

export const UserValidation = {
  createUserValidationSchema,
};