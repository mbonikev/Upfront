export const Toast = ({ message, icon, onClose }) => (
  <div className="fixed bottom-4 right-4 flex items-center px-4 py-2 bg-gray-800 text-white rounded shadow animate-fade-in">
    {icon && <span className="mr-2">{icon}</span>}
    <span>{message}</span>
    <button className="ml-4 text-gray-400 hover:text-white" onClick={onClose}>
      ✖
    </button>
  </div>
);
