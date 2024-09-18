import {z} from "zod";

//z nos permite dar tipos de datos, cuando viene un dato va a ver un request.body

//validar el registro
export const registerSchema = z.object({
  username: z.string({
    required_error: "Nombre de usuario requerido",
  }),
  email: z.string({
    required_error: "Correo requerido se require un usuario valido",
  }).email({
    message: "Correo invalido",
  }),
  password: z.string({
    required_error: "Contraseña requerida",
  }).min(6, {
    message: "La contraseña debe tener mas de 6 caracteres",
  }),
});

//validar cuando te logeas
export const loginSchema = z.object({
    email: z.string({
        required_error: "Correo requerido",
      }).email({
        message: "Correo invalido, no se encontro",
      }),
      password: z.string({
        required_error: "Contraseña requerida",
      }).min(6, {
        message: "La contraseña debe tener mas de 6 caracteres",
      }),
});