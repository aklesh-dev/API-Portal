"use client";

import { LoginForm } from "@/components/Form/AuthForm/LoginForm";
import { SignupForm } from "@/components/Form/AuthForm/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen py-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 shadow-xl rounded-2xl p-6">
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Switcher */}
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200">
            <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">Sign Up</TabsTrigger>
          </TabsList>

          {/* Tab Contents with Animation */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === "login" && (
                <TabsContent value="login" forceMount>
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.35 }}
                  >
                    <LoginForm />
                  </motion.div>
                </TabsContent>
              )}

              {activeTab === "signup" && (
                <TabsContent value="signup" forceMount>
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SignupForm />
                  </motion.div>
                </TabsContent>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
