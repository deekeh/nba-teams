import "./Home.scss";
import { useEffect, useState } from "react";

// components
import Sidebar from "../../components/Sidebar/Sidebar";

function Home() {
  const [showSidebar, setShowSidebar] = new useState(false);
  const [gameData, setGameData] = new useState(() => null);
  const [selectedTeam, setSelectedTeam] = new useState(undefined);
  function toggleSidebar(teamId) {
    setSelectedTeam(teamId);
    if (typeof teamId === 'number') {
      setGameData(() => null);
      fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids=${teamId}`)
        .then(res => res.json())
        .then(data => {
          return data.data.find(game => game?.home_team.id === teamId)
        })
        .then(setGameData);
    }
    setShowSidebar(val => !val);
  }

  const [pageData, setPageData] = useState(() => ({
    "total_pages": 3,
    "current_page": 1,
    "next_page": 2,
    "per_page": 10,
    "total_count": 30
  }));

  const [tableData, setTableData] = new useState(() => []);
  function prepareTableData(pageNumber = 1, itemsPerPage = 10) {
    return new Promise(function (resolve, reject) {
      fetch(`https://www.balldontlie.io/api/v1/teams?page=${pageNumber}&per_page=${itemsPerPage}`)
        .then(res => res.json())
        .then(teams => {
          setTableData(() => teams?.data || []);
          resolve(teams);
        })
        .catch(reject);
    });
  }

  function changePage(pageNumber = pageData.current_page) {
    prepareTableData(pageNumber)
      .then(teams => {
        setPageData(() => teams.meta);
      });
  }

  useEffect(changePage, []);

  return <>
    <main className="Home">
      <header className="header">
        NBA Teams
      </header>

      <label className="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input type="text" />
      </label>

      <section className="teams-data-table-container">
        <table className="teams-data-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>City</th>
              <th>Abbreviation</th>
              <th>Conference</th>
              <th>Division</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData.map((el, idx) =>
                <tr
                  className={selectedTeam === el.id ? "selected" : undefined}
                  key={idx}
                  onClick={() => toggleSidebar(el.id)}
                >
                  <td>{el.name || "NA"}</td>
                  <td>{el.city || "NA"}</td>
                  <td>{el.abbreviation || "NA"}</td>
                  <td>{el.conference || "NA"}</td>
                  <td>{el.division || "NA"}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>

      <section className="pagination">
        <button
          disabled={pageData.current_page === 1}
          onClick={() => changePage(pageData.current_page - 1)}
        >&lt;</button>

        <button
          disabled={pageData.current_page === 1}
          onClick={() => changePage(1)}
        >1</button>

        {/* to show current page */}
        {/* {pageData.current_page} */}

        <button
          disabled={pageData.current_page === pageData.total_pages}
          onClick={() => changePage(pageData.total_pages)}
        >{pageData.total_pages}</button>

        <button
          disabled={!pageData.next_page}
          onClick={() => changePage(pageData.current_page + 1)}
        >&gt;</button>
      </section>
    </main>

    {/* sidebar */}
    <Sidebar state={showSidebar} data={gameData} toggleSidebar={toggleSidebar} />
  </>
}

export default Home;