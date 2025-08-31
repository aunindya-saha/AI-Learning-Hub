import * as React from "react";

export function Button({ className, variant = "default", ...props }) {
  const baseClasses = "px-4 py-2 rounded-2xl shadow font-medium transition-all duration-200 transform hover:scale-105";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    gradient: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700"
  };
  
  const variantClasses = variants[variant] || variants.default;
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className || ""}`} 
      {...props} 
    />
  );
}
