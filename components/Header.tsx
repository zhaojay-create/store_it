import React, { FC } from "react";
import { Button } from "./ui/button";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header: FC = ({}) => {
  return (
    <header className="px-4 flex justify-between items-center">
      <Search />
      <div className="flex justify-around items-center gap-3">
        <FileUploader />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit">退出</Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
