const Contenedor = require('./master.js')

let container = new Contenedor('./items/items.json')

container.getAll().then(res => console.log(res))

container.getById(2).then(res => res)
container.getById(8).then(res => res)
console.log(container.getById(8).then(res => res))
newData = {
    "id": "",
    "title": "Poción",
    "price": 50,
}
container.save(newData).then(res => res)

//container.deleteById(5).then(res => res)

//container.deleteAll().then(res => res)