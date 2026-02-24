export default function Page() {
    return (
        <div className="grid grid-cols-4 grid-rows-5 w-full min-h-screen bg-white rounded-2xl shadow-lg p-3">
            <div className="bg-gray-300  col-span-2 row-span-2 m-5 rounded-3xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-500 m-4 border-b-3">
                    Schedule book basic information import
                </h3>
            </div>
            <div className="bg-gray-300 col-span-1 row-span-1 m-5 rounded-3xl shadow-lg">
                <h2 className="h-8 text-lg font-semibold text-gray-500 m-4 border-b-3">
                    Import book basic information
                </h2>
            </div>
            <div className="col-span-1 bg-gray-300 row-span-1 m-5 rounded-3xl shadow-lg">
                    <h3 className="h-8 text-xl font-semibold text-gray-500 m-4 border-b-3">
                        Import book details
                    </h3>
                <div className="justify-center">
                    <button className="rounded-3xl border bg-green-300/70 w-40">Test</button>
                </div>
            </div>

        </div>
    )
}