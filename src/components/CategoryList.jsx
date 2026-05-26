import { FaPencilAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
const CategoryList = ({ categories, onEditCategory, loading }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources </h4>
      </div>
      {loading && (
        <div className="flex justify-center">
          <FaSpinner className="text-5xl text-gray-600 animate-spin" />
        </div>
      )}

      {/* category list */}
      {categories.length === 0 && !loading ? (
        <p className="text-gray-500">No categories added yet...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
            >
              {/* Icon Emoji display */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-5 w-5"
                    />
                  </span>
                ) : (
                  <MdCategory className="text-purple-800" size={18} />
                )}
              </div>
              {/* Category Details */}
              <div className="flex-1 flex items-center justify-between">
                {/* Category name and type */}

                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {category.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 capitalize">
                    {category.type}
                  </p>
                </div>
                {/* Action buttons   */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditCategory(category)}
                    className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <FaEdit size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
