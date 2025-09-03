declare module "react-world-flags" {
  import { ComponentType, ImgHTMLAttributes } from "react";

  const Flag: ComponentType<ImgHTMLAttributes<HTMLImageElement> & { code: string }>;
  export default Flag;
}
