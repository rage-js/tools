import formatLog from "./util/formatLog";
import readConfigFile from "./util/readConfigFile";
import path from "path";

/**
 * The tool kit class consisting all the tool functions
 */
class ToolKit {
  private configPath: string;

  // @ts-ignore
  private localDatabasePath: string;
  // @ts-ignore
  private databaseType: "MongoDB";

  private databaseSecret?: string;
  private dbs?: string[];
  private excludeCollections?: string[];

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
        this.databaseType = data.databaseType;
        this.databaseSecret = data.databaseSpecificSettings.secretKey;
        this.localDatabasePath = path.join(process.cwd(), data.outDir);
        this.dbs = data.databaseSpecificSettings.dbs;
        this.excludeCollections =
          data.databaseSpecificSettings.excludeCollections;

        this.applicationSetup = true;

        return true;
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

export { ToolKit };
