import "./Home.scss";
import { useEffect, useState } from "react";

// components
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [showSidebar, setShowSidebar] = new useState(false);
  const [gameData, setGameData] = new useState(() => null);
  const [selectedTeam, setSelectedTeam] = new useState(undefined);
  /**
   * toggle the sidebar on/off. if the function has a number parameter,
   * then get game details for the mentioned parameter-number as team's
   * ID and fetches from the API to be passed to the sidebar.
   * @param {Number} teamId optional ID of the team to fetch game-data
   * @returns {undefined} does not return anything
   */
  function toggleSidebar(teamId) {
    setSelectedTeam(teamId);
    if (typeof teamId === 'number') {
      setGameData(() => 'loading');
      fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&team_ids=${teamId}`)
        .then(res => res.json())
        .then(data => {
          return data.data.find(game => game?.home_team.id === teamId)
        })
        .then(setGameData);
    }
    setShowSidebar(val => !val);
  }

  const [tableData, setTableData] = new useState(() => []);
  /**
   * Fetch teams data from the API along with the page configuration for
   * pagination purpose.
   * @param {Number} pageNumber page number to fetch data of, default: 1
   * @param {Number} itemsPerPage items to get in one page, default: 10
   * @returns {Promise} promise with teams data
   */
  function prepareTableData(pageNumber = 1, itemsPerPage = 10) {
    setTableData('loading');
    return new Promise(function (resolve, reject) {
      fetch(`https://www.balldontlie.io/api/v1/teams?page=${pageNumber}&per_page=${itemsPerPage}`)
        .then(res => res.json())
        .then(teams => {
          setTableData(() => teams?.data || []);
          setCitySortOrder(false);
          resolve(teams);
        })
        .catch(reject);
    });
  }

  const [citySortOrder, setCitySortOrder] = new useState(() => false);
  /**
   * toggle the sorting of teams according to city names.
   */
  function toggleCitySortOrder() {
    setCitySortOrder(val => !val);
    sortTableData();
  }

  /**
   * sort array of the object of teams according to city names.
   * @returns {Array} teams array of objects sorted aphabetically
   */
  function sortTableData() {
    setTableData(teams => {
      const sortedTeams = teams.sort((a, b) => {
        if (citySortOrder) {
          return a.city.localeCompare(b.city);
        } else {
          return b.city.localeCompare(a.city);
        }
      });
      return sortedTeams;
    });
  }

  const [pageData, setPageData] = useState(() => ({
    "total_pages": 3,
    "current_page": 1,
    "next_page": 2,
    "per_page": 10,
    "total_count": 30
  }));
  /**
   * get the data of the teams in the specified page and set the
   * current page details to be used for pagination, etc. from
   * the same API.
   * @param {Number} pageNumber the page number to get data of.
   */
  function changePage(pageNumber = pageData.current_page) {
    prepareTableData(pageNumber)
      .then(teams => {
        setPageData(() => teams.meta);
      });
  }

  /**
   * fetch first page team-details and set to state.
   */
  useEffect(changePage, []);

  const [playerData, setPlayerData] = new useState(null);
  /**
   * Fetch all the players from the API and filter out those
   * which match the searched string.
   * @param {Object} e Event object of the submitted form
   */
  function searchPlayer(e) {
    e.preventDefault();
    document.activeElement.blur();
    setPlayerData("loading");
    fetch(`https://www.balldontlie.io/api/v1/players?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const searchQuery = e.target.player.value;
        const parts = searchQuery.split(" ");
        const searchExpressions = new Array();
        parts.forEach(part => searchExpressions.push(new RegExp(part, 'i')));

        const filteredPlayers = data.data.filter(player => {
          return searchExpressions.some(expression => expression.test(player.first_name)) ||
            searchExpressions.some(expression => expression.test(player.last_name));
        });
        setPlayerData(filteredPlayers);
      });
    setShowModal(true);
  }

  const [showModal, setShowModal] = new useState(false);
  /**
   * toggle the visibility of players search results modal
   */
  function toggleModal() {
    setShowModal(val => !val);
  }

  return <>
    <main className="Home" data-testid="home-page">
      <header className="header" data-testid="home-page-header">
        NBA Teams
      </header>

      <form onSubmit={searchPlayer} className="player-search-form">
        <label className="search-container">
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
          <input type="text" placeholder="Search for players" name="player" />
        </label>
      </form>

      <section className="teams-data-table-container">
        <table className="teams-data-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>
                City
                <button
                  className={`sort-city${citySortOrder ? " invert" : ''}`}
                  onClick={toggleCitySortOrder}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </button>
              </th>
              <th>Abbreviation</th>
              <th>Conference</th>
              <th>Division</th>
            </tr>
          </thead>
          {
            Array.isArray(tableData) ?
              <tbody>
                {
                  tableData.map((el, idx) =>
                    <tr
                      className={selectedTeam === el.id ? "selected" : undefined}
                      key={idx}
                      onClick={() => toggleSidebar(el.id)}
                    >
                      <td>{el.name || <>NA</>}</td>
                      <td>{el.city || <>NA</>}</td>
                      <td>{el.abbreviation || <>NA</>}</td>
                      <td>{el.conference || <>NA</>}</td>
                      <td>{el.division || <>NA</>}</td>
                    </tr>
                  )
                }
              </tbody> :
              <></>
          }
        </table>
        {
          tableData === 'loading' ?
            <div className="loader-container">
              <Loader></Loader>
            </div> :
            <></>
        }
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

    {/* player search modal */}
    <Modal playerData={playerData} showModal={showModal} toggleModal={toggleModal} />
  </>
}

export default Home;