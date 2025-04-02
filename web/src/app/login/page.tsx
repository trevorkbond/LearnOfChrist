"use client";

import React, { useState } from "react";
import { login, signup } from "./loginActions";
import toast from "react-hot-toast";
import Button from "@/components/Button/Button";

export interface AuthResult {
  success: boolean;
  message: string;
}

type AuthAction = (formData: FormData) => Promise<AuthResult | void>;

export default function LoginPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async (
    formData: FormData,
    authAction: AuthAction
  ): Promise<void> => {
    setIsLoading(true);
    const result = await authAction(formData);
    setIsLoading(false);

    if (result && !result.success) {
      toast.error(result.message);
    }
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    authAction: AuthAction
  ): void => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!form) return;

    const formData = new FormData(form);
    handleAuth(formData, authAction);
  };

  return (
    <>
      <div className="min-h-full pt-15 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete={
                    isLoginMode ? "current-password" : "new-password"
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <Button
                text={isLoginMode ? "Login" : "Sign Up"}
                isLoading={isLoading}
                onClick={(event) =>
                  handleSubmit(event, isLoginMode ? login : signup)
                }
              />
              <div className="text-center mt-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginMode(!isLoginMode);
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {isLoginMode
                    ? "New to Learn of Christ? Sign up"
                    : "Already a user? Login"}
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
