// pagination
import EpisodeList from "../components/EpisodesList";
import useStore from "../store/store";
export default function Episodes() {
    const currentPage = useStore((state) => state.getCurrentPage());
    const setCurrentPage = useStore((state) => state.setCurrentPage);

    const EPISODES_PER_PAGE = 8;
    const totalPages = 5;

    const startId = (currentPage - 1) * EPISODES_PER_PAGE + 1;
    const currentBatchOfIds = Array.from(
        { length: EPISODES_PER_PAGE }, 
        (_, i) => startId + i
    );


    const pageIDs = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex flex-col min-h-[80vh] gap-8 p-6">
            <div className="flex grow">
                <EpisodeList ids={currentBatchOfIds} />
            </div>

            <div className="flex flex-col items-center gap-4 mt-auto py-6 border-t border-base-200">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                    Dimension Pages
                </span>

                <div className="join shadow-lg border border-primary/20">
                    {pageIDs.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`join-item btn btn-md md:btn-lg px-6 ${currentPage === page
                                    ? 'btn-primary no-animation' // Active State
                                    : 'hover:btn-secondary'      // Hover State
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <p className="text-sm opacity-50">
                    Showing Page <span className="text-primary font-mono">{currentPage}</span> of {pageIDs.length}
                </p>
            </div>
        </div>
    )

}