import "./Page.css";

function Page({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}) {
  return <div className={`Page ${className ?? ""}`}>{children}</div>;
}

export default Page;
