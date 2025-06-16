"use client";

import { AuthProvider } from "@line-demo/shared/contexts/AuthContext";
import { StampRallyProvider } from "@line-demo/shared/contexts/StampRallyContext";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <StampRallyProvider>
        {children}
      </StampRallyProvider>
    </AuthProvider>
  );
}