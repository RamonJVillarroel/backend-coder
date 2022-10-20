const knex = require("knex");

class Products {
  constructor(tableName, dbConfig) {
    (this.table = tableName), (this.knex = knex(dbConfig));

    this.knex.schema
      .hasTable(this.table)
      .then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable(this.table, (table) => {
            table.increments("id").notNullable().primary();
            table.string("name", 100).notNullable();
            table.string("image").notNullable();
            table.float("price").notNullable();
            table.string("stock").notNullable();
            table.string("codigo").notNullable();
            table.string("description").notNullable();
        
          });
        }
      })
      .catch((err) => console.log("error en constructor", err));
  }

  async getAll() {
    try {
      const products = await this.knex
        .from(this.table)
        .select("id", "name", "price","stock","description","codigo","image");
      console.table(products);
      return products;
    } catch (error) {
      console.log(error);
    } finally {
       /* this.knex.destroy() */
    }
  }

  async getById(id) {
    try {
      const product = await this.knex
        .from(this.table)
        .select("id", "name", "price","stock","description","codigo","image" )
        .where({ id: id });
      console.table(product);
    } catch (error) {
      console.log("error al obtener producto", error);
    } finally {
      /* knex(this.config).destroy(); */
    }
  }

  async save(product) {
    const { name, price, description, image, codigo, stock } = product;
    if (!name || !price || !image || !description || !codigo || !stock) {
      return null;
    }

    const newProduct = {
      name,
      price,
      description,
      codigo,
      stock,
      image,
    };

    try {
      await this.knex(this.table).insert(newProduct);
    } catch (error) {
      console.log(error);
    } finally {
       /* this.knex.destroy() */
    }

    return {
      message: "Product Created",
      product: newProduct,
    };
  }

  async update(id, product) {
    const {  name, price, description, image, codigo, stock } = product;
    try {
      await this.knex.from(this.table)
      .where({ id: id })
      .update({
        name: name,
        price: price,
       image: image,
       codigo: codigo,
      stock:stock,
      description:description,
      });
    } catch (error) {
      console.log("error al actualizar producto", error);
    } finally {
      /* knex(this.config).destroy(); */
    }
    return { message: "Product updated OK" };
  }

  async deleteById(id) {
    try {
      await this.knex.from(this.table).where({ id }).del();
    } catch (error) {
      console.log(error);
    } finally {
      /*       this.knex.destroy() */
    }
    return { message: "Products was deleted OK" };
  }
}

module.exports = Products;