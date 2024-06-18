import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import GameModeContextProvider, {GameModeContext} from "@/context/GameModeContext";
import GlobalTimerContextProvider from "@/context/GlobalTimerContext";
import GameLoopContextProvider from "@/context/GameLoopContext";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({subsets: ["latin"]});

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
        <div>
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
