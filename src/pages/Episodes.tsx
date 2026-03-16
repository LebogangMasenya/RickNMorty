// pagination
import EpisodeList from "../components/EpisodesList";
import useStore from "../store/store";
export default function Episodes() {
    const currentPage = useStore((state) => state.getCurrentPage());
    const setCurrentPage = useStore((state) => state.setCurrentPage);
    const selectedEpisode = useStore((state) => state.selectedEpisode);
    const EPISODES_PER_PAGE = 8;
    const totalPages = 5;

    const startId = (currentPage - 1) * EPISODES_PER_PAGE + 1;
    const currentBatchOfIds = Array.from(
        { length: EPISODES_PER_PAGE }, 
        (_, i) => startId + i
    );

    function handlePageChange(page: number) {
        setCurrentPage(page);
        
    }


    const pageIDs = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex flex-col min-h-[80vh] gap-8 p-6">
            <div className="flex grow">
                <EpisodeList ids={currentBatchOfIds} />
            </div>

            {!selectedEpisode && (
                <div className="join self-center mt-auto">
                    {pageIDs.map((page) => (
                        <button
                            key={page}
                            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )

}