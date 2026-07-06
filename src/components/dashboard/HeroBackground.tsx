import Image from "next/image";

export default function HeroBackground() {
  return (
    <>
      <Image
        alt=""
        className="object-cover"
        fill
        sizes="100vw"
        src="/crew-platform-hero.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,26,31,0.96),rgba(24,26,31,0.42))]" />
    </>
  );
}
