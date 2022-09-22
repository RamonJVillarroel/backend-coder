class productos {
    constructor() {
      this.productos = [];
    }
    static idCount = 0;
  
    listarTodos() {
      return [...this.productos];
    };
  
    listarPorId(id) {
      const productos = this.productos.find(prod => prod.id === +id);
      return productos || { error: `Persona con id ${id} no encontrado!` };
    };
  
    guardar(prod) {
      const { name, price, image } = prod;
      if (!name|| !price || !image ) return { error: 'nombre y precio son campos obligatorios' };
      const nuevoproducto = { ...prod, id: ++productos.idCount };
      this.productos.push(nuevoproducto);
      return nuevoproducto;
    };
  
    actualizar(prod, id) {
      const indice = this.productos.findIndex(prod => prod.id === +id);
      if (indice < 0) return { error: `Persona con id ${id} no encontrado!` };
      this.productos[indice] = { id: +id, ...prod };
      return this.productos[indice];
    };
  
    eliminar(id) {
      const indice = this.productos.findIndex(prod => prod.id === +id);
      if (indice < 0) return { error: `Persona con id ${id} no encontrado!` };
      return this.productos.splice(indice, 1);
    }
  }
  
  module.exports = productos;