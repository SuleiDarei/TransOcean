export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { logPlaceholderWarnings } = await import("./content/meta");
    logPlaceholderWarnings();
  }
}
