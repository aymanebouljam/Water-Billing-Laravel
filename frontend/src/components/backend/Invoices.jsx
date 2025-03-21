import { useEffect, useState } from "react";
import { URL } from '../common/URL';
import axios from "axios";
import { PrinterIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


function Invoices() {
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    contract: '',
    reference: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const token = String(localStorage.getItem('token'));
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Fetch Invoices
  const getInvoices = async () => {
  
    try {
      const res = await axios.get(`${URL}invoices`);
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
    getInvoices();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.id.toString().includes(searchTerm) ||
    (item.reference && item.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.total.toString().includes(searchTerm)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete an Invoice
  useEffect(() => {
    const deleteInvoice = async () => {
      if (!deleteId) return;
      try {
        const res = await axios.delete(`${URL}invoices/${deleteId}`);
        if (res.data.error) {
          throw new Error(res.data.error);
        } else {
          alert(res.data.message);
          navigate('/refresher/invoices');
        }
      } catch (err) {
        console.error(err);
        alert(err);
      }
    };
    deleteInvoice();
  }, [deleteId, navigate]);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      id: '',
      contract: '',
      reference: ''
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (true) {
      case formData.id === '':
        alert('ID obligatoire');
        break;
      case formData.contract !== '' && (isNaN(Number(formData.contract)) || !Number.isInteger(Number(formData.contract))):
        alert('Num de police doit être un nombre');
        break;
      case !formData.reference.match(/^[a-zA-Z0-9]+$/):
        alert('Référence doit être alphanumérique');
        break;
      default:
        try {
          const res = await axios.put(`${URL}invoices/${formData.id}/update`, formData);
          if (res.data.error) {
            throw new Error(res.data.error);
          } else {
            alert('Facture modifiée avec succès');
            resetForm();
            navigate('/refresher/invoices');
          }
        } catch (err) {
          console.error(err);
        }
    }
  };

  return (
    <div className="flex flex-col w-full items-center container">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-1/2 pt-5">
        <div className="flex items-center border-b border-primaryBlue py-2">
          <input 
            className="appearance-none bg-transparent border-none w-1/2 text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="ID" 
            aria-label="id" 
            name="id" 
            id="id" 
            value={formData.id} 
            onChange={handleChange}
          />
          <input 
            className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="number" 
            placeholder="N° Police" 
            aria-label="contract" 
            name="contract" 
            id="contract" 
            value={formData.contract} 
            onChange={handleChange}
          />
          <input 
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
            type="text" 
            placeholder="Référence" 
            aria-label="reference" 
            name="reference" 
            id="reference" 
            value={formData.reference} 
            onChange={handleChange}
          />
          <button 
            className="w-1/6 flex-shrink-0 bg-primaryBlue hover:bg-sky-700 hover:text-white border-primaryBlue hover:border-sky-700 text-sm border-4 text-dark py-1 px-2 rounded" 
            type="submit"
          >
            Modifier
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
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Référence</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Objet</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Total</th>
                    <th className="p-3 text-white bg-primaryBlue border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50/35">
                        <td className="p-3 border-b text-center">{row.id}</td>
                        <td className="p-3 border-b text-center">{row.reference || 'N/A'}</td>
                        <td className="p-3 border-b text-center">{row.type || 'Déplacement de la niche'}</td>
                        <td className="p-3 border-b text-center">{row.total.toFixed(2) || 'N/A'}</td>
                        <td className="p-3 border-b">
                          <div className="flex justify-center">
                            <button 
                              type="button" 
                              className="p-2 text-blue-700 hover:text-blue-900 mx-1 hover:scale-110 transition-transform"
                              onClick={() => navigate(`/export/${row.id}`)}
                            >
                              <PrinterIcon className="w-5 h-5" />
                            </button>
                            <button 
                              type="button" 
                              className="p-2 text-red-600 hover:text-red-800 mx-1 hover:scale-110 transition-transform"
                              onClick={() => {
                                if (confirm('Veuillez confirmer la suppression')) {
                                  setDeleteId(row.id);
                                }
                              }}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-3 text-center text-gray-500">
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
                  </button>
                </nav>
              </div>
            )}
        
      </div>
    </div>
  );
}

export default Invoices;