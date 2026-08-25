import type { IconType } from 'react-icons'
import { HiOutlineCalendarDays, HiOutlineSparkles, HiOutlineMapPin } from 'react-icons/hi2'

/** Extends Once UI defaults with Crissel-specific icons */
export const iconLibrary: Record<string, IconType> = {
  calendar: HiOutlineCalendarDays,
  sparkle: HiOutlineSparkles,
  mapPin: HiOutlineMapPin,
}
