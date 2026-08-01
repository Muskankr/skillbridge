interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-10">

        <h1 className="text-4xl font-black text-center">
          SkillBridge
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Continue your developer journey
        </p>

        <div className="mt-10">
          {children}
        </div>

      </div>

    </main>
  );
}