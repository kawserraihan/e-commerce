
import ViewSize from "../../../../components/Core/Core-Size/ViewSize";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Mart - Size",
  description:
    "MS- Mart - Size",
};

const SizePage = ({ params }: { params: { id: string } }) => {
  return <ViewSize params={params}/>;
};

export default SizePage;