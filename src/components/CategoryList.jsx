"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { useState, useEffect } from "react";
import { getWordsByLevelAndCategory, getAllCategoriesByLevel } from "@/lib/db";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export default function CategoryList() {
   const [categories, setCategories] = useState([]);
   const [selectedLevel, setSelectedLevel] = useState("A1");
   const [selectedCategory, setSelectedCategory] = useState("");
   const [words, setWords] = useState([]);
   const [loading, setLoading] = useState(true);

   const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

   useEffect(() => {
      const loadCategories = async () => {
         try {

            const categoryList = await getAllCategoriesByLevel(selectedLevel);
            setCategories(categoryList);

            if (categoryList.length > 0) {
               setSelectedCategory(categoryList[0]);

            } else {
               setSelectedCategory("");
            }

         } catch (error) {
            console.error(error);
         }
      };

      loadCategories();
   }, [selectedLevel]);





useEffect(() => {

   if (!selectedLevel || !selectedCategory) {
      setWords([]);
      return;
   }

   const loadWords = async () => {
      setLoading(true);

      try {

         const data =
            await getWordsByLevelAndCategory(
               selectedLevel,
               selectedCategory
            );

         setWords(data);

      } catch (error) {
         console.error(error);

      } finally {
         setLoading(false);
      }
   };

   loadWords();

}, [selectedLevel, selectedCategory]);


return (
   <div className="absolute top-0 left-0 w-full min-h-dvh flex flex-col justify-center items-start pt-13 p-5 bg-gray-200">
      <div className="w-full flex-1 flex flex-col gap-3">

         <div className="w-full flex gap-3">
            <Combobox
               items={allLevels}
               value={selectedLevel}
               onValueChange={(val) => setSelectedLevel(val)}
               >
               <ComboboxInput
                  className="W-1/3 focus-within:ring-0!"
                  placeholder="Select Level" />
               <ComboboxContent >
                  <ComboboxEmpty>No levels found.</ComboboxEmpty>
                  <ComboboxList className='bg-white text-black'>
                     {(item) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                     )}
                  </ComboboxList>
               </ComboboxContent>
            </Combobox>



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
         </div>


         {
            loading ? (
               <p>Searching database...</p>
            ) : words.length === 0 ? (
               <p>No words found under "{selectedCategory}".</p>
            ) : (
               <div className="flex-1 flex flex-col overflow-y-auto divide-y divide-gray-400">
                  {words.map((item, index) => (
                     <div key={index} className="flex-1 p-3 flex justify-between items-center">
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