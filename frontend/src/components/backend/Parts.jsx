import { useEffect, useState } from "react";
import { URL } from '../common/URL';
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function Parts() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    label: '',
    price: ''
  });
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  // Fetch Parts
  const getParts = async () => {
   
    try {
      const res = await axios.get(`${URL}parts`);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        setData(res.data.data);
       
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  useEffect(() => {
    getParts();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.price.toString().includes(searchTerm)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get input
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Create Part
  const createPart = async () => {
    try {
      const res = await axios.post(`${URL}parts`, formData);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        alert('Pièce ajoutée avec succès');
        navigate('/refresher/parts');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Single Part
  const fetchSinglePart = async (e) => {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    try {
      const res = await axios.get(`${URL}parts/${id}`);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        const part = res.data.data;
        setFormData({ id: part.id, label: part.label, price: part.price });
        setIsEdited(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Part
  const editPart = async () => {
    try {
      const res = await axios.put(`${URL}parts/${formData.id}/update`, formData);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        alert('Pièce modifiée avec succès');
        navigate('/refresher/parts');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      switch (true) {
        case formData.label === '':
          alert('La désignation est obligatoire');
          break;
        case formData.price === '':
          alert('Le prix est obligatoire');
          break;
        case isNaN(Number(formData.price)):
          alert('Le prix doit être numérique');
          break;
        default:
          isEdited ? editPart() : createPart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a Part
  const handleDelete = async (e) => {
    if (confirm('Veuillez confirmer la suppression!')) {
      const id = e.currentTarget.dataset.id;
      if (!id) return;
      try {
        const res = await axios.delete(`${URL}parts/${id}`);
        if (res.data.error) {
          throw new Error(res.data.error);
        } else {
          navigate('/refresher/parts');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Reset Form
  const resetForm = () => {
    try {
      setFormData({
        label: '',
        price: ''
      });
      setIsEdited(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full items-center container">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-1/2 pt-5">
        <div className="flex items-center border-b border-primaryBlue py-2">
          <input 
            className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="Désignation" 
            aria-label="label" 
            name="label" 
            id="label" 
            value={formData.label} 
            onChange={handleChange}
          />
          <input 
            className="appearance-none bg-transparent border-none w-1/2 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="number" 
            step="any" 
            min={0} 
            placeholder="Prix" 
            aria-label="price" 
            name="price" 
            id="price" 
            value={formData.price} 
            onChange={handleChange}
          />
          <button 
            className="w-1/6 flex-shrink-0 bg-primaryBlue hover:bg-sky-700 hover:text-white border-primaryBlue hover:border-sky-700 text-sm border-4 text-dark py-1 px-2 rounded" 
            type="submit"
          >
            {isEdited ? 'Modifier' : 'Créer'}
          </button>
          <button 
            className="flex-shrink-0 border-transparent border-4 text-primaryBlue hover:text-sky-800 text-sm py-1 px-2 rounded" 
            type="reset" 
            onClick={resetForm}
          >
            Annuler
          </button>
        </div>
      </form>

      {/* Table Section */}
      <div className="px-5 py-12 w-full">
            {/* Search Box */}
            <div className="mb-4 flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {filteredData.length > 0 ? 
                  `Affichage de ${indexOfFirstItem + 1} à ${Math.min(indexOfLastItem, filteredData.length)} sur ${filteredData.length} éléments` :
                  "Aucun élément trouvé"
                }
              </div>
            </div>

            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white/5">
                <thead>
                  <tr>
                    <th className="p-3 text-white bg-primaryBlue border-b text-left">ID</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Désignation</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Prix Unitaire</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50/35">
                        <td className="p-3 border-b text-center">{row.id}</td>
                        <td className="p-3 border-b text-center">{row.label}</td>
                        <td className="p-3 border-b text-center">{row.price}</td>
                        <td className="p-3 border-b">
                          <div className="flex justify-center">
                            <button 
                              type="button" 
                              className="p-2 text-blue-600 hover:text-blue-800 mx-1 hover:scale-110 transition-transform" 
                              data-id={row.id} 
                              onClick={fetchSinglePart}
                            >
                              <PencilSquareIcon className="w-5 h-5" />
                            </button>
                            <button 
                              type="button" 
                              className="p-2 text-red-600 hover:text-red-800 mx-1 hover:scale-110 transition-transform" 
                              data-id={row.id} 
                              onClick={handleDelete}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center text-gray-500">
                        Aucun élément trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <nav className="flex items-center">
                  <button 
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-blue-700 hover:bg-blue-100'}`}
                  >
                    &lt;
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-primaryBlue text-white' : 'text-blue-700 hover:bg-blue-100'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-700 hover:bg-blue-100'}`}
                  >
                    &gt;
                  </button>
                </nav>
              </div>
            )}
      </div>
    </div>
  );
}

export default Parts;