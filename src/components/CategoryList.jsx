// src/components/CategoryList.jsx
"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
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
   <div className="absolute top-0 left-0 w-full min-h-dvh flex flex-col justify-center items-start pt-13 p-5 bg-gray-200">
      <div className="w-full flex-1 flex flex-col gap-3">

         <Combobox 
            items={categories}
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val)}
         >
            <ComboboxInput
               className="focus-within:ring-0!"
               placeholder="Select Category" />
            <ComboboxContent >
               <ComboboxEmpty>No items found.</ComboboxEmpty>
               <ComboboxList className='bg-white text-black'>
                  {(item) => (
                     <ComboboxItem key={item} value={item}>
                     {item}
                     </ComboboxItem>
                  )}
               </ComboboxList>
            </ComboboxContent>
         </Combobox>

         {
            loading ? (
               <p>Searching database...</p>
            ) : words.length === 0 ? (
               <p>No words found under "{selectedCategory}".</p>
            ) : (
               <div className="flex-1 flex flex-col overflow-y-auto divide-y divide-gray-400">
                  {words.map((item) => (
                     <div key={item.id} className="flex-1 p-3 flex justify-between items-center">
                        <div className="w-full flex justify-between items-center">
                           <p className="text-sm font-bold text-gray-800">{item.word}</p>
                           <p className="text-sm text-gray-600">{item.role}</p>
                           <p className="text-sm text-gray-600">{item.BrE}</p>
                           <p className="text-sm text-gray-600">{item.AmE}</p>
                        </div>
                     </div>
                  ))}
               </div>
            )
         }
      </div>
   </div>
   );
}