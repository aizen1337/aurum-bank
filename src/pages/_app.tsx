import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider, SignedIn, UserButton} from "@clerk/nextjs";
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
        userButtonAvatarBox: 'absolute left-0 top-0 m-5 z-auto',
        rootBox: 'mt-10'
      }
    }}
    >
      <SignedIn>
          <UserButton userProfileMode="navigation" userProfileUrl="user-profile" afterSignOutUrl="/"/>
      </SignedIn>
      <Component {...pageProps}>
      </Component>
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
