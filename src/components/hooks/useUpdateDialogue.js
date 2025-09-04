// hooks/useUpdateDialog.js
import { useEffect, useState } from 'react';
import { versionData } from '@/app/lib/version';

const LOCAL_STORAGE_KEY = 'appVersion';

export const useUpdateDialog = () => {
const [showDialog, setShowDialog] = useState(false);
const { version, updates } = versionData;

useEffect(() => {
   const storedVersion = localStorage.getItem(LOCAL_STORAGE_KEY);
   
   if (storedVersion !== version) {
      setShowDialog(true);
   }
}, [version]);

const closeDialog = () =>{
   setShowDialog(false);
   localStorage.setItem(LOCAL_STORAGE_KEY, version);
}

return { showDialog, updates, closeDialog };
};