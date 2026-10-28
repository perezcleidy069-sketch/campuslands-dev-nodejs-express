// Simulación de una base de datos en memoria para el ejemplo
const characters = [
    { id: 1, name: 'Ariadna', class: 'Exploradora', level: 1, status: 'Lista para la aventura' },
    { id: 2, name: 'Thorin', class: 'Guerrero', level: 3, status: 'En combate' }
  ];
  
  // Obtener todos los personajes (v1)
  const getCharactersV1 = (req, res) => {
    res.status(200).json({
      success: true,
      version: 'v1',
      count: characters.length,
      data: characters
    });
  };
  
  // Crear un nuevo personaje (v1)
  const createCharacterV1 = (req, res) => {
    const { name, class: charClass, level } = req.body;
  
    if (!name || !charClass) {
      return res.status(400).json({
        success: false,
        message: 'El nombre y la clase del personaje son obligatorios.'
      });
    }
  
    const newCharacter = {
      id: characters.length + 1,
      name,
      class: charClass,
      level: level || 1,
      status: 'Listo para la aventura'
    };
  
    characters.push(newCharacter);
  
    res.status(201).json({
      success: true,
      message: 'Personaje creado exitosamente en v1',
      data: newCharacter
    });
  };
  
  module.exports = {
    getCharactersV1,
    createCharacterV1
  };