const SelectInput = ({ value, onChange, options, label }) => {
  return (
    <div>
      <label className="text-[13px]  text-slate-800 block mb-1">{label} </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border p-2 rounded w-full outline-none transition
  ${value ? "border-blue-500" : "border-gray-300"}
  
`}
      >
        <option value="">Select</option>

        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
