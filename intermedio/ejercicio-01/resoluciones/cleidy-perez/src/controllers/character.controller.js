import * as characterService from '../services/character.service.js';

export const getCharacters = (req, res) => {
  try {
    const characters = characterService.getAllCharacters();
    return res.status(200).json({
      success: true,
      data: characters
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const postCharacter = (req, res) => {
  try {
    const { name, class: charClass } = req.body;

    // Validación básica de entrada
    if (!name || !charClass) {
      return res.status(400).json({ 
        success: false, 
        message: 'Los campos "name" y "class" son obligatorios.' 
      });
    }

    const newCharacter = characterService.createCharacter(req.body);
    return res.status(201).json({
      success: true,
      message: 'Personaje creado exitosamente',
      data: newCharacter
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};