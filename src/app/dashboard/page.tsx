import TimerFormCard from "@/components/dashboard/TimerFormCard";
import WeeklyCalendar from "@/components/dashboard/WeeklyCalendar";
import DailyWorkChart from "@/components/dashboard/DailyWorkChart";
import CustomerInformation from "@/components/dashboard/CustomerInformation";

export default function DashboardPage() {
    return (
        <>
            <TimerFormCard/>
            <DailyWorkChart/>
            <WeeklyCalendar/>
            <CustomerInformation/>
        </>
    );
}
