import { type AppType } from "next/app";
import 'flowbite';
import { api } from "~/utils/api";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import {dark} from '@clerk/themes'
import "~/styles/globals.css";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: dark,
      elements: {
        formButtonPrimary: 'bg-yellow-600 hover:bg-amber-600 text-sm normal-case',
        footerActionLink: 'text-yellow-600',
      }
    }}
    >  
        <Component {...pageProps}/>
        <SignedOut>
          <RedirectToSignIn redirectUrl={"/dashboard"}/>
        </SignedOut>
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
