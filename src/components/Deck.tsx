import Image from "next/image";

export default function Deck({ figure, value }: { figure: string, value: number }) {

  return (<>
    <Image
      src={`/public/images/${figure}-${value}.png`}
      alt={`${figure}-${value}`}
      width={100}
      height={140}
    />
  </>)
}