export default function ResourcesPage() {
  const resources = [
    {
      title: "React Documentation",
      description: "Official React guides and concepts.",
      link: "https://react.dev",
    },
    {
      title: "JavaScript Mastery",
      description: "Improve your JavaScript fundamentals.",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      title: "Frontend Roadmaps",
      description: "Structured paths for becoming a frontend developer.",
      link: "https://roadmap.sh/frontend",
    },
  ];

  return (
    <main className="min-h-screen bg-[#05060a] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          Learning Resources
        </h1>

        <p className="mt-3 text-gray-400">
          Curated resources to help you improve your skills.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {resources.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}