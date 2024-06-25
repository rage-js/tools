import MongoDBSchema from "./MongoDBSchema";

/**
 * A type class that allows the user to perform collection related operations like finding, writing and deleting documents.
 */
class MongoDBCollection {
  public collectionName: string;
  public documents: Object[];
  private schema: MongoDBSchema;

  constructor(
    collectionName: string,
    documents: Object[],
    schema: MongoDBSchema
  ) {
    this.collectionName = collectionName;
    this.documents = documents;
    this.schema = schema;
  }

  async create(arg: { [key: string]: any }) {
    for (let key in arg) {
      if (arg.hasOwnProperty(key)) {
        let value = arg[key];
        let schema = this.schema.getSchema();
        if (schema[key] && typeof arg[key] === schema[key]) {
          console.log(value, "matching!");
        }
      }
    }
  }
}

export default MongoDBCollection;
