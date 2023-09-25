import { CARD_TYPE } from "@prisma/client";
export default function switchCardBackground(parameter: CARD_TYPE) {
    switch(parameter) {
      case 'PLATINUM': 
        return 'https://www.creativefabrica.com/wp-content/uploads/2021/07/06/Abstract-silver-gradient-background-Graphics-14360484-1-580x386.jpg';
      case 'GOLD':
        return 'https://media.istockphoto.com/id/1354890957/video/moving-gold-background-happy-holidays-merry-christmas-happy-new-year-abstract-background-copy.jpg?s=640x640&k=20&c=dUaL4ENFGJftnXpaYHbKVqOB_URGtu4xFtWxHJumPog=';
      case 'EXECUTIVE':
        return 'https://e0.pxfuel.com/wallpapers/29/124/desktop-wallpaper-indigo-background-and-41-b-scb-wp-bg-collection-indigo-aesthetic.jpg';
      case 'STANDARD':
        return 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  }