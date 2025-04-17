import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-2">
        <Image src="/subminder-logo.png" alt="Subminder Logo" width={150} height={40} className="h-auto" priority />
      </div>
    </Link>
  )
}
