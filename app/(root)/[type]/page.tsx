import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.action";
import { getFileTypesParams } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import { Models } from "node-appwrite";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = (await params)?.type as string;
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = (await searchParams)?.sort as string;

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="p-4 h-screen bg-amber-100">
      <section className="w-full">
        <h1 className="text-3xl capitalize">{type}</h1>

        <div className="flex justify-between items-center">
          <p className="">
            Total: <span className="text-xl">o MB</span>
          </p>

          <div className="">
            <p className="hidden sm:block text-light-200">
              Sort By
              <Sort />
            </p>
          </div>
        </div>
      </section>
      {/* render files */}
      {files.total > 0 ? (
        <section className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p>no files uploaded</p>
      )}
    </div>
  );
};

export default Page;
