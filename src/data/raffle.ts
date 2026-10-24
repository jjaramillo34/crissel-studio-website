/** Matches promos / API filters for this campaign */
export const RAFFLE_PROMO_SLUG = 'mamita-2026'

/** First N clients get the limited physical / priority coupon treatment (messaging only unless you track claims). */
export const COUPON_FCFS_LIMIT = 20

/** Sorteo maquillaje: anuncio en redes vs. día del servicio premio */
export const SORTEO_ANUNCIO_REDES_DIA = 'lunes 11 de mayo de 2026'
export const SORTEO_SERVICIO_PREMIO_DIA = 'viernes 15 de mayo de 2026'

/** Entries close when the winner is announced (start of the announcement day, Ecuador time) */
export const RAFFLE_ENTRIES_CLOSE_AT = '2026-05-11T00:00:00-05:00'

export function isRaffleOpen(now: Date = new Date()): boolean {
  return now < new Date(RAFFLE_ENTRIES_CLOSE_AT)
}

export const SORTEO_COPY_BANNER = `El sorteo de maquillaje se anunciará en nuestras redes sociales el ${SORTEO_ANUNCIO_REDES_DIA}. La ganadora recibirá su servicio el ${SORTEO_SERVICIO_PREMIO_DIA}.`

export const SORTEO_COPY_FORM_INTRO = `Deja tu nombre y celular para entrar al sorteo. Anunciaremos a la ganadora en nuestras redes el ${SORTEO_ANUNCIO_REDES_DIA}. El servicio del premio (maquillaje) será el ${SORTEO_SERVICIO_PREMIO_DIA}; además nos pondremos en contacto contigo para coordinar los detalles.`
