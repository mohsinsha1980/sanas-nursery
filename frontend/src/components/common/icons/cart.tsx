import CartIconSvg from "../../../../public/site/icons/cart.svg";

const CartIcon = ({ width, height }: { width?: string; height?: string }) => (
  <CartIconSvg width={width ? width : 16} height={height ? height : 16} />
);

export default CartIcon;
