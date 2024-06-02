import { signout } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Navigation() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div  className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> 
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div>
                    <Link href="/" className="text-2xl font-bold">
                        Todo Supabase
                    </Link>
                </div>
                <nav className="flex flex-1 items-center justify-end space-x-2">
                    {user ? (
                        <>
                            <span className="py-2 px-3">{user.email}</span>
                            <form action={signout} className="flex items-center gap-2">
                                <button className="py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white">
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login" className="py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
}
