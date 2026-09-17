import { logger } from "./logger.js";
import { writeFile } from "fs/promises";


export async function save_json(path, content) {
  const name = path.split("/").at(-1);
  try {
    await writeFile(path, JSON.stringify(content, null, 2), "utf8");

    logger.info(`[JSON] Saved ${name}`);
  } catch (error) {
    logger.error(`[JSON] Error saving ${name}: `, { error });
  }
}
