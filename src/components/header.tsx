import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className="flex bg-black justify-between py-4 px-6 lg:px-20">
      <img src="/logo.svg" alt="logo " />
      <ConnectButton />
    </div>
  );
}
