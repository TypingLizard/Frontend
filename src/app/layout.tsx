import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import GameModeContextProvider from "@/context/GameModeContext";
import GlobalTimerContextProvider from "@/context/GlobalTimerContext";
import GameLoopContextProvider from "@/context/GameLoopContext";
import {AuthContextProvider} from "@/context/AuthContext";
import React from "react";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
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
