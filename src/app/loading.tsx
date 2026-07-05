export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
      <img
        src="/apple-touch-icon.png"
        alt="TheFearLab"
        className="h-36 w-36 animate-pulse"
      />

      <h1 className="mt-8 text-4xl font-bold text-red-600">
        THE FEAR LAB
      </h1>

      <p className="mt-2 text-zinc-400">
        Crew Platform
      </p>

      <div className="mt-10 h-1 w-52 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full w-full animate-[loading_1.5s_linear_infinite] bg-red-600"></div>
      </div>
    </div>
  );
}