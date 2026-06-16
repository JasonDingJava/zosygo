// ContentParagraphs.tsx
// Parses inline Markdown within article section content strings and renders
// it as proper HTML elements (headings, blockquotes, tables, bold, etc.)

interface ContentParagraphsProps {
  content: string;
}

export default function ContentParagraphs({ content }: ContentParagraphsProps) {
  // Split content into lines to detect blocks
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let inTable = false;
  let tableIdx = 0;

  const flushTable = () => {
    if (currentTable && currentTable.headers.length > 0) {
      blocks.push(
        <div key={`table-${tableIdx++}`} className="mt-4 mb-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {currentTable.headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-2 text-left font-semibold text-[#c9a227]">
                    {renderInlineMarkdown(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-zinc-400">
                      {renderInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line — flush any pending table
    if (trimmed === "") {
      flushTable();
      blocks.push(<div key={`empty-${i}`} className="h-3" />);
      continue;
    }

    // Horizontal rule: ---
    if (/^---+$/.test(trimmed)) {
      flushTable();
      blocks.push(
        <hr key={`hr-${i}`} className="my-6 border-t border-white/10" />
      );
      continue;
    }

    // Heading: ##, ###, or ####
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushTable();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (level === 4) {
        blocks.push(
          <h4
            key={`h-${i}`}
            id={id}
            className="mt-5 mb-2 text-base font-semibold text-zinc-400"
          >
            {renderInlineMarkdown(text)}
          </h4>
        );
      } else if (level === 2) {
        blocks.push(
          <h2
            key={`h-${i}`}
            id={id}
            className="mt-8 mb-3 text-2xl font-bold text-white"
          >
            {renderInlineMarkdown(text)}
          </h2>
        );
      } else if (level === 3) {
        blocks.push(
          <h3
            key={`h-${i}`}
            id={id}
            className="mt-6 mb-2 text-lg font-semibold text-zinc-300"
          >
            {renderInlineMarkdown(text)}
          </h3>
        );
      }
      continue;
    }

    // Blockquote: >
    const bqMatch = trimmed.match(/^>\s?(.*)$/);
    if (bqMatch) {
      flushTable();
      // Collect consecutive blockquote lines
      const bqLines: string[] = [bqMatch[1]];
      while (i + 1 < lines.length) {
        const nextMatch = lines[i + 1].trim().match(/^>\s?(.*)$/);
        if (nextMatch) {
          bqLines.push(nextMatch[1]);
          i++;
        } else {
          break;
        }
      }
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="my-4 border-l-2 border-[#c9a227]/50 pl-4 text-zinc-400 italic"
        >
          {bqLines.map((bqLine, bi) => (
            <span key={bi}>
              {renderInlineMarkdown(bqLine)}
              {bi < bqLines.length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      );
      continue;
    }

    // Table detection: | ... |
    const tableMatch = trimmed.match(/^\|.+\|$/);
    if (tableMatch) {
      // If this is a separator row (| --- | --- |), skip it
      if (/^\|[\s:-]+\|$/.test(trimmed) && inTable) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        const cells = parseTableRow(trimmed);
        currentTable = { headers: cells, rows: [] };
      } else {
        // Data row
        const cells = parseTableRow(trimmed);
        if (currentTable && cells.length > 0) {
          currentTable.rows.push(cells);
        }
      }
      continue;
    }

    // Regular paragraph text (with possible list items)
    flushTable();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      // Collect consecutive list items
      const listItems: string[] = [trimmed.slice(2)];
      while (i + 1 < lines.length) {
        const nextTrimmed = lines[i + 1].trim();
        if (nextTrimmed.startsWith("- ") || nextTrimmed.startsWith("* ")) {
          listItems.push(nextTrimmed.slice(2));
          i++;
        } else {
          break;
        }
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-2 list-disc pl-5 text-zinc-400 space-y-1">
          {listItems.map((item, li) => (
            <li key={li}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      // Ordered list
      const listItems: string[] = [trimmed.replace(/^\d+\.\s/, "")];
      while (i + 1 < lines.length) {
        const nextTrimmed = lines[i + 1].trim();
        const nextMatch = nextTrimmed.match(/^\d+\.\s(.+)$/);
        if (nextMatch) {
          listItems.push(nextMatch[1]);
          i++;
        } else {
          break;
        }
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-2 list-decimal pl-5 text-zinc-400 space-y-1">
          {listItems.map((item, li) => (
            <li key={li}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <p key={`p-${i}`} className="leading-relaxed text-zinc-400">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    }
  }

  // Flush any remaining table
  flushTable();

  return <>{blocks}</>;
}

// Renders inline Markdown within a text string: **bold**, `code`, ![alt](src)
function renderInlineMarkdown(text: string): React.ReactNode {
  // First handle image syntax: ![alt](src)
  const imageMatch = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageMatch) {
    const [, alt, src] = imageMatch;
    // Make src relative to public/ if it starts with /
    const imgSrc = src.startsWith("/") ? src : `/images/articles/${src}`;
    return (
      <img
        src={imgSrc}
        alt={alt}
        className="rounded-lg border border-white/10 my-6 w-full object-cover"
        loading="lazy"
      />
    );
  }

  // Split on **bold** patterns and `code` and ![alt](src)
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|!\[[^\]]*\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-white/5 px-1.5 py-0.5 text-sm text-amber-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const nestedImg = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (nestedImg) {
      const imgSrc = nestedImg[2].startsWith("/") ? nestedImg[2] : `/images/articles/${nestedImg[2]}`;
      return (
        <img
          key={i}
          src={imgSrc}
          alt={nestedImg[1]}
          className="rounded-lg border border-white/10 my-6 w-full object-cover"
          loading="lazy"
        />
      );
    }
    return part;
  });
}

// Parse a table row like | A | B | C |
function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}