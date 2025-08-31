import * as React from "react";

const AccordionContext = React.createContext();

export function Accordion({ type = "single", collapsible = false, className, children, ...props }) {
  const [openItems, setOpenItems] = React.useState(new Set());
  
  const toggleItem = (value) => {
    const newOpenItems = new Set(openItems);
    if (type === "single") {
      if (openItems.has(value)) {
        if (collapsible) {
          newOpenItems.clear();
        }
      } else {
        newOpenItems.clear();
        newOpenItems.add(value);
      }
    } else {
      if (openItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.add(value);
      }
    }
    setOpenItems(newOpenItems);
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`border rounded-2xl ${className || ""}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className, children, ...props }) {
  return <div className={`border-b last:border-b-0 ${className || ""}`} {...props}>{children}</div>;
}

export function AccordionTrigger({ value, className, children, ...props }) {
  const { openItems, toggleItem } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);
  
  return (
    <button 
      className={`w-full text-left px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200 transition flex items-center justify-between ${className || ""}`} 
      onClick={() => toggleItem(value)}
      {...props}
    >
      {children}
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
    </button>
  );
}

export function AccordionContent({ value, className, children, ...props }) {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);
  
  if (!isOpen) return null;
  
  return <div className={`px-4 py-2 ${className || ""}`} {...props}>{children}</div>;
}
