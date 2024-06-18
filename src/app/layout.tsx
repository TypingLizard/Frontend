import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import GameModeContextProvider from "@/context/GameModeContext";
import GlobalTimerContextProvider from "@/context/GlobalTimerContext";
import GameLoopContextProvider from "@/context/GameLoopContext";
import {AuthContextProvider} from "@/context/AuthContext";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typing Lizard",
  description: "A typewriter to practice and enhance your typing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div style={{height: '100vh'}}>
            <AuthContextProvider>
                <GameLoopContextProvider>
                    <GameModeContextProvider>
                        <GlobalTimerContextProvider>
                            {/*<Navbar/>*/}
                            {children}
                            <Footer/>
                        </GlobalTimerContextProvider>
                    </GameModeContextProvider>
                </GameLoopContextProvider>
            </AuthContextProvider>
        </div>
        </body>
        </html>
    );
}
