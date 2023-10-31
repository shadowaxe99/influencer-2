
// Import statements and other initializations here...

export default function Playground() {
  // Your existing playground.js code here...
  
  // Add the new features...
  
  return (
    <div>
      {/* Add a button with an emoji for each language */}
      <button onClick={() => i18n.changeLanguage('en')}>🇺🇸</button>
      <button onClick={() => i18n.changeLanguage('es')}>🇪🇸</button>
      
      {/* Rest of your component */}
    </div>
  );
}
