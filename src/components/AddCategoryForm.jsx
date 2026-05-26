import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { FaSpinner } from "react-icons/fa";
const AddCategoryForm = ({ onAddCategory, loading, setLoading }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];
  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = () => {
    onAddCategory(category);
  };
  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="eg Freelance,Salary,Bonus"
        type="text"
      />
      <SelectInput
        value={category.type}
        onChange={(value) => handleChange("type", value)}
        options={categoryTypeOptions}
        label="Category Type"
      />
      <div className="mt-5 flex justify-center w-full">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white shadow-2xl p-2 border rounded-lg w-[400px]"
        >
          Submit
        </button>
        {loading && (
          <FaSpinner className="text-4xl text-gray-600 animate-spin" />
        )}
      </div>
    </div>
  );
};
export default AddCategoryForm;
