import "../styles/globals.css";
import ReactQueryProvider from "./ReactQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="overflow-y-scroll">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
