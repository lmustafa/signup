import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup Form Demo",
  description: "A demo application showcasing an account creation form with validation features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
