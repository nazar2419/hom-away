import { fetchStats } from "@/utils/actions";
import StatsCards from "./StatsCard";

async function StatsContainer() {
  const data = await fetchStats();
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCards title="users" value={data?.userCount || 0} />
      <StatsCards title="properties" value={data?.propertiesCount || 0} />
      <StatsCards title="bookings" value={data?.bookingsCount || 0} />
    </div>
  )
}
export default StatsContainer