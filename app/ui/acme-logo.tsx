//import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Logo from "@/app/ui/icons/Logo";
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-center leading-none text-white`}
    >
      {/*<GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />*/}
      <Logo />
      <p className="text-[44px]">SellWise</p>
    </div>
  );
}