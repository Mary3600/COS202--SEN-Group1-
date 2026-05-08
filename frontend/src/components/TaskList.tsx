export default function TaskList() {
  return (
    <div className="flex gap-6">
      
      {/* LEFT */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Upcoming Tasks
        </h1>

        {/* Today */}
        <div className="mb-6">
          <h2 className="text-gray-500 mb-2">Today</h2>

          <div className="bg-gray-50 p-4 rounded-xl mb-3 flex justify-between">
            <div>
              <p className="font-semibold">
                BIO 201: Molecular Lab Report
              </p>
              <p className="text-sm text-gray-400">
                Due today, 11:59 PM
              </p>
            </div>
            <span className="text-red-500 text-sm">HIGH</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
            <div>
              <p className="font-semibold">
                HIST 105: Weekly Reflection
              </p>
              <p className="text-sm text-gray-400">
                Due today, 6:00 PM
              </p>
            </div>
            <span className="text-orange-500 text-sm">MEDIUM</span>
          </div>
        </div>

        {/* Tomorrow */}
        <div className="mb-6">
          <h2 className="text-gray-500 mb-2">Tomorrow</h2>

          <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
            <div>
              <p className="font-semibold">
                MATH 302: Problem Set 4
              </p>
              <p className="text-sm text-gray-400">
                Due Nov 14, 5:00 PM
              </p>
            </div>
            <span className="text-green-500 text-sm">LOW</span>
          </div>
        </div>

        {/* Week */}
        <div>
          <h2 className="text-gray-500 mb-2">This Week</h2>

          <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
            <div>
              <p className="font-semibold">
                ENG 210: Essay Rough Draft
              </p>
              <p className="text-sm text-gray-400">
                Due Friday, Nov 17
              </p>
            </div>
            <span className="text-orange-500 text-sm">MEDIUM</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80">
        
        {/* CARD */}
        <div className="bg-green-700 text-white p-6 rounded-2xl mb-6">
          <p className="text-sm opacity-80">ACADEMIC MOMENTUM</p>
          <h2 className="text-3xl font-bold">84% Focused</h2>
          <p className="text-sm mt-2 opacity-80">
            You've completed 12 tasks this week. Keep it up!
          </p>
        </div>

        {/* SMALL CARD */}
        <div className="bg-gray-100 p-4 rounded-2xl">
          <p className="font-semibold mb-2">Course Load</p>
          <div className="flex justify-between text-sm">
            <span>BIO 201</span>
            <span>3 Tasks</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>HIST 105</span>
            <span>1 Task</span>
          </div>
        </div>
      </div>
    </div>
  );
}