type SectionHeadingProps = {
  level?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
};

// Renders the section's main heading as either an <h1> (when the section is
// the standalone content of its own SEO page, e.g. /about) or an <h2> (when
// the section is embedded inside the full scrolling home page, which already
// has its own <h1> in the hero). Keeps heading hierarchy valid on every page.
const SectionHeading = ({
  level = "h2",
  className,
  children,
}: SectionHeadingProps) => {
  const Tag = level;
  return <Tag className={className}>{children}</Tag>;
};

export default SectionHeading;
