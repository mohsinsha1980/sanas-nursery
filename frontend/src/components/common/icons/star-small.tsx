import StarIconSvg from "../../../../public/site/icons/star-small.svg";

const SmallStarIcon = ({
  width,
  height,
  fill,
}: {
  width?: string;
  height?: string;
  fill?: string;
}) => (
  <StarIconSvg
    width={width ? width : 10}
    height={height ? height : 10}
    fill={fill ? fill : "#000000"}
  />
);

export default SmallStarIcon;
