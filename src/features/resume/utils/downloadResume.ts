import jsPDF from "jspdf";

export function downloadResume(resume: any) {
  const { profile, projects, certificates, achievements } = resume;

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(22);
  doc.text(profile?.full_name || "Developer", 20, y);

  y += 10;

  doc.setFontSize(14);
  doc.text(profile?.headline || "", 20, y);

  y += 10;

  doc.setFontSize(11);

  if (profile?.location) {
    doc.text(`Location: ${profile.location}`, 20, y);
    y += 7;
  }

  if (profile?.github_url) {
    doc.text(`GitHub: ${profile.github_url}`, 20, y);
    y += 7;
  }

  if (profile?.linkedin_url) {
    doc.text(`LinkedIn: ${profile.linkedin_url}`, 20, y);
    y += 7;
  }

  if (profile?.portfolio_url) {
    doc.text(`Portfolio: ${profile.portfolio_url}`, 20, y);
    y += 10;
  }

  doc.setFontSize(16);
  doc.text("Professional Summary", 20, y);

  y += 8;

  doc.setFontSize(11);

  const summary = doc.splitTextToSize(
    profile?.bio || "",
    170
  );

  doc.text(summary, 20, y);

  y += summary.length * 6 + 10;

  doc.setFontSize(16);
  doc.text("Education", 20, y);

  y += 8;

  doc.setFontSize(11);

  doc.text(
    `${profile?.college || ""}`,
    20,
    y
  );

  y += 6;

  doc.text(
    `${profile?.branch || ""} (${profile?.graduation_year || ""})`,
    20,
    y
  );

  y += 12;

  doc.setFontSize(16);
  doc.text("Projects", 20, y);

  y += 8;

  doc.setFontSize(11);

  projects.forEach((project: any) => {
    doc.text(`• ${project.title}`, 20, y);
    y += 6;

    const desc = doc.splitTextToSize(
      project.description || "",
      165
    );

    doc.text(desc, 25, y);

    y += desc.length * 6 + 5;
  });

  doc.setFontSize(16);
  doc.text("Certificates", 20, y);

  y += 8;

  doc.setFontSize(11);

  certificates.forEach((certificate: any) => {
    doc.text(
      `• ${certificate.title} - ${certificate.issuer}`,
      20,
      y
    );

    y += 6;
  });

  y += 6;

  doc.setFontSize(16);
  doc.text("Achievements", 20, y);

  y += 8;

  doc.setFontSize(11);

  achievements.forEach((achievement: any) => {
    doc.text(
      `• ${achievement.title}`,
      20,
      y
    );

    y += 6;
  });

  doc.save("SkillBridge_Resume.pdf");
}