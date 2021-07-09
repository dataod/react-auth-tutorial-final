import axios from "axios";
import logger from "../components/logger";

const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

export async function checkSession() {
  try {
    const {
      data: { sessionUser },
    } = await axios({
      method: "GET",
      withCredentials: true,
      url: `${SESSIONS_API}/user`,
    });

    let preloadedState = {};
    if (sessionUser) {
      preloadedState = {
        user: {
          session: sessionUser,
        },
      };
    }

    return preloadedState;
  } catch (err) {
    logger.error({ err: err }, "Preloaded state session error.");
  }
}
