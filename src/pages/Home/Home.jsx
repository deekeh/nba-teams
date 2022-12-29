import "./Home.scss";

function Home() {
  return <main className="Home">
    <header className="header">
      NBA Teams
    </header>

    <label className="search-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      <input type="text" />
    </label>

    <section className="teams-data-table-container">
      <table className="teams-data-table">
        <thead>
          <tr>
            <th>
              Team Name
            </th>
            <th>
              City
            </th>
            <th>
              Abbreviation
            </th>
            <th>
              Conference
            </th>
            <th>
              Division
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Hawks
            </td>
            <td>
              Atlanta
            </td>
            <td>
              ATL
            </td>
            <td>
              East
            </td>
            <td>
              Southeast
            </td>
          </tr>
          <tr>
            <td>
              Hawks
            </td>
            <td>
              Atlanta
            </td>
            <td>
              ATL
            </td>
            <td>
              East
            </td>
            <td>
              Southeast
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section className="pagination">
      <button>&lt;</button>
      <button>1</button>
      <button>4</button>
      <button>&gt;</button>
    </section>
  </main>
}

export default Home;