import type { IconType } from 'react-icons'
import { FaWhatsapp } from 'react-icons/fa6'
import {
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCube,
  HiOutlineEnvelope,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineTicket,
} from 'react-icons/hi2'
import { LuCrown, LuDices, LuHandHeart, LuPartyPopper, LuWandSparkles } from 'react-icons/lu'

/** Extends Once UI defaults with Crissel-specific icons */
export const iconLibrary: Record<string, IconType> = {
  arrowLeft: HiOutlineArrowLeft,
  calendar: HiOutlineCalendarDays,
  clock: HiOutlineClock,
  crown: LuCrown,
  dice: LuDices,
  heart: HiOutlineHeart,
  mail: HiOutlineEnvelope,
  mapPin: HiOutlineMapPin,
  nails: LuHandHeart,
  package: HiOutlineCube,
  party: LuPartyPopper,
  phone: HiOutlinePhone,
  shoppingBag: HiOutlineShoppingBag,
  sparkle: HiOutlineSparkles,
  star: HiOutlineStar,
  ticket: HiOutlineTicket,
  wand: LuWandSparkles,
  whatsapp: FaWhatsapp,
}
