import * as React from "react";

export function Card({ className, variant = "default", ...props }) {
  const baseClasses = "rounded-2xl shadow transition-all duration-300";
  
  const variants = {
    default: "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50",
    glass: "glass-card",
    gradient: "bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/30"
  };
  
  const variantClasses = variants[variant] || variants.default;
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className || ""}`} 
      {...props} 
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={`p-4 ${className || ""}`} {...props} />;
}
