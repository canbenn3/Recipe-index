import { useScreenSize } from "../Context/ScreenSizeContext";
import { Navbar } from "./Navbar";

export function Header() {
  const sz = useScreenSize();

  return (
    <div className="header">
      <h1>Recipe Index</h1>
      {sz.isMobile ? (
        <div className="footer">
          <Navbar />
        </div>
      ) : (
        <Navbar />
      )}
    </div>
  );
}
