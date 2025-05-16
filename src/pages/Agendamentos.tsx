import Calendar from "../components/calendar/calendar"

export default function Calendario() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-4xl h-[80vh] overflow-y-auto">
        <Calendar />
      </div>
    </main>
  )
}
