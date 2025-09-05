import { SearchIcon, UserIcon } from "lucide-react";

export default function HeaderActions() {
  return (
    <ul className="header-actions ">
      <li>
        <button className="cursor-pointer text-black">
          <SearchIcon />
        </button>
      </li>
      <li>
        <button className="cursor-pointer text-black">
          <UserIcon />
        </button>
      </li>
    </ul>
  );
}
