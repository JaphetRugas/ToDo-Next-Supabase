"use client"

import React from 'react'
import { login, signup } from '@/app/actions/auth';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { SubmitButton } from "@/components/SubmitButton";

interface LoginFormProps {
    message: string;
}
export default function LoginForm({ message }: LoginFormProps) {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                {message && (
                    <div className="text-sm font-medium text-destructive">
                        {message}
                    </div>
                )}
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <form id="login-form" className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            minLength={6}
                            name="password"
                            id="password"
                            type="password"
                            required
                        />
                    </div>

                    <SubmitButton
                        formAction={login}
                        className="w-full"
                        pendingText="Signing In..."
                    >
                        Sign In
                    </SubmitButton>
                </form>
                {/* <OAuthButtons /> */}
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <button
                        formAction={signup}
                        form="login-form" className="underline"
                    >
                        Sign up
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
