// src/components/CategoryList.jsx
"use client";

import { useState, useEffect } from "react";
import { getWordsByCategory, getAllUniqueCategories } from "@/lib/db";

export default function CategoryList() {
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [words, setWords] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadCategories = async () => {
         try {
            const uniqueList = await getAllUniqueCategories();
            setCategories(uniqueList);
            
            if (uniqueList.length > 0) {
               setSelectedCategory(uniqueList[0]);
            }
         } catch (error) {
            console.error("Failed to load categories:", error);
         }
      };

      loadCategories();
   }, []);

   useEffect(() => {
      if (!selectedCategory) return; 

      const loadCategoryData = async () => {
         setLoading(true);
         try {
            const data = await getWordsByCategory(selectedCategory);
            setWords(data);
         } catch (error) {
            console.error("Failed to fetch words:", error);
         } finally {
            setLoading(false);
         }
      };

      loadCategoryData();
   }, [selectedCategory]);

return (
      <div className="absolute top-0 left-0 w-full min-h-dvh flex justify-center items-start pt-20 p-5 bg-gray-50">
         <div className="space-y-4 w-full max-w-2xl">
            {/* Dynamic Category Selection Dropdown */}
            <div className="flex items-center space-x-3">
               <label className="font-medium text-gray-700">Choose Category:</label>
               <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border rounded-lg bg-white text-black shadow-sm flex-1 max-w-xs"
                  disabled={categories.length === 0}
               >
                  {categories.length === 0 ? (
                     <option>Loading categories...</option>
                  ) : (
                     categories.map((catName) => (
                        <option key={catName} value={catName}>
                           {catName}
                        </option>
                     ))
                  )}
               </select>
            </div>

            {loading ? (
               <p className="text-gray-500 italic">Searching database...</p>
            ) : words.length === 0 ? (
               <p className="text-gray-500">No words found under "{selectedCategory}".</p>
            ) : (
               // FIXED CONTAINER: Added max-h-[70vh] and overflow-y-auto
               <div className="max-h-[80vh] overflow-y-auto bg-white border rounded-xl shadow-sm divide-y">
                  {words.map((item) => (
                     <div key={item.id} className="p-4 flex justify-between items-start">
                        <div className="w-full">
                           <h3 className="text-lg font-bold text-gray-900">{item.word}</h3>
                           <p className="text-sm text-gray-600 mb-2">{item.definition}</p>
                           
                           {item.examples.map((example, index) => (
                              <div key={index} className="flex flex-col mt-2 p-2 bg-gray-50 rounded">
                                 <div className="font-medium text-sm text-indigo-700">{example.collocation}</div>
                                 <div className="text-sm text-gray-700">{example.example}</div>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}