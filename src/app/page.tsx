import Link from "next/link";

export default function RootPage() {
  return (
    <main>
      <div className="my-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/home"
          className="group rounded-lg px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-extrabold`}>Home</h2>
        </Link>
      </div>
    </main>
  );
}
