import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold">
            SkillBridge
          </h2>

          <p className="text-slate-400 mt-2">
            Build your developer identity.
          </p>
        </div>

        <p className="text-slate-500 text-sm">
          © 2026 SkillBridge. All rights reserved.
        </p>

      </Container>
    </footer>
  );
}