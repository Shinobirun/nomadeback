  import * as userModel from '../models/user.model.js';

  export const createUser = async (userData) => {
    try {
      return await userModel.createUser(userData);
    } catch (error) {
      throw new Error('Error al crear usuario en el servicio');
    }
  };

  // Otras funciones de servicio para usuarios
