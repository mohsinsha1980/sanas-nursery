import TwitterIconSvg from "../../../../public/site/icons/twitter.svg";

const TwitterIcon = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => (
  <TwitterIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default TwitterIcon;
