import { Bookmark } from 'lucide-react';
export const SavedTab = ({ navigate }) => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <Bookmark size={48} className="text-[#c9a227]/30 mb-8" />
        <h3 className="text-2xl font-black">No Collections Yet</h3>
        <button onClick={() => navigate('/')} className="mt-10 bg-[#c9a227] text-white px-10 py-5 rounded-2xl text-xs font-black">Browse</button>
    </div>
);