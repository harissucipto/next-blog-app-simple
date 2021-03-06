import { FC } from "react";
import Header from "./Header";

const Wrapper: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Wrapper;
