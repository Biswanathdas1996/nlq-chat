import React from "react";

interface BoldTextProps {
  text: string;
}

const BoldText: React.FC<BoldTextProps> = ({ text }) => {
  function makeBold(text: string): string {
    const lines = text.split("\n");
    const boldLines = lines.map((line) => {
      if (
        line.startsWith("Title:") ||
        line.startsWith("Acceptance Criteria:") ||
        line.startsWith("Test Case ") ||
        line.startsWith("Scenario") ||
        line.startsWith("Feature") ||
        line.match(/^\d+\./)
      ) {
        return `**${line}**`;
      }

      return line;
    });
    return boldLines.join("\n");
  }

  return (
    <div>
      {makeBold(text)
        .split("\n")
        .map((line, index) => (
          <div key={index}>
            {line.startsWith("**") && line.endsWith("**") ? (
              <strong style={{ fontWeight: 600 }}>{line.slice(2, -2)}</strong>
            ) : (
              <span style={{ color: "#333333a3" }}>{line}</span>
            )}
            <br />
          </div>
        ))}
    </div>
  );
};

export default BoldText;
