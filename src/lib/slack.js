import Slack from "slack";

export default async function sendMessage(text, { token, ts, channel }) {
  let bot = new Slack({ token });

  const args = {
    token,
    channel: "#general",
    text
  };

  if (lastTs) {
    args.ts = lastTs;
    args.channel = channel;
  }

  console.log(args);

  let res = await bot.chat[lastTs ? "update" : "postMessage"](args);

  if (res.ts) {
    lastTs = res.ts;
    channel = res.channel;
  }

  return res.ts;
}

export const resetSlack = () => {
  lastTs = null;
  channel = null;
};
