import { useEffect, useState, useContext } from "react";
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

        <CategoryList categories={categoryData} loading={loading} />
        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          title="Add Category"
          onClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm />
        </Modal>
        {/* Update category modal */}
      </div>
    </Dashboard>
  );
};
export default Category;
