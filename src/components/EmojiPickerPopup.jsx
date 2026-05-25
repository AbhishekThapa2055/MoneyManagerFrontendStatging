import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    // setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div>
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <MdImage className="text-purple-400" size={24} />
          )}
        </div>
        <p> {icon ? "Change icon" : "Pick Icon"} </p>
      </div>
      {isOpen && (
        <div className="relative" ref={pickerRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute -top-4 -right-2 z-10 bg-gray-200 rounded-full p-1 shadow"
          >
            <IoClose className="text-gray-700" size={18} />
          </button>
          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};
export default EmojiPickerPopup;
