import UserIconSvg from "../../../../public/site/icons/user.svg";

const UserIcon = ({ width, height }: { width?: string; height?: string }) => (
  <UserIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default UserIcon;
