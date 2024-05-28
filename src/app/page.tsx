import TypingArea from "@/components/typing-area/TypingArea";

export default function Home() {
    return (
        <>
            <main>
                <h1>Home</h1>
                <p>Welcome to your Next.js app.</p>
                <div id="header">
                    <div id="info">
                        30 seconds left
                    </div>
                    <div id="buttons">
                        <button id="newGame">New Game</button>
                    </div>
                </div>
                <TypingArea/>
            </main>
        </>
    );
}
