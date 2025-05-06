import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";

export function TestComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: () => backend.test.hello()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <p className="text-lg font-medium">API Response:</p>
      <p className="mt-2">{data?.message}</p>
    </div>
  );
}
