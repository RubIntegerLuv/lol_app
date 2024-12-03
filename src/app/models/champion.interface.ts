export interface Champion {
  id: string; // ID único del campeón
  name: string; // Nombre del campeón
  title: string; // Título del campeón
  image: {
    full: string; // URL de la imagen completa del campeón
  };
  spells: Array<{
    id: string; // ID único de la habilidad
    name: string; // Nombre de la habilidad
    description: string; // Descripción de la habilidad
    image: {
      full: string; // URL de la imagen de la habilidad
    };
  }>; // Lista de habilidades del campeón
  region?: string; // Región (opcional)
  roles: string[]; // Roles del campeón, es un arreglo de strings
  lore: string; // Historia del campeón
}
