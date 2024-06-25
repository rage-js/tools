import formatLog from "../../util/formatLog";
import MongoDBSchema from "./MongoDBSchema";
import path from "path";
import fsS from "fs";
import * as fsP from "fs/promises";

/**
 * A type class that allows the user to perform collection related operations like finding, writing and deleting documents.
 */
class MongoDBCollection {
  public collectionName: string;
  public databaseName: string;
  public documents: Object[];
  private schema: MongoDBSchema;
  // Logger is always meant to be true
  private logger: true = true;
  private localDatabasePath: string;

  constructor(
    collectionName: string,
    databaseName: string,
    documents: Object[],
    schema: MongoDBSchema,
    localDatabasePath: string
  ) {
    this.collectionName = collectionName;
    this.documents = documents;
    this.schema = schema;
    this.databaseName = databaseName;
    this.localDatabasePath = localDatabasePath;
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

      const fullPath = path.join(
        this.localDatabasePath,
        this.databaseName,
        `${this.collectionName}.json`
      );

      if (!fsS.existsSync(fullPath)) {
        formatLog(
          "Couldn't find the collection json file",
          "error",
          this.logger
        );
        return false;
      }

      let fileData: any[] | string = await fsP.readFile(fullPath, "utf-8");
      if (fileData === "[]") {
        fileData = [];
      } else {
        fileData = JSON.parse(fileData);
      }

      // @ts-ignore
      fileData.push(arg);

      fileData = JSON.stringify(fileData, null, 2);
      await fsP.writeFile(fullPath, fileData, "utf-8");

      return true;
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
