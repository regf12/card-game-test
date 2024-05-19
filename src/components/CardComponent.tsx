import Image from "next/image";

export default function CardComponent({ figure, value }: { figure: string, value: number }) {

  return (<>
    <Image
      src={`/svg/${figure}-${value}.svg`}
      alt={`${figure}-${value}`}
      fill
      className="card-component max-w-100 h-auto"
    />
  </>)
}