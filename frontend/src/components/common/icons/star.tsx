import StarIconSvg from "../../../../public/site/icons/star.svg";

const StarIcon = ({
  width,
  height,
  fill,
}: {
  width?: string;
  height?: string;
  fill?: string;
}) => (
  <StarIconSvg
    width={width ? width : 16}
    height={height ? height : 16}
    fill={fill ? fill : "#000000"}
  />
);

export default StarIcon;
