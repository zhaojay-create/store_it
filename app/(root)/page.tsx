import ActionDropdown from "@/components/ActionDropdown";
import Chart from "@/components/Chart";
import FromattedDateTime from "@/components/FromattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Models } from "node-appwrite";

const DashBoard = async () => {
  const [files, totoalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totoalSpace);

  return (
    <div className="p-2 h-full grid grid-cols-2 grid-rows-2 gap-4">
      {/* 第一个 div 占第一行的一半 */}
      <div className="row-start-1 row-end-2 col-span-1 rounded-xl">
        <Chart used={totoalSpace.used} total={totoalSpace.all} />
      </div>
      {/* 第二个 div 占第二列，横跨第一行和第二行 */}
      <div className="row-start-1 row-end-3 col-start-2 col-end-3 bg-brand-200 rounded-xl bg-white p-6">
        <p className="text-xl font-semibold">Recent files uploaded</p>
        <ul>
          {files.documents.map((file: Models.Document) => (
            <li
              key={file.$id}
              className="grid grid-cols-[24px_1fr_24px] grid-rows-2 p-2 gap-x-1"
            >
              {/* 1 占满第一列 */}
              {/* <p className="col-start-1 col-end-2 row-span-2">1</p> */}
              <Thumbnail
                className="col-start-1 col-end-2 row-span-2"
                type={file.type}
                extension={file.extension}
                url={file.url}
              />
              {/* 2 占满第二列的第一行 */}
              <p className="line-clamp-1 col-start-2 col-end-3 row-start-1 row-end-2">
                {file.name}
              </p>
              {/* 3 占满第二列的第二行 */}
              <FromattedDateTime
                date={file.$createdAt}
                className="col-start-2 col-end-3 row-start-2 row-end-3 text-sm text-light-100"
              />
              {/* 4 占满第三列 */}
              <ActionDropdown
                file={file}
                className="col-start-3 col-end-4 row-span-2"
              />
            </li>
          ))}
        </ul>
      </div>
      {/* 第三个 div 占第二行的一半 */}
      <div className="row-start-2 row-end-3 col-span-1 bg-brand-300 rounded-xl flex flex-wrap gap-2">
        {usageSummary.map((item) => (
          <div
            key={item.type}
            className="flex flex-col basis-[calc(50%-8px)] rounded-xl bg-white justify-center items-center gap-4"
          >
            <p className="text-right">{convertFileSize(item.size)}</p>
            <p className="text-center text-xl font-semibold">{item.type}</p>
            {/* <Separator className="h-0.5 bg-light-200" /> */}
            <FromattedDateTime
              date={item.latestDate}
              className="text-center text-sm text-light-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
