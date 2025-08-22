import InstagramIconSvg from "../../../../public/site/icons/instagram.svg";

const InstagramIcon = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => (
  <InstagramIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default InstagramIcon;
