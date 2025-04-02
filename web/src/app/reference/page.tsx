import { getWorks } from "./actions";

export default async function ReferencePage() {
  const works = await getWorks();
  console.log(works);
  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold">References</p>
      </div>
      <div className="mt-3 border-t border-t-gray-700">
        <div className="flex w-full pr-10 justify-between align-middle">
          <div className="w-9/10 py-5 pl-10 left-0 border-b border-b-gray-700">
            Taco bell
          </div>
          <div className="py-5">X</div>
        </div>
        <div className="flex w-full pr-10 justify-between align-middle">
          <div className="w-9/10 py-5 pl-10 left-0 border-b border-b-gray-700">
            Taco bell
          </div>
          <div className="py-5">X</div>
        </div>
      </div>
    </>
  );
}
