import {
  createLogger,
  INFO,
  ERROR,
  stdSerializers,
  ConsoleFormattedStream,
} from "browser-bunyan";
import { ServerStream } from "@browser-bunyan/server-stream";

const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

let logger;
if (process.env.NODE_ENV === "development") {
  logger = createLogger({
    name: "ReactDevLogger",
    streams: [
      {
        level: INFO, // or use the string 'info'
        stream: new ConsoleFormattedStream({
          css: {
            levels: {
              trace: "color: DeepPink",
              debug: "color: GoldenRod",
              info: "color: DarkTurquoise",
              warn: "color: Purple",
              error: "color: Crimson",
              fatal: "color: Black",
            },
            def: "color: DimGray",
            msg: "color: SteelBlue",
            src: "color: DimGray; font-style: italic; font-size: 0.9em",
          },
        }),
      },

      {
        level: ERROR,
        stream: new ServerStream({
          method: "PUT",
          withCredentials: true,
          url: `${SESSIONS_API}/client-logs`,
        }),
      },
    ],
    serializers: {
      err: stdSerializers.err,
    },
    src: true,
  });
} else {
  logger = createLogger({
    name: "ReactProdLogger",
    streams: [
      {
        level: INFO,
        stream: new ServerStream({
          method: "PUT",
          withCredentials: true,
          url: `${SESSIONS_API}/client-logs`,
        }),
      },
      {
        level: ERROR,
        stream: new ServerStream({
          method: "PUT",
          withCredentials: true,
          url: `${SESSIONS_API}/client-logs`,
        }),
      },
    ],
    serializers: {
      err: stdSerializers.err,
    },
  });
}

export default logger;
