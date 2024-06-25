import formatLog from "../../util/formatLog";
import MongoDBSchema from "./MongoDBSchema";

/**
 * A type class that allows the user to perform collection related operations like finding, writing and deleting documents.
 */
class MongoDBCollection {
  public collectionName: string;
  public documents: Object[];
  private schema: MongoDBSchema;
  // Logger is always meant to be true
  private logger: true = true;

  constructor(
    collectionName: string,
    documents: Object[],
    schema: MongoDBSchema
  ) {
    this.collectionName = collectionName;
    this.documents = documents;
    this.schema = schema;
  }

  async createDocument(arg: { [key: string]: any }) {
    try {
      for (let key in arg) {
        if (arg.hasOwnProperty(key)) {
          let schema = this.schema.getSchema();
          if (schema[key] && typeof arg[key] === schema[key]) {
          } else {
            formatLog(
              `Type ${typeof arg[key]} is not assignable to ${key} whose type ${
                schema[key]
              }`,
              "error",
              this.logger
            );
            return false;
          }
        }
      }

      console.log("All are matching!");
    } catch (error) {
      formatLog(
        "Unexpected error occurred, while creating document",
        "error",
        this.logger
      );
      return false;
    }
  }
}

export default MongoDBCollection;
