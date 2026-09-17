export function flatten(message) {
  if (Array.isArray(message.content))
    message.content = message.content.join("\n");

  for (let embed of message.embeds ?? [])
    if (Array.isArray(embed.description))
      embed.description = embed.description.join("\n");

  return message;
}
