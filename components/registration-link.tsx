import { ArrowUpRight } from "lucide-react"
import { edition2027 } from "@/lib/edition-2027"

export function RegistrationLink({ className, onClick }: { className: string; onClick?: () => void }) {
  return (
    <a className={`button button-primary ${className}`} href={edition2027.registrationUrl} onClick={onClick}>
      Sign Up <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}
