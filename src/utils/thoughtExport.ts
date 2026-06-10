import type { Thought } from "../types/bodofo";

interface ThoughtExportData {
  currentTask: string;
  thoughts: Thought[];
}

function formatExportDate(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function formatThoughtDumpText({
  currentTask,
  thoughts,
}: ThoughtExportData) {
  const lines = [
    "BoDoFo Thought Dump",
    formatExportDate(),
    currentTask.trim() ? `Focus task: ${currentTask.trim()}` : "",
    "",
    thoughts.length
      ? thoughts.map((thought) => `- ${thought.text}`).join("\n")
      : "No thoughts parked right now.",
  ];

  return lines.filter((line, index) => line || index >= 3).join("\n");
}

export async function exportThoughtDumpPdf(data: ThoughtExportData) {
  const { jsPDF } = await import("jspdf");
  const document = new jsPDF({
    unit: "pt",
    format: "a4",
  });
  const margin = 54;
  const pageWidth = document.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let y = 64;

  document.setFont("times", "bold");
  document.setFontSize(22);
  document.setTextColor(23, 50, 77);
  document.text("BoDoFo Thought Dump", margin, y);

  y += 26;
  document.setFont("times", "normal");
  document.setFontSize(11);
  document.setTextColor(80, 83, 85);
  document.text(formatExportDate(), margin, y);

  if (data.currentTask.trim()) {
    y += 28;
    document.setFont("times", "bold");
    document.text("Current focus", margin, y);
    y += 18;
    document.setFont("times", "normal");
    const taskLines = document.splitTextToSize(
      data.currentTask.trim(),
      contentWidth,
    );
    document.text(taskLines, margin, y);
    y += taskLines.length * 14;
  }

  y += 30;
  document.setDrawColor(220, 211, 194);
  document.line(margin, y, pageWidth - margin, y);
  y += 28;

  document.setFontSize(12);
  const thoughts = data.thoughts.length
    ? data.thoughts.map((thought) => thought.text)
    : ["No thoughts parked right now."];

  thoughts.forEach((thought, index) => {
    const lines = document.splitTextToSize(
      data.thoughts.length ? `• ${thought}` : thought,
      contentWidth,
    );
    const lineHeight = 16;
    const requiredHeight = lines.length * lineHeight + 12;

    if (y + requiredHeight > document.internal.pageSize.getHeight() - margin) {
      document.addPage();
      y = margin;
    }

    document.text(lines, margin, y);
    y += requiredHeight;

    if (index < thoughts.length - 1) {
      document.setDrawColor(238, 232, 220);
      document.line(margin, y - 6, pageWidth - margin, y - 6);
    }
  });

  const fileDate = new Date().toISOString().slice(0, 10);
  document.save(`bodofo-thought-dump-${fileDate}.pdf`);
}
