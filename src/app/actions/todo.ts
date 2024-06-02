"use server"

import { createClient } from "@/utils/supabase/server";
import { Todo } from "@/types/custom";
import { revalidatePath } from "next/cache";

export const getTodos = async () => {
    const supabase = await createClient();

    const { data: todos } = await supabase
        .from("todos")
        .select('title')
        .order("created", { ascending: false });

    return todos;
}

export async function addTodo(formData: FormData) {
    const supabase = createClient();
    const text = formData.get("todo") as string | null

    if (!text) {
        throw new Error("Text is required")
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    } 
    const { error } = await supabase.from("todos").insert({ 
        title: text,
        user_id: user.id
    })

    if (error) {
        throw new Error("Error adding task")
    }

    revalidatePath("/")
}

export async function deleteTodo(id: number) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("todos").delete().match({
        user_id: user.id,
        id: id
    })

    if (error) {
        throw new Error("Error deleting task")
    }

    revalidatePath("/")
}

export async function updateTodo(todo: Todo) {


    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("todos").update(todo).match({
        user_id: user.id,
        id: todo.id
    })

    if (error) {
        throw new Error("Error updating task")
    }

    revalidatePath("/")
}