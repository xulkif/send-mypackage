import CitySearch from "./CitySerach"
 

 

const FilterComponent = ({  filters, setFilters, onApplyFilters,  isPopup = false,AdvancedfilterOption }) => {
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleClearFilters = () => {
        setFilters({});
    };

   /* const renderFilterInput = (filter) => {
        switch (filter.type) {
            case "CitySearch":
                return (
                    <CitySearch
                        onCitySelect={(cityData) => {
                            const filterKey = filter.name.toLowerCase().replace(/\s+/g, '');
                            handleFilterChange(filterKey, cityData.fullAddress);
                        }}
                    />
                );
            case "Drop Down":
                return (
                    <select
                        value={filters[filter.name.toLowerCase().replace(/\s+/g, '')] || ''}
                        onChange={(e) => handleFilterChange(filter.name.toLowerCase().replace(/\s+/g, ''), e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select {filter.name}</option>
                        {filter.option && filter.option.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                        {filter.options && filter.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case "Date":
                return (
                    <input
                        type="date"
                        value={filters[filter.name.toLowerCase().replace(/\s+/g, '')] || ''}
                        onChange={(e) => handleFilterChange(filter.name.toLowerCase().replace(/\s+/g, ''), e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        placeholder={`Enter ${filter.name}`}
                        value={filters[filter.name.toLowerCase().replace(/\s+/g, '')] || ''}
                        onChange={(e) => handleFilterChange(filter.name.toLowerCase().replace(/\s+/g, ''), e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );
        }
    };*/

    const displayFilters=(item)=>{
            const value=filters[item.name]||'';
             switch (item.type) {
              case "CitySearch":
                // Ensure CityAutocomplete takes full width
                return <div className="w-full"><CityAutocomplete 
                  inputValue={value}
                  CityFilter={(value)=>HandleFilter(value,item.name)}
               /> </div>
                
        
                case "select":
                  // Add a default option (as previously discussed) and full width
                  return (
                    <select 
                      className="text-sm font-extralight w-full p-2 border rounded-md" 
                      value={value} 
                      onChange={(e)=>HandleFilter(e.target.value,item.name)} 
                    >
                      <option value="">{item.label}</option> {/* Placeholder */}
                      {item?.options?.length > 0 && item.options.map(list=>(
                        <option key={list} value={list}>{list}</option>
                      ))}
                    </select>
                  )
        
                case "date":
                  // Make sure the input takes full width of its parent div
                  return (
                    <div className="w-full">
                      <input 
                        className="text-sm font-extralight w-full p-2 border rounded-md" 
                        type="date" 
                        value={value} 
                        onChange={(e)=>HandleFilter(e.target.value,item.name)}
                      />
                    </div> 
                  )
                default:
                  return null;
             }
          }

    // Use AdvancedFilterOption for travelers, filterOption for senders
    const currentFilters =AdvancedfilterOption ;

    if (isPopup) {
        return (
            <div className="space-y-4">
                {/* All filters in popup with larger layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentFilters.map((filter, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {filter.name}
                            </label>
                            {renderFilterInput(filter)}
                        </div>
                    ))}
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleClearFilters}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onApplyFilters}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        );
    }

    

    return (
        <div className="space-y-4">
          

            <div className="space-y-3">
                {currentFilters.map((filter, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {filter.name}
                        </label>
                        {renderFilterInput(filter)}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 pt-4">
                <button
                    onClick={onApplyFilters}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleClearFilters}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                    Clear All
                </button>
            </div>
    </div>
    );
}

export default FilterComponent