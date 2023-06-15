import { SignUp } from "@clerk/nextjs/app-beta";
import BASE_URL from "@/utils/base_url";
export default function Page() {
    return (
        <div className="w-screen h-screen grid place-items-center">
            <SignUp/>
        </div>
    );
  }