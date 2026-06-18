import CategoryList from "@/components/CategoryList";

export default function Source() {
  return (
    <main className="min-h-screen bg-gray-50 text-black p-8">


      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-indigo-900">My Vocabulary App</h1>
        
        <CategoryList />
      </div>
    </main>
  );
}