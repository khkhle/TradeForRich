import { getSignedCookie, setSignedCookie, deleteCookie } from "../../deps.js";

const secret = "Secret";
const sessionStore = new Map(); 

export const createSession = async (c, user) => {
    const sessionId = crypto.randomUUID();
    await setSignedCookie(c, "sessionId", sessionId, secret, {
        path: "/",
      });
    sessionStore.set(sessionId, user); 
};

export const getUserFromSession = async (c) => {
    // Retrieve session ID from cookie
    const sessionId = await getSignedCookie(c, secret, "sessionId");

    if (!sessionId) {
      return null; // No session ID, return null
    }

    // Check if the session store has the session ID and log the user
    if (sessionStore.has(sessionId)) {
        const user = sessionStore.get(sessionId); // Get the user associated with session ID
        return user; // Return user from session store
    }


    return; 
};

export const deleteSession= async(c)=>{
    const sessionId = await getSignedCookie(c, secret, "sessionId");
    if (!sessionId) {
      return;
    }
  
    deleteCookie(c, "sessionId", {
      path: "/",
    });

    sessionStore.delete(sessionId)
}
