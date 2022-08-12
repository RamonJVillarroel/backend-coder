class Usuario {
    constructor(nombre, apellido, libro, mascotas) {
        this.nombre = String(nombre),
        this.apellido = String(apellido),
        this.libro = [...libro],
        this.mascotas = [...mascotas]
    }
    getFullName = ()=> (`${this.nombre} ${this.apellido}`)
    addMascota = (mascotas) => this.mascotas.push(mascotas)
    countMascota = () => this.mascotas.length
    addBook = (autor, nombreLibro) => this.libro.push({'autor':autor, 'nombreLibro':nombreLibro})
    getBookName = () => this.libro.map(libro => libro.nombreLibro)
}
const usuario = new Usuario('Ramon','Villarroel', [{autor:'pedro perez', nombreLibro: 'El señor de las mascotas'}], ['perro', 'gato']);
console.log(`el nombre completo es ${usuario.getFullName()}`)
usuario.addMascota('elefante')
console.log(`el numero de mascotas es ${usuario.countMascota()}`)
usuario.addBook('Pablo Lopez', 'La estrella linda')
console.log(usuario.getBookName())