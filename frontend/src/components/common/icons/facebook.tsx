import FacebookIconSvg from "../../../../public/site/icons/facebook.svg";

const FacebookIcon = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => (
  <FacebookIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default FacebookIcon;
