import BharathaIconSvg from "../../../../public/site/images/bharathatechno-it-pvt-ltd.svg";

const BharathaIcon = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) => (
  <BharathaIconSvg width={width ? width : 24} height={height ? height : 24} />
);

export default BharathaIcon;
