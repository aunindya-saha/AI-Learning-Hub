import * as React from "react";

const TabsContext = React.createContext();

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(defaultValue || "");
  
  // Use controlled value if provided, otherwise use internal state
  const activeTab = value !== undefined ? value : internalActiveTab;
  const setActiveTab = onValueChange || setInternalActiveTab;
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className || ""}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }) {
  return <div className={`flex gap-2 rounded-2xl bg-slate-800/80 backdrop-blur-sm p-1 ${className || ""}`} {...props}>{children}</div>;
}

export function TabsTrigger({ value, className, children, ...props }) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button 
      className={`px-4 py-2 rounded-2xl font-medium transition ${isActive ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'} ${className || ""}`} 
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ...props }) {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div className={`mt-4 ${className || ""}`} {...props}>{children}</div>;
}
