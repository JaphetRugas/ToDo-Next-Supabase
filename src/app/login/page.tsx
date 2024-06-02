import LoginForm from "@/components/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const supabase = createClient();
    const message = searchParams.message

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/");
    }
    return (
        <section className="h-[calc(100vh-57px)] flex justify-center items-center">
            <LoginForm message={message}/> 
        </section>
    )
}