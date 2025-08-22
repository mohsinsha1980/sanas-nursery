import SearchIconSvg from "../../../../public/site/icons/search.svg";

const SearchIcon = ({ width, height }: { width?: string; height?: string }) => (
  <SearchIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default SearchIcon;
