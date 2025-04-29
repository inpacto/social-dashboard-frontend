import * as React from "react"

const PONTO_DE_CORTE_MOBILE = 768

export function useIsMobile() {
  const [isMobile, setEhMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const consultaMidia = window.matchMedia(`(max-width: ${PONTO_DE_CORTE_MOBILE - 1}px)`)

    const aoMudar = () => {
      setEhMobile(window.innerWidth < PONTO_DE_CORTE_MOBILE)
    }

    consultaMidia.addEventListener("change", aoMudar)
    setEhMobile(window.innerWidth < PONTO_DE_CORTE_MOBILE)

    return () => consultaMidia.removeEventListener("change", aoMudar)
  }, [])

  return !!isMobile
}
