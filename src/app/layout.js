import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Providers from "./Components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSAlgoViz",
  description: "Computer Science Algorithms Visualizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
