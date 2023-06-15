import { CARD_TYPE } from "@prisma/client";
export default function switchCardBackground(parameter: CARD_TYPE) {
    switch(parameter) {
      case 'PLATINUM': 
        return 'bg-gradient-to-r from-stone-200 via-neutral-300 to-neutral-400 text-black';
      case 'GOLD':
        return 'bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-600 text-white';
      case 'EXECUTIVE':
        return 'bg-gradient-to-r from-sky-200 via-indigo-500 to-blue-700 text-white';
      default:
        return ''
    }
  }