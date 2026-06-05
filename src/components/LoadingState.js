export default function LoadingState({ label = "Loading" }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass rounded-lg p-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
