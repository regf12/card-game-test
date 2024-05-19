import Image from "next/image";

export default function CardComponent({ figure, value }: { figure: string, value: number }) {

  return (<>
    <Image
      src={`/images/${figure}-${value}.png`}
      alt={`${figure}-${value}`}
      width={100}
      height={140}
    />
  </>)
}