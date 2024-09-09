import { Montserrat, Permanent_Marker } from "next/font/google";
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/system";
import "./globals.css";

const inter = Montserrat({ subsets: ["latin"], variable: '--font-inter' });
const permanent_marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-permanent-marker',
})

export const metadata = {
  title: "Jeopardy",
  description: "This app is built using Next.js and Firebase. It allows users to create and play their own Jeopardy game. You can create categories, add questions with points, and then play the game with friends or family. Firebase is used for storing the game data, so you can easily save and retrieve your Jeopardy games.",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${inter.variable} ${permanent_marker.variable} font-sans`}>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </body>
      </html>
  );
}
