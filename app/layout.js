import './globals.css';

export const metadata = {
  title: "Todo App",
  description: "A simple todo app using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}