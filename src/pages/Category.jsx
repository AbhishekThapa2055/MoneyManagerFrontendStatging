import { useEffect, useState, useContext, use } from "react";
import CategoryList from "../components/CategoryList";
import Dashboard from "../components/dashboard";
import { FaPlus } from "react-icons/fa";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import Modal from "../components/modal";
import AddCategoryForm from "../components/AddCategoryForm";
const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("Add Category");
  const { user } = useContext(AppContext);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        console.log(user);
        setcategoryData(response.data);
      } else {
        console.log("No data present");
      }
    } catch (error) {
      console.error("Something went Wrong Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      console.log(response.status);

      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category", error);
      toast.error(error.response?.data?.message || "Failed to add category");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (category) => {
    const { id, name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_CATEGORY(id),
        {
          name,
          type,
          icon,
        },
      );
      console.log(response.status);

      if (response.status === 200) {
        toast.success("Category Updated successfully");
        setOpenEditCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error updating category", error);
      toast.error(error.response?.data?.message || "Failed to update category");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    console.log("Editing the category", category);
    setTitle("Edit Category");
    setOpenEditCategoryModal(true);
    setSelectedCategory(category);
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* add button to add category */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl"> All Categories </h2>
          <button
            onClick={() => {
              setOpenAddCategoryModal(true);
            }}
            className="add-btn flex items-center gap-1 rounded-2xl text-white bg-green-600 hover:bg-green-400 transition px-4 py-3"
          >
            {" "}
            <FaPlus size={15} className="text-white" />
            Add Category
          </button>
        </div>
        {/* category list (reusable) */}

        <CategoryList
          categories={categoryData}
          loading={loading}
          onEditCategory={handleEditCategory}
        />
        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          title="Add Category"
          onClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm
            onAddCategory={handleAddCategory}
            loading={loading}
          />
        </Modal>
        {/* Update category modal */}
        <Modal
          isOpen={openEditCategoryModal}
          title="Edit Category"
          onClose={() => setOpenEditCategoryModal(false)}
        >
          <AddCategoryForm
            onUpdateCategory={handleUpdateCategory}
            loading={loading}
            categorydata={selectedCategory}
            isEditMode={openEditCategoryModal}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};
export default Category;
