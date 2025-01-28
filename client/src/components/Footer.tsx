import { FacebookLogo, FooterLogo, InstagramLogo } from "@/images/FooterIcons";

export const Footer = () => {
  return (
    <div className="bg-[#18181B] relative">
      <div className="bg-[#EF4444] absolute top-[60px] py-7 px-[98px] flex gap-[34px] w-full">
        <h1 className="text-[#FAFAFA] text-3xl font-semibold">
          Fresh fast delivered
        </h1>
        <h1 className="text-[#FAFAFA] text-3xl font-semibold">
          Fresh fast delivered
        </h1>
        <h1 className="text-[#FAFAFA] text-3xl font-semibold">
          Fresh fast delivered
        </h1>
        <h1 className="text-[#FAFAFA] text-3xl font-semibold">
          Fresh fast delivered
        </h1>
      </div>
      <div className="px-[88px] pt-[228px] pb-[104px] flex gap-[220px]">
        <FooterLogo />
        <div className="flex gap-[122px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#71717A] text-base font-normal">NOMNOM</h1>
            <ul className="text-[#FAFAFA] text-base font-normal flex flex-col gap-4">
              <li>Home</li>
              <li>Contact us</li>
              <li>Delivery Zone</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[#71717A] text-base font-normal">MENU</h1>
            <ul className="text-[#FAFAFA] text-base font-normal flex flex-col gap-4">
              <li>Appetizers</li>
              <li>Salads</li>
              <li>Pizzas</li>
              <li>Main dishes</li>
              <li>Desserts</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[#18181B]">hhhhh</h1>
            <ul className="text-[#FAFAFA] text-base font-normal flex flex-col gap-4">
              <li>Side dish</li>
              <li>Brunch</li>
              <li>Beverages</li>
              <li>Fish & Sea foods</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[#71717A] text-base font-normal">FOLLOW US</h1>
            <div className="flex gap-4 py-[5px]">
              <FacebookLogo />
              <InstagramLogo />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[88px] py-8 flex flex-col gap-4">
        <div className="border-[1px] text-[#71717A]"></div>
        <div className="text-[#71717A] flex gap-12">
          <h1>Copy right 2024 © Nomnom LLC</h1>
          <h1>Privacy policy</h1>
          <h1>Terms and condition</h1>
          <h1>Cookie policy</h1>
        </div>
      </div>
    </div>
  );
};
