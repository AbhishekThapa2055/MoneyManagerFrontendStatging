import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = () => {
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
    </div>
  );
};
export default AddCategoryForm;
