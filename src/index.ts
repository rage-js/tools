import formatLog from "./util/formatLog";
import readConfigFile from "./util/readConfigFile";
import path from "path";

/**
 * The tool kit class consisting all the tool functions
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

  private applicationSetup: boolean;
  private logger: boolean;

  /**
   * @param {string} configPath The path to the rage config file
   * @param [logger=false] Logger toggle to enable or disable logging
   */
  constructor(configPath: string, logger: boolean = false) {
    this.configPath = configPath;
    this.applicationSetup = false;
    this.logger = logger;
  }

  /**
   * Function that will setup the application configuration
   * @returns {boolean}
   */
  async setup() {
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
          this.localDatabasePath = path.join(process.cwd(), data.outDir);
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
}

export { MongoDBToolKit };
