import chalk from "chalk";
import getCurrentTime from "./getCurrentTime";

/**
 * Formats the given message and logs it in the console.
 * @param {string} message
 * @param {"config" | "warning" | "error"} type
 * @param {boolean} logger
 * @returns
 */
function formatLog(
  message: string,
  type: "config" | "warning" | "error",
  logger: boolean
) {
  if (logger) {
    try {
      let flag = chalk.bold(chalk.white("(CONFIG)"));

      if (type === "config") {
        flag = chalk.bold(chalk.white("(CONFIG)"));
      }
      if (type === "warning") {
        flag = chalk.bold(chalk.yellow("(WARNING)"));
      }
      if (type === "error") {
        flag = chalk.bold(chalk.red("(ERROR)"));
      }

      console.log(`${flag} ${chalk.bold(`[${getCurrentTime()}]`)} ${message}`);

      return;
    } catch (error: any) {
      console.log(
        `${chalk.bold(chalk.red("(ERROR)"))} ${chalk.bold(
          `[${getCurrentTime()}]`
        )} Unexpected error occurred!`
      );

      return;
    }
  } else return;
}

export default formatLog;
