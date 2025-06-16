"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthProvider: () => AuthProvider,
  GlobalContext: () => GlobalContext,
  StampRallyProvider: () => StampRallyProvider,
  useAuth: () => useAuth,
  useGlobalContext: () => useGlobalContext,
  useStampRally: () => useStampRally
});
module.exports = __toCommonJS(index_exports);

// src/contexts/GlobalContext.ts
var import_react = require("react");
var GlobalContext = (0, import_react.createContext)(null);

// src/contexts/AuthContext.tsx
var import_react3 = require("react");

// src/hooks/useGlobalContext.ts
var import_react2 = require("react");
var useGlobalContext = () => {
  const value = (0, import_react2.useContext)(GlobalContext);
  if (!value) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return value;
};

// src/contexts/AuthContext.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AuthContext = (0, import_react3.createContext)(null);
var AuthProvider = ({ children }) => {
  const { liff } = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = (0, import_react3.useState)(false);
  const [profile, setProfile] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const context = (0, import_react3.useContext)(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// src/contexts/StampRallyContext.tsx
var import_react4 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var StampRallyContext = (0, import_react4.createContext)(void 0);
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
  const [stamps, setStamps] = (0, import_react4.useState)(() => {
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
  (0, import_react4.useEffect)(() => {
    localStorage.setItem("stamps", JSON.stringify(stamps));
  }, [stamps]);
  const collectStamp = (stampId) => {
    setStamps(
      (prevStamps) => prevStamps.map(
        (stamp) => stamp.id === stampId ? { ...stamp, isCollected: true, collectedAt: /* @__PURE__ */ new Date() } : stamp
      )
    );
  };
  const resetStamps = () => {
    setStamps(INITIAL_STAMPS);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    StampRallyContext.Provider,
    {
      value: {
        stamps,
        collectedCount,
        isCompleted,
        collectStamp,
        resetStamps
      },
      children
    }
  );
}
function useStampRally() {
  const context = (0, import_react4.useContext)(StampRallyContext);
  if (context === void 0) {
    throw new Error("useStampRally must be used within a StampRallyProvider");
  }
  return context;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthProvider,
  GlobalContext,
  StampRallyProvider,
  useAuth,
  useGlobalContext,
  useStampRally
});
