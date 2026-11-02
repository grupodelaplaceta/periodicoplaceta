export const SECTIONS = [
  { id: 'innovacion', name: 'Innovación', icon: 'bulb' },
  { id: 'grupo', name: 'Grupo', icon: 'users' },
  { id: 'juvenil', name: 'Juvenil', icon: 'lightning' },
  { id: 'junior', name: 'Junior', icon: 'puzzle' },
  { id: 'eventos-y-festividades', name: 'Eventos y festividades', icon: 'party' },
];
export const sectionById = (id) => SECTIONS.find((s) => s.id === id) || SECTIONS[1];
