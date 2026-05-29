export const Settings = ({ user }) => (
    <div className="max-w-3xl space-y-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Profile Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3"><label className="text-[10px] font-black uppercase text-black/50">Full Name</label><input type="text" defaultValue={user.fullName} className="w-full rounded-2xl border px-6 py-5 bg-black/5" /></div>
            <div className="space-y-3"><label className="text-[10px] font-black uppercase text-black/50">Phone</label><input type="tel" className="w-full rounded-2xl border px-6 py-5 bg-black/5" /></div>
        </div>
        <button className="bg-[#c9a227] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase">Save Changes</button>
    </div>
);