import { logger } from "../utils/logger.js";
import { ws_url_builder } from "../utils/ws_url_builder.js";

export class client{
  constructor() {
    this.token = process.env.TOKEN;

    this.gateway_url = "wss://gateway.discord.gg";
    this.resume_url = "";
    this.compress = process.env.COMPRESS || false;
    this.large_threshold = process.env.LARGE_THRESHOLD || 50;
    this.intents = process.env.INTENTS || 0;
    this.shard = process.env.SHARD || [ 0, 1 ];

    this.session_id = "";
    this.sequence = null;
    this.ack_received = true;

    this.cache_method = process.env.CACHE_METHOD?.toLowerCase() || "memory"; // Memory or Redis
    this.cache = {
      channels: new Map(),
      users: new Map(),
      preferences: new Map()
    };
  }

  connect() {
    const ws = new WebSocket(ws_url_builder(this));
    ws.binaryType = "arraybuffer";

    ws.on("open", () => {
      logger.info(`[WS] Connected to [${ws.url}]`);
    });

    ws.on("message", message => {
    });

    ws.on("error", error => {
      logger.error(`[WS] Error: ${error}`);
    });

    ws.on("close", close => {
    });
  }
}
