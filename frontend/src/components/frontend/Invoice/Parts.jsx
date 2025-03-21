import axios from "axios";
import { URL } from "../../common/URL";
import { useEffect, useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Export from "./Export";

function Parts({ invoice }) {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [exportID, setExportID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
  
    axios.get(`${URL}parts`)
      .then(res => {
        setData(res.data.data);
        
      })
      .catch(err => {
        console.error(err);
        
      });
  }, []);

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.id.toString().includes(searchTerm) ||
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

  // Handle Change for Quantity Input
  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    if (value > 0) {
      setQuantity((prevState) => {
        return [...prevState, { partId: id, quantity: value }];
      });
    } else {
      setQuantity((prevState) => {
        return prevState.filter(el => el.partId !== id);
      });
    }
  };

  // Handle Click for Validation
  const handleClick = async () => {
    if (quantity.length === 0) {
      alert('Veuillez désigner les quantités des pièces');
      return;
    }
    
    try {
      const filteredObject = quantity.reduce((acc, curr) => {
        acc[curr.partId] = curr;
        return acc;
      }, {});

      const filteredArray = Object.values(filteredObject);
      const formData = filteredArray.map(el => ({ invoiceId: invoice, ...el }));

      const res = await axios.post(`${URL}bills`, formData);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        const id = res.data.id;
        setExportID(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (exportID === null) {
    return (
      <div className="flex flex-col w-full items-center container">
        <div className="px-5 py-12 w-full relative">
              <button 
                type="button" 
                className="validate bg-white/50 absolute z-10 top-14 right-8 rounded-lg flex justify-center items-center gap-x-2 py-2 px-3 animate-bounce hover:scale-110 hover:animate-none" 
                onClick={handleClick}
              >
                <CheckBadgeIcon className="w-6 h-6" />
                Valider
              </button>
          <div className="my-12">
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
                      <th className="p-3 text-white bg-primaryBlue border-b text-center">Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50/35">
                          <td className="p-3 border-b text-center">{row.id}</td>
                          <td className="p-3 border-b text-center">{row.label}</td>
                          <td className="p-3 border-b text-center">{row.price}</td>
                          <td className="p-3 border-b text-center">
                            <input 
                              type="number" 
                              step="any" 
                              defaultValue={0} 
                              id={row.id} 
                              className="p-2 rounded-xl text-center text-black bg-transparent border-none leading-tight focus:outline-none" 
                              min={0} 
                              onChange={handleChange}
                            />
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
      </div>
    );
  } else if (exportID) {
    return <Export id={exportID} />;
  }
}

export default Parts;