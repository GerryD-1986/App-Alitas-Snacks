export const validateSchema = (schema) => (req,res, next) => {
  try{
    schema.parse(req.body);//valida el esquema
    next();//dale siguiente si lo valida
  }catch(error){
    return res.status(400).json(error.errors.map((error) => error.message));
  }
}