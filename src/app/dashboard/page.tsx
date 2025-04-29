import TimerFormCard from "@/components/features/dashboard/TimerFormCard";
import WeeklyCalendar from "@/components/features/dashboard/WeeklyCalendar";
import DailyWorkChart from "@/components/features/dashboard/DailyWorkChart";
import CustomerInformation from "@/components/features/dashboard/CustomerInformation";
import {cookies} from "next/headers";
import {Project} from "@/types/project";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value;

    let projects: Project[] = [];
    const apiClient = new SsrApiClient({accessToken})
    try {
        projects = await apiClient.fetchProjects()
    } catch (error) {
        const {message} = handleApiError(error);
        console.log(message)
    }

    return (
        <>
            <TimerFormCard projects={projects}/>
            <DailyWorkChart/>
            <WeeklyCalendar/>
            <CustomerInformation/>
        </>
    );
}
