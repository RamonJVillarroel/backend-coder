const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(newData) {
        try {
            const arr = await this.getAll()
            if (arr.length == 0) {
                newData.id = 1
            }
            else {
                let lastItem = arr[arr.length - 1]
                newData.id = lastItem.id + 1
            }
            arr.push(newData)
            await fs.promises.writeFile(this.fileName, JSON.stringify(arr))
            console.log(`se añadio un item nuevo: ${newData.id}`)
            return newData.id
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAll() {

        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8')

            return JSON.parse(data)
        }
        catch (err) {
            return []
        }
    }

    async getById(id) {

        try {
            const arr = await this.getAll()
            let match = arr.filter((item) => item.id === id)
            if (match.length) {
                console.log(match)
                return match
            }
            else {
                console.log(`objeto no encontrado`)
                return null
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteById(idToDelete) {
        try {
            const arr = await this.getAll()
            let match = arr.find(item => item.id === idToDelete)
            if (match == undefined) {
                return console.log(`Artículo No Encontrado‼, Verificar ID`)
            }
            else {
                let toDelete = arr.indexOf(match)
                arr.splice(toDelete, 1)
                await fs.promises.writeFile(this.fileName, JSON.stringify(arr))
                return console.log(`Elemento encontrado y eliminado`)
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]))
            return console.log(`Lista Borrada`)

        }
        catch (err) {
            console.log(err)
        }
    }
    async productoAzar() {
        try {
            const arr = await this.getAll();
            let azar = arr[Math.floor(Math.random() * arr.length)]
            
            return   azar
        }
        catch (error) {
            console.log(error);
        }


    }
}

module.exports = Contenedor