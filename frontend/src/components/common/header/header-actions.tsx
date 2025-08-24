import { SearchIcon, UserIcon } from "lucide-react";

export default function HeaderActions() {
  return (
    <ul className="header-actions">
      <li>
        <button className="cursor-pointer">
          <SearchIcon />
        </button>
      </li>
      <li>
        <button className="cursor-pointer">
          <UserIcon />
        </button>
      </li>
    </ul>
  );
}
