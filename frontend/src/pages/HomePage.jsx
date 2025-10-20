import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Users, TrendingUp, Calendar, Star, User2Icon, UserCheck, Filter, X } from 'lucide-react';
import TravelersList from './TravelersList';
import SenderList from './SenderList';
import BasicFilterOptions from './FilterOptions';
import AdvancedFilterOptions from './advancedFilte';
import { useDispatch, useSelector } from 'react-redux';
import { senders, travelersData } from '../config/sampleData';
import { DemoData } from '../store/telegramFile/initData';
 
// Removed: FilterComponent, FilterOptions, stringify

const FilterType=[
  {
    name:"initialLocation",
    type:"CitySearch",
    label:"From"
    
  },{
    name:"destination",
    type:"CitySearch",
    label:"To"
  },
  {
    name:"date",
    type:"date",
    label:"Date"
  },
  {
    name:"weight",
    type:"select",
    // Added 'any' for consistency with BaseFiltes and BasicOptions
    options: ["any", "1-5", "5-10", "10-15", "15-20", "20-25", "25-30"], 
    label:"Weight"
  },
  {
    name:"amount",
    type:"select",
    // FIX: Corrected 'option' to 'options'
    options: ["any", "500", "500-1000", "1000-1500", "1500-2000", "2000-3000", "3000-5000","5000-1000",">1000"], 
    label:"Amount"
  },
  {
    name: "age",
    type: "select",
    options: ["any", "15-30", "30-45", "45+"], // Added 'any'
    label:"Age"
  },
  {
    name: "status",
    type: "select",
    options: ["any", "Urgent", "Normal", "Flexible"], // Added 'any'
    label:"Status"
},
{
    name: "gender",
    type: "select",
    options: ["any", "Male", "Female" ], // Added 'any'
    label:"Gender"
},
]

const BasicOptions=[
  {
    name:"initialLocation",
    type:"CitySearch",
    label:"From"
    
  },{
    name:"destination",
    type:"CitySearch",
    label:"To"
  },
  {
    name:"date",
    type:"date",
    label:"Date"
  },
  {
    name:"weight",
    type:"select",
    options: ["any", "1-5", "5-10", "10-15", "15-20", "20-25", "25-30"], 
    label:"Weight"
  },
]

const BaseFiltes={
  initialLocation:'',
  destination:'',
  date:   '',
  weight: "any",
  amount:"any",
  gender:'any',
  age:'any',
  status:'any',
  search: '' // Added search to initial state for the input
}

// The right logic for discrete range filtering.
const isWithinRange = (itemValue, filterRange) => {
    if (!filterRange || filterRange.toLowerCase() === 'any') return true;
  
    const filter = filterRange.toLowerCase();
    
    // Clean the item's data value (e.g., "10-15" -> "10-15", or 28 -> "28")
    const itemValueStr = itemValue ? itemValue.toString().replace(/[^0-9-.]/g, '') : '';
    
    // --- Step 1: Handle Item Value as a Range (e.g., item.weight: "10-15") ---
    if (itemValueStr.includes('-')) {
      const [dataMinStr, dataMaxStr] = itemValueStr.split('-');
      const dataMin = parseFloat(dataMinStr);
      const dataMax = parseFloat(dataMaxStr || dataMinStr); 
  
      if (isNaN(dataMin) || isNaN(dataMax)) return false; 
  
      if (filter.includes('-')) {
        // Filter is a range (e.g., "5-10"). Interpretation: [min, max)
        const [minStr, maxStr] = filter.split('-');
        const filterMin = parseFloat(minStr);
        const filterMax = parseFloat(maxStr);
        
        if (isNaN(filterMin) || isNaN(filterMax)) return false;
  
        // **CORE FIX:** Check for overlap where data's max is strictly greater than filter's min
        // AND data's min is strictly less than filter's max. This ensures:
        // If filter is [5, 10) and data is [10, 15], dataMin (10) is NOT < filterMax (10), so it fails.
        return dataMin < filterMax && dataMax > filterMin;
        
      } else if (filter.includes('+')) {
        // Filter is "45+"
        const min = parseFloat(filter.replace('+', ''));
        return dataMax >= min;
      } else if (filter.startsWith('>')) {
        // Filter is ">1000"
        const min = parseFloat(filter.substring(1));
        return dataMax > min;
      } else {
        // Filter is a single number (e.g., "500")
        const target = parseFloat(filter);
        return dataMin <= target && dataMax >= target;
      }
  
    } 
    // --- Step 2: Handle Item Value as a Single Number (e.g., item.age: 28) ---
    else {
      const numberValue = parseFloat(itemValueStr);
      if (isNaN(numberValue)) return false;
  
      if (filter.includes('-')) {
        // Filter is a range (e.g., "5-10"). Interpretation: [min, max)
        const [minStr, maxStr] = filter.split('-');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        
        // **CORE FIX:** Check for: Value >= min AND Value < max.
        // E.g., for "5-10", it matches 5, 6, 7, 8, 9, but NOT 10.
        return numberValue >= min && numberValue < max;
  
      } else if (filter.includes('+')) {
        // Filter is "45+"
        const min = parseFloat(filter.replace('+', ''));
        return numberValue >= min;
      
      } else if (filter.startsWith('>')) {
        // Filter is ">1000"
        const min = parseFloat(filter.substring(1));
        return numberValue > min;
      
      } else {
        // Filter is an exact match for a single number (e.g., "500")
        const target = parseFloat(filter);
        return numberValue === target;
      }
    }
  };


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("traveler");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const {userList} = useSelector(state => state.user);
  const [filters, setFilters] = useState(BaseFiltes);
  // FIX: filterdData is now state that syncs with userList, and then gets filtered
  const [filterdData, setFilterdDate] = useState(userList);
  
  const dispatch = useDispatch();

  // FIX: Load the correct data into Redux on tab change
  useEffect(() => {
    let data = activeTab === "traveler" ? travelersData : senders;
    dispatch(DemoData(data));
  }, [activeTab, dispatch]);
 
  // Update filtered data when userList from Redux changes (e.g., when switching tabs)
  useEffect(() => {
    // Re-run the filter logic whenever the source data (userList) changes
    HandleFilter(filters);
  }, [userList]);

  

  // FIX: HandleFilter now receives the NEW filters object from the child component
  const HandleFilter = (newFilters) => {
     
     
     const dataToFilter = userList; // Always filter from the original, full list
     let filtered = dataToFilter.filter(item => {
       // 1. **Text Search Filter**
       if (newFilters.search) {
         const searchLower = newFilters.search.toLowerCase();
         const textMatch = (
           item.name?.toLowerCase().includes(searchLower) ||
           item.description?.toLowerCase().includes(searchLower) ||
           item.initialLocation?.toLowerCase().includes(searchLower) ||
           item.destination?.toLowerCase().includes(searchLower)
         );
         if (!textMatch) return false;
       }
       
       // 2. **Location Filters (initialLocation, destination)**
       if (newFilters.initialLocation && newFilters.initialLocation.toLowerCase() !== 'any') {
         if (!item.initialLocation?.toLowerCase().includes(newFilters.initialLocation.toLowerCase())) return false;
       }

       if (newFilters.destination && newFilters.destination.toLowerCase() !== 'any') {
         if (!item.destination?.toLowerCase().includes(newFilters.destination.toLowerCase())) return false;
       }

       // 3. **Date Filter** (Travelers use 'travelDate' and 'returnDate', Senders use 'deliveryDate' - we'll check against a primary one for simplicity or an overlap)
       if (newFilters.date) {
         const filterDate = newFilters.date;
         // Check traveler data: if the filter date is between travelDate and returnDate (inclusive)
         // Assuming the data key is 'travelDate' for travelers and 'deliveryDate' for senders
         const itemDate = item.travelDate || item.deliveryDate;
         const itemReturnDate = item.returnDate; // Only for travelers
         
         let dateMatch = false;

         if (itemDate && itemReturnDate) { // Traveler with a date range
           dateMatch = (filterDate >= itemDate && filterDate <= itemReturnDate);
         } else if (itemDate) { // Senders or travelers with just a single date
           dateMatch = (filterDate === itemDate);
         }

         if (!dateMatch) return false;
       }

       // 4. **Range Filters (Weight, Amount, Age)** - Using the helper function
       if (newFilters.weight && newFilters.weight.toLowerCase() !== 'any') {
         if (!isWithinRange(item.weight, newFilters.weight)) return false;
       }

       if (newFilters.amount && newFilters.amount.toLowerCase() !== 'any') {
         if (!isWithinRange(item.amount, newFilters.amount)) return false;
       }
       
       if (newFilters.age && newFilters.age.toLowerCase() !== 'any') {
         if (!isWithinRange(item.age, newFilters.age)) return false;
       }

       // 5. **Select/Gender/Status Filters**
       if (newFilters.gender && newFilters.gender.toLowerCase() !== 'any') {
         if (item.gender?.toLowerCase() !== newFilters.gender.toLowerCase()) return false;
       }
       // Note: The 'status' field doesn't appear in the sample traveler object, 
       // but we include the logic for completeness if it's in the sender data.
       if (newFilters.status && newFilters.status.toLowerCase() !== 'any') {
         if (item.status?.toLowerCase() !== newFilters.status.toLowerCase()) return false;
       }

       return true;
     });

     // Update the state with the new filtered list
     setFilterdDate(filtered);

     // Close the popup if it was opened
     if (showFilterPopup) {
       setShowFilterPopup(false);
     }
   };
console.log(filterdData,"filtered Data")
  // A helper function to handle the search input change (it updates the filters state)
  const handleSearchChange = (e) => {
    const newSearchValue = e.target.value;
    setFilters(prev => {
      const next = { ...prev, search: newSearchValue };
      // Run filter immediately on search change
      HandleFilter(next);
      return next;
    });
  };
  
  return (
    <div className='flex flex-col h-screen overflow-hidden px-2 border-2 border-gray-100'>

      {/* HEADER SECTION */}
      <div className='bg-white shadow-sm border-2 border-gray-100'>
        <header className='w-full flex items-center justify-center p-2'>
          <div className='flex items-center gap-2'>
            <div>
              {/* <img src="/src/assets/a3586fdc963fd247ed8a80d43394ce2a866ab94c444eb50a8b60e5ed63d2834b.jpg" alt="" className='w-10 h-10 rounded-full' /> */}
            </div>
            <h1 className='text-2xl font-bold'>My Package Delivery </h1>
          </div>
        </header>

        {/* Tab Buttons */}
        <div className='p-2 flex-1 w-full'>
          <div className='flex justify-center items-center gap-3'>
            <button
              onClick={() => setActiveTab("traveler")}
              className={`px-3 py-2 rounded-md border-0 flex gap-2 ${activeTab === 'traveler' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <span className='w-4 h-4'><User2Icon /></span> Traveler
            </button>
            <button
              onClick={() => setActiveTab("sender")}
              className={`px-3 py-2 rounded-md border-0 flex gap-2 ${activeTab === 'sender' ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <span className='w-4 h-4'><User2Icon /></span> Sender
            </button>
          </div>
        </div>

        {/* Search Input - Always Visible */}
        <div className='mb-3 w-[80%] mx-auto'>
          <input 
            placeholder="Search by location, name, or description..." 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={filters.search}
            onChange={handleSearchChange} // Use the new handler
          />
        </div>
        
        <div className='w-full flex gap-2 px-2 items-center '>
          <div className='flex-1'>
            {/* Pass HandleFilter to apply filters on change */}
            <BasicFilterOptions 
              BasicOptions={BasicOptions} 
              filters={filters} 
              setFilters={setFilters} 
              onHandleFilter={HandleFilter} 
            />
          </div>
          
          <div className='flex justify-end items-center pr-2 '>
            <button
              onClick={() => setShowFilterPopup(true)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-2'>
          {/* List Content: Pass filterdData and filters as props */}
          {
            activeTab === "traveler" 
              ? <TravelersList dataList={filterdData}   /> 
              : <SenderList dataList={filterdData}   />
          }
        </div>
      </div>
      
      {/* FOOTER - Omitted for brevity, assumed correct */}
    <footer className="bg-white border-t border-gray-200">

        <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-3 sm:px-4 py-2">

          <div className="flex justify-around">

            <button

              onClick={() => setActiveTab('home')}

              className={`flex flex-col items-center py-2 px-2 sm:px-3 rounded-lg transition-colors ${

                activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'

              }`}

            >

              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />

              <span className="text-xs mt-1">Register as Traveler</span>

            </button>


            <button

              onClick={() => setActiveTab('home')}

              className={`flex flex-col items-center py-2 px-2 sm:px-3 rounded-lg transition-colors ${

                activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'

              }`}

            >

              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />

              <span className="text-xs mt-1">Register as sender</span>

            </button>

           

            <button

              onClick={() => setActiveTab('statistics')}

              className={`flex flex-col items-center py-2 px-2 sm:px-3 rounded-lg transition-colors ${

                activeTab === 'statistics' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'

              }`}

            >

              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />

              <span className="text-xs mt-1">Statistics</span>

            </button>

          </div>

        </div>

      </footer> 

      {/* Filter Popup */}
      {showFilterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <button
                onClick={() => setShowFilterPopup(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <AdvancedFilterOptions 
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={HandleFilter} // HandleFilter receives the new state object
              AdvancedOptions={FilterType}
              onCancel={()=>setShowFilterPopup(false)}        
              isPopup={showFilterPopup}  
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;