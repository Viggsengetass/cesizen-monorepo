import ProtectedRoute from "@/features/content/pages/protected";
import UserDashboard from "@/features/user/user-dashboard";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <UserDashboard />
        </ProtectedRoute>
    );
}
