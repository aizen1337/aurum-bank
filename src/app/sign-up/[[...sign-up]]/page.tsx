import { SignUp } from "@clerk/nextjs/app-beta";
export default function Page() {
    return (
        <div className="w-screen h-screen grid place-items-center bg-bg-image bg-cover bg-no-repeat">
            <SignUp/>
        </div>
    );
  }