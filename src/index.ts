import MongoDBCollection from "./classes/mongodb/MongoDBCollection";
import MongoDBSchema from "./classes/mongodb/MongoDBSchema";
import getSchema from "./util/MongoDB/getSchema";
import formatLog from "./util/formatLog";
import readConfigFile from "./util/readConfigFile";
import fs from "fs/promises";
import path from "path";

/**
 * @description The tool kit class consisting all the tool functions
 */
class MongoDBToolKit {
  private configPath: string;

  // @ts-ignore
  private localDatabasePath: string;
  // @ts-ignore
  private databaseSecret: string;
  // @ts-ignore
  private dbs: string[];
  // @ts-ignore
  private excludeCollections: string[];

  public applicationSetup: boolean;

  private logger: boolean;

  /**
   * @param {string} configPath The path to the rage config file
   * @param [logger=false] Logger toggle to enable or disable logging
   * @example
   * // Initialize the tool kit
   * const toolKit = new MongoDBSToolKit("./rage.config.json", true);
   */
  constructor(configPath: string, logger: boolean = false) {
    this.configPath = configPath;
    this.applicationSetup = false;
    this.logger = logger;
  }

  /**
   * Function that will setup the application configuration
   * @example
   * // Initialize the tool kit
   * const toolKit = new MongoDBToolKit("./rage.config.json", true);
   * await toolKit.setup();
   * @returns {Promise<boolean>}
   */
  async setup(): Promise<boolean> {
    try {
      const data = await readConfigFile(this.configPath, this.logger);
      if (data !== false) {
        if (
          data.databaseType === "MongoDB" &&
          data.databaseSpecificSettings.secretKey &&
          data.databaseSpecificSettings.dbs &&
          data.databaseSpecificSettings.excludeCollections
        ) {
          this.databaseSecret = data.databaseSpecificSettings.secretKey;
          this.localDatabasePath = data.outDir; // path.join(process.cwd(), data.outDir);
          this.dbs = data.databaseSpecificSettings.dbs;
          this.excludeCollections =
            data.databaseSpecificSettings.excludeCollections;

          this.applicationSetup = true;

          return true;
        } else {
          formatLog(
            "The given configuration says that the database is not MongoDB, this class only supports MongoDB databases.",
            "error",
            this.logger
          );

          return false;
        }
      } else {
        return false;
      }
    } catch (error: any) {
      formatLog(
        "Unexpected error occurred, when trying to setup the configuration",
        "error",
        this.logger
      );

      return false;
    }
  }

  /**
   * Creates a new MongoDB collection.
   * @param {string} collectionName
   * @param {string} databaseName
   * @example
   * // Create a new json collection (on the local database) using the tool kit
   *
   * const tookKit = new MongoDBToolKit("./rage.config.json", true);
   * await toolKit.setup();
   *
   * await toolKit.createCollection("database1", "collection6");
   * @returns {Promise<boolean>}
   */
  async createCollection(
    databaseName: string,
    collectionName: string
  ): Promise<boolean> {
    try {
      if (this.dbs.includes(databaseName)) {
        const fullPath = path.join(
          this.localDatabasePath,
          databaseName,
          `${collectionName}.json`
        );

        try {
          await fs.readFile(fullPath, "utf-8");
          formatLog(
            "Collection already exists! Please rename the collection.",
            "error",
            this.logger
          );
          return false;
        } catch (error: any) {
          if (error.code === "ENOENT") {
            await fs.writeFile(fullPath, JSON.stringify([]), "utf-8");
            return true;
          } else {
            formatLog(
              "Unexpected error occurred, while trying to create the collection",
              "error",
              this.logger
            );
            return false;
          }
        }
      } else {
        formatLog(
          `Database with the name ${databaseName} doesn't exist, please provide an existing one.`,
          "error",
          this.logger
        );
        formatLog(
          "You can only create databases via MongoDB Atlas only as this tool kit doesn't support that feature yet.",
          "warning",
          this.logger
        );
        return false;
      }
    } catch (error: any) {
      console.log(error);
      formatLog(
        "Unexpected error occurred, when trying to create collection",
        "error",
        this.logger
      );

      return false;
    }
  }

  /**
   * Finds the collection and returns it as MongoDBCollection object class.
   * @param {string} databaseName
   * @param {string} collectionName
   * @example
   * // Find a collection from the local database and return a MongoDBCollection object
   * const toolKit = new MongoDBToolKit("./rage.config.json", true);
   * await toolKit.setup();
   *
   * const collection = await toolKit.findCollection("database1", "collection3");
   * if (collection) {
   *   // collection.(...) <-- MongoDBCollection
   * }
   * @returns {Promise<import("./classes/MongoDB/MongoDBCollection") | false>}
   */
  async findCollection(
    databaseName: string,
    collectionName: string
  ): Promise<MongoDBCollection | false> {
    try {
      if (this.dbs.includes(databaseName)) {
        const fullPath = path.join(
          this.localDatabasePath,
          databaseName,
          `${collectionName}.json`
        );
        try {
          let data: string | Object[] = await fs.readFile(fullPath, "utf-8");
          if (data === "[]") {
            data = [];
          } else {
            data = JSON.parse(data);
          }

          const schema = await getSchema(
            this.localDatabasePath,
            databaseName,
            collectionName,
            this.logger
          );

          return new MongoDBCollection(
            collectionName,
            databaseName,
            // @ts-ignore
            data,
            schema,
            this.localDatabasePath
          );
        } catch (error: any) {
          if (error.code === "ENOENT") {
            formatLog("Collection doesn't exist.", "error", this.logger);
            return false;
          } else {
            formatLog(
              "Unexpected error occurred, when trying to read the collection.",
              "error",
              this.logger
            );
            return false;
          }
        }
      } else {
        formatLog(
          `Database with the name ${databaseName} doesn't exist, please provide an existing one.`,
          "error",
          this.logger
        );
        formatLog(
          "You can only create databases via MongoDB Atlas only as this tool kit doesn't support that feature yet.",
          "warning",
          this.logger
        );
        return false;
      }
    } catch (error: any) {
      formatLog(
        "Unexpected error occurred, when trying to find collection",
        "error",
        this.logger
      );

      return false;
    }
  }
}

export { MongoDBToolKit, MongoDBCollection, MongoDBSchema };
export type * from "./main";
