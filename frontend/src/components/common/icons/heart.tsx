import HeartIconSvg from "../../../../public/site/icons/heart.svg";

const HeartIcon = ({ width, height }: { width?: string; height?: string }) => (
  <HeartIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default HeartIcon;
