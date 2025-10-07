
function PaginationLoader() {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-brand-secondary rounded-b-sm w-full">
      <div className="font-medium h-full text-primary-bg flex items-center gap-1 ">
        <div> Page </div>
        <div className="bg-primary-bg animate-pulse   rounded-2xl h-4 w-14 "></div>
      </div>

       <div className="bg-primary-bg animate-pulse   rounded-2xl h-4 w-20 "></div>
    </div>
  );
}
export default PaginationLoader;