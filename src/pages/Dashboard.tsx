import { Characters } from "./Characters"
import Location from "../components/Location"
import Episodes from "./Episodes"

export default function Dashboard() {

    return (
        <div className="flex h-screen w-full bg-slate-900 text-white overflow-hidden">

            <aside className="w-1/2 border-r border-slate-700 flex flex-col">
                <div className="p-4 border-b border-slate-700 font-bold text-xl">
                    Characters
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <Characters />
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-full">

                <section className="h-3/4 border-b border-slate-700 flex flex-col">
                    <div className="p-4 bg-slate-800/50 font-semibold">Episodes</div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Episodes />
                    </div>
                </section>

                <section className="h-1/4 flex flex-col">
                    <div className="p-4 bg-slate-800/50 font-semibold">Location</div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Location />
                    </div>
                </section>

            </main>

        </div>
    )
}