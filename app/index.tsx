import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

const Page = () => {
  const {user} = useAuth();

  if (user) return <Redirect href="/(tabs)/Home" />

  return <Redirect href="/(auth)/welcome" />
}

export default Page;