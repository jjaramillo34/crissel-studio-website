import type { IconType } from 'react-icons'
import { FaWhatsapp } from 'react-icons/fa6'
import {
  HiOutlineAcademicCap,
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineCube,
  HiOutlineEnvelope,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineTicket,
} from 'react-icons/hi2'
import { LuCrown, LuDices, LuHandHeart, LuPartyPopper, LuWandSparkles } from 'react-icons/lu'

/** Extends Once UI defaults with Crissel-specific icons */
export const iconLibrary: Record<string, IconType> = {
  academic: HiOutlineAcademicCap,
  arrowLeft: HiOutlineArrowLeft,
  calendar: HiOutlineCalendarDays,
  chat: HiOutlineChatBubbleLeftRight,
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
  shieldCheck: HiOutlineShieldCheck,
  shoppingBag: HiOutlineShoppingBag,
  sparkle: HiOutlineSparkles,
  star: HiOutlineStar,
  ticket: HiOutlineTicket,
  wand: LuWandSparkles,
  whatsapp: FaWhatsapp,
}
