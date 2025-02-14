import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./navbar";
import CartButton from "./CartButton";

function Header() {
  return (
    <header className=" py-4 md:py-6 ">
      <div className="container flex-between">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          🍕 Pizza
        </Link>

        <div className="flex items-center gap-2 ">
          <Navbar />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
