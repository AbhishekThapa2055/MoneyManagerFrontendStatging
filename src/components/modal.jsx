import { IoClose } from "react-icons/io5";
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex  justify-center items-center w-full h-full overflow-hidden bg-black/40 backgdrop-blur-sm ">
      {/* modal header */}
      <div className="relative p-4  w-full max-w-2xl max-h-[90vh]">
        {/* Modal header */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
          {/* Modal Content */}

          <div className="flex item-center justify-between p-5 md:p-6 border-gray-100 rounded-t-xl ">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <button onClick={onClose}>
              <IoClose className="text-red-600" size={24} />
            </button>
          </div>
          {/* modal body */}
          <div className="p-5 md:p-6 text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
