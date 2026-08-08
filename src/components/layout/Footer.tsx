import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-black">

      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            SkillBridge
          </h2>

          <p className="mt-1 text-sm text-zinc-600">
            Build your developer identity.
          </p>

        </div>

        <p className="text-sm text-zinc-600">
          © 2026 SkillBridge. All rights reserved.
        </p>

      </Container>

    </footer>
  );
}