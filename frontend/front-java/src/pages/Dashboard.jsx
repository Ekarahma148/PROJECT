import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import MainLayout from "../components/MainLayout";

function Dashboard() {
  const summary = {
    total: 12,
    completed: 5,
    pending: 4,
    overdue: 3,
  };

  return (
    <MainLayout>

    <div className="min-h-screen bg-gray-100">

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor tugas dan deadline Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Total Task
                </p>

                <h2 className="text-3xl font-bold">
                  {summary.total}
                </h2>
              </div>

              <ClipboardList size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="text-3xl font-bold">
                  {summary.completed}
                </h2>
              </div>

              <CheckCircle size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Pending
                </p>

                <h2 className="text-3xl font-bold">
                  {summary.pending}
                </h2>
              </div>

              <Clock size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Overdue
                </p>

                <h2 className="text-3xl font-bold">
                  {summary.overdue}
                </h2>
              </div>

              <AlertTriangle size={40} />
            </div>
          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome
          </h2>

          <p className="text-gray-600">
            Selamat datang di Task Management &
            Reminder System. Kelola tugas,
            pantau deadline, dan tingkatkan
            produktivitas Anda.
          </p>
        </div>

      </div>
    </div>
    </MainLayout>
  );
}

export default Dashboard;