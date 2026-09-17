export function ws_url_builder(bot) {
  let url = bot.session_id ? bot.resume_url : bot.gateway_url;
  url += "?v=6&encoding=json";

  if (bot.compress)
    url += `&compress=${bot.compress}`;

  return url;
}
