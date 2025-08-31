import * as React from "react";

export function Badge({ className, ...props }) {
  return <span className={`inline-block bg-purple-600/80 text-purple-100 px-3 py-1 rounded-full text-xs font-medium ${className || ""}`} {...props} />;
}
