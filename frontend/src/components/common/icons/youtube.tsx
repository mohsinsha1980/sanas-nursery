import YoutubeIconSvg from "../../../../public/site/icons/youtube.svg";

const YoutubeIcon = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => (
  <YoutubeIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default YoutubeIcon;
