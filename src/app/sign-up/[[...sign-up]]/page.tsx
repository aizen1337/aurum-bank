import { SignUp } from "@clerk/nextjs/app-beta";
export default function Page() {
    return (
        <div className="w-screen h-screen grid place-items-center">
            <SignUp/>
        </div>
    );
  }