import { logger } from "./logger.js";
import { access, readFile } from "fs/promises";
import { parse } from "jsonc-parser";


export async function load_json(path) {
  try {
    await access(path);
  } catch {
    logger.warn(`[JSON] ${path} does not exist, using empty object`);
    return {};
  }

  const name = path.split("/").at(-1);
  const content = await readFile(path, { encoding: "utf8" });

  try {
    let data = {};
    if (name.endsWith(".jsonc")) {
      data = parse(content);
    } else {
      data = JSON.parse(content);
    }

    logger.info(`[JSON] Loaded ${name}`);
    return data;
  } catch (error) {
    logger.error(`[JSON] Error loading ${name}:`, { error });
    return {};
  }
}
