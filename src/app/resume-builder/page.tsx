"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

export default function ResumePage() {
  return (
    <DashboardLayout>
      <ResumeBuilder />
    </DashboardLayout>
  );
}