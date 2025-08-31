import * as React from "react";

export function Input({ className, ...props }) {
  return <input className={`border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className || ""}`} {...props} />;
}
