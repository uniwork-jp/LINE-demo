// src/contexts/GlobalContext.ts
import { createContext } from "react";
var GlobalContext = createContext(null);

// src/contexts/AuthContext.tsx
import { createContext as createContext2, useContext as useContext2, useState, useEffect } from "react";

// src/hooks/useGlobalContext.ts
import { useContext } from "react";
var useGlobalContext = () => {
  const value = useContext(GlobalContext);
  if (!value) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return value;
};

// src/contexts/AuthContext.tsx
import { jsx } from "react/jsx-runtime";
var AuthContext = createContext2(null);
var AuthProvider = ({ children }) => {
  const { liff } = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (!liff) return;
    const checkLogin = async () => {
      const loggedIn = liff.isLoggedIn();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        try {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } catch (error) {
          console.error("Failed to get profile:", error);
          setProfile(null);
        }
      }
    };
    checkLogin();
  }, [liff]);
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        isLoggedIn,
        profile
      },
      children
    }
  );
};
var useAuth = () => {
  const context = useContext2(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// src/contexts/StampRallyContext.tsx
import { createContext as createContext3, useContext as useContext3, useState as useState2, useEffect as useEffect2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var StampRallyContext = createContext3(void 0);
var INITIAL_STAMPS = [
  { id: 1, name: "\u30B9\u30BF\u30F3\u30D71", location: "\u5730\u70B91", isCollected: false },
  { id: 2, name: "\u30B9\u30BF\u30F3\u30D72", location: "\u5730\u70B92", isCollected: false },
  { id: 3, name: "\u30B9\u30BF\u30F3\u30D73", location: "\u5730\u70B93", isCollected: false },
  { id: 4, name: "\u30B9\u30BF\u30F3\u30D74", location: "\u5730\u70B94", isCollected: false },
  { id: 5, name: "\u30B9\u30BF\u30F3\u30D75", location: "\u5730\u70B95", isCollected: false },
  { id: 6, name: "\u30B9\u30BF\u30F3\u30D76", location: "\u5730\u70B96", isCollected: false },
  { id: 7, name: "\u30B9\u30BF\u30F3\u30D77", location: "\u5730\u70B97", isCollected: false },
  { id: 8, name: "\u30B9\u30BF\u30F3\u30D78", location: "\u5730\u70B98", isCollected: false }
];
function StampRallyProvider({ children }) {
  const [stamps, setStamps] = useState2(() => {
    if (typeof window !== "undefined") {
      const savedStamps = localStorage.getItem("stamps");
      if (savedStamps) {
        return JSON.parse(savedStamps);
      }
    }
    return INITIAL_STAMPS;
  });
  const collectedCount = stamps.filter((stamp) => stamp.isCollected).length;
  const isCompleted = collectedCount === stamps.length;
  useEffect2(() => {
    localStorage.setItem("stamps", JSON.stringify(stamps));
  }, [stamps]);
  const collectStamp = (stampId) => {
    setStamps(
      (prevStamps) => prevStamps.map(
        (stamp) => stamp.id === stampId ? { ...stamp, isCollected: true, collectedAt: /* @__PURE__ */ new Date() } : stamp
      )
    );
  };
  const checkStamp = async (stampId) => {
    const id = parseInt(stampId, 10);
    if (isNaN(id) || id < 1 || id > stamps.length) {
      throw new Error("\u7121\u52B9\u306A\u30B9\u30BF\u30F3\u30D7ID\u3067\u3059");
    }
    collectStamp(id);
  };
  const resetStamps = () => {
    setStamps(INITIAL_STAMPS);
  };
  return /* @__PURE__ */ jsx2(
    StampRallyContext.Provider,
    {
      value: {
        stamps,
        collectedCount,
        isCompleted,
        collectStamp,
        checkStamp,
        resetStamps
      },
      children
    }
  );
}
function useStampRally() {
  const context = useContext3(StampRallyContext);
  if (context === void 0) {
    throw new Error("useStampRally must be used within a StampRallyProvider");
  }
  return context;
}
export {
  AuthProvider,
  GlobalContext,
  StampRallyProvider,
  useAuth,
  useGlobalContext,
  useStampRally
};
