import { CARD_TYPE } from "@prisma/client";
export default function switchCardBackground(parameter: CARD_TYPE) {
    switch(parameter) {
      case 'PLATINUM': 
        return 'bg-slate-700 text-black';
      case 'GOLD':
        return 'bg-amber-800 text-white';
      case 'EXECUTIVE':
        return 'bg-indigo-800 text-white';
      case 'STANDARD':
        return 'bg-lime-300 text-black'
    }
  }