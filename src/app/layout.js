import localFont from "next/font/local";
import "./globals.css";

const avenir = localFont({
  src: "./fonts/Avenir Next LT Pro.otf",
  variable: "--font-avenir",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${avenir.variable} antialiased bg-white`}>
        <div className="flex items-center justify-center">
          <div className="w-full sm:w-[375px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
