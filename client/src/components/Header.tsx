import { CartIcon, HeaderLogo, UserIcon } from "@/images/HeaderIcons";

export const Header = () => {
  return (
    <div>
      <div className="py-3 px-[88px] bg-[#18181B] flex justify-between items-center">
        <div>
          <HeaderLogo />
        </div>
        <div className="flex">
          {/* <CartIcon /> */}
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
