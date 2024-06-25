/**
 * A type class to define a collection's schema.
 */
class MongoDBSchema {
  private schema: { [key: string]: string };

  constructor(schema: { [key: string]: any }) {
    // for (let key in schema) {
    //   if (schema.hasOwnProperty(key)) {
    //     let value = schema[key];
    //     if (value === String) {
    //       schema[key] = "string";
    //     }
    //     if (value === Number) {
    //       schema[key] = "number";
    //     }
    //     if (value === Boolean) {
    //       schema[key] = "boolean";
    //     }
    //     if (value === null) {
    //       // Raise error
    //     }
    //     if (value === undefined) {
    //       // Raise error
    //     }
    //   }
    // }
    this.schema = schema;
  }

  /**
   * Returns the schema.
   * @returns {{ [key: string]: any }}
   */
  getSchema() {
    return this.schema;
  }
}

export default MongoDBSchema;
